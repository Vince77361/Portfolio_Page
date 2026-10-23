"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { SystemLink, SystemNode } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

// Full class strings per accent so Tailwind can see them.
const ACCENTS = {
  blue: {
    frame:
      "spotlight-blue border-blue-300/15 bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.08),transparent_65%)] shadow-[0_30px_80px_-30px_rgba(59,130,246,0.35)]",
    litLine: "rgba(96,165,250,0.35)",
    litCore: "#bfdbfe",
    pulse:
      "bg-blue-100 shadow-[0_0_10px_3px_rgba(96,165,250,0.85)]",
    ring: "border-blue-300/60",
    active:
      "border-blue-300/70 bg-blue-300/15 shadow-[0_0_32px_rgba(96,165,250,0.35)]",
    linked: "border-blue-300/30",
    activeText: "text-blue-100",
    captionTitle: "text-blue-200",
  },
  violet: {
    frame:
      "border-accent-300/15 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.10),transparent_65%)] shadow-[0_30px_80px_-30px_rgba(124,58,237,0.45)]",
    litLine: "rgba(167,139,250,0.4)",
    litCore: "#ddd6fe",
    pulse:
      "bg-accent-100 shadow-[0_0_10px_3px_rgba(167,139,250,0.85)]",
    ring: "border-accent-300/60",
    active:
      "border-accent-300/70 bg-accent-400/15 shadow-[0_0_32px_rgba(139,92,246,0.4)]",
    linked: "border-accent-300/30",
    activeText: "text-accent-100",
    captionTitle: "text-accent-200",
  },
} as const;

export default function SystemMap({
  nodes,
  links,
  accent = "blue",
}: {
  nodes: SystemNode[];
  links: SystemLink[];
  accent?: keyof typeof ACCENTS;
}) {
  const theme = ACCENTS[accent];
  const [activeId, setActiveId] = useState(nodes[0].id);
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const litLinks = links.filter(
    ([from, to]) => from === activeId || to === activeId
  );

  // Gentle 3D tilt toward the cursor.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  function onTilt(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }
  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={onTilt}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`spotlight relative aspect-[4/5] sm:aspect-[4/3] rounded-2xl border overflow-hidden ${theme.frame}`}
      >
        {/* dotted grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(161,161,170,0.25) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <svg
          aria-hidden
          className="absolute inset-[8%] w-[84%] h-[84%] overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {links.map(([from, to]) => {
            const a = byId[from];
            const b = byId[to];
            const lit = from === activeId || to === activeId;
            return (
              <g key={`${from}-${to}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={lit ? theme.litLine : "rgba(113,113,122,0.35)"}
                  strokeWidth={lit ? 3 : 1}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-500"
                />
                {lit && (
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={theme.litCore}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    opacity={0.7}
                  />
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-[8%]">
          {/* Light pulses travelling along the active connections */}
          {litLinks.map(([from, to], i) => {
            const a = byId[from];
            const b = byId[to];
            return (
              <motion.span
                key={`${activeId}-${from}-${to}`}
                aria-hidden
                className={`absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full motion-reduce:hidden ${theme.pulse}`}
                initial={{ left: `${a.x}%`, top: `${a.y}%`, opacity: 0 }}
                animate={{
                  left: [`${a.x}%`, `${b.x}%`],
                  top: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            );
          })}
          {nodes.map((node, i) => {
            const isActive = node.id === activeId;
            const linked = links.some(
              ([f, t]) =>
                (f === activeId && t === node.id) ||
                (t === activeId && f === node.id)
            );
            return (
              <motion.button
                key={node.id}
                type="button"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease }}
                onMouseEnter={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
                onClick={() => setActiveId(node.id)}
                aria-pressed={isActive}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {isActive && (
                  <motion.span
                    aria-hidden
                    className={`absolute inset-0 rounded-xl border motion-reduce:hidden ${theme.ring}`}
                    initial={{ scale: 1.1, opacity: 0.7 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className={`relative block whitespace-nowrap rounded-xl border px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-left backdrop-blur-sm transition-all duration-300 ${
                    isActive
                      ? `${theme.active} scale-110`
                      : linked
                        ? `${theme.linked} bg-zinc-900/80`
                        : "border-zinc-700/70 bg-zinc-900/80 hover:border-zinc-500"
                  }`}
                >
                  <span
                    className={`block text-xs sm:text-sm font-bold ${
                      isActive ? theme.activeText : "text-zinc-200"
                    }`}
                  >
                    {node.label}
                  </span>
                  <span className="hidden sm:block mt-0.5 text-[10px] text-zinc-500">
                    {node.tech}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-4 min-h-[5.5rem] rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className={`font-bold ${theme.captionTitle}`}>
                {active.label}
              </span>
              <span className="text-xs text-zinc-500">{active.tech}</span>
            </p>
            <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed">
              {active.role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
