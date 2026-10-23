"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OUTSOURCE, type OutsourceProject } from "@/lib/constants";
import SystemMap from "@/components/ui/system-map";

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectPanel({ project }: { project: OutsourceProject }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease }}
      className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10"
    >
      <div className="col-span-12 lg:col-span-5">
        <p className="text-xl md:text-2xl font-bold text-blue-200 leading-snug">
          {project.subTitle}
        </p>

        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-zinc-500">의뢰처</dt>
          <dd className="text-zinc-200">{project.client}</dd>
          <dt className="text-zinc-500">기간</dt>
          <dd className="text-zinc-200">{project.period}</dd>
          <dt className="text-zinc-500">담당</dt>
          <dd className="text-zinc-200">{project.myRole}</dd>
        </dl>

        <p className="mt-6 hidden md:block text-zinc-300 leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease }}
              className="flex gap-3 text-sm text-zinc-300"
            >
              <span
                aria-hidden
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
              />
              {h}
            </motion.li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-blue-300/40 hover:text-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <p className="mb-3 text-xs text-zinc-500">
          시스템 구성 — 노드를 눌러 각 부분의 역할을 확인하세요
        </p>
        <SystemMap nodes={project.nodes} links={project.links} accent="blue" />
      </div>
    </motion.div>
  );
}

export default function OutsourceSection() {
  const [index, setIndex] = useState(0);
  const project = OUTSOURCE[index];

  // Panels differ in height; pinned sections below must re-measure.
  useEffect(() => {
    const id = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 700);
    return () => clearTimeout(id);
  }, [index]);

  function onTabKey(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + OUTSOURCE.length) % OUTSOURCE.length;
    setIndex(next);
    document.getElementById(`outsource-tab-${OUTSOURCE[next].id}`)?.focus();
  }

  return (
    <section
      id="outsource"
      className="relative overflow-hidden bg-zinc-950 px-4 sm:px-6 md:px-12 py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
        style={{
          background:
            "radial-gradient(40% 35% at 28% 45%, rgba(96,165,250,0.08), transparent 70%), radial-gradient(35% 35% at 75% 38%, rgba(139,92,246,0.09), transparent 70%)",
          // Fade in from the top so the glow never shows a hard edge.
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3 mb-12">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            <span className="text-blue-300">03</span>&nbsp;—&nbsp;Client Work
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-600">
            {String(OUTSOURCE.length).padStart(2, "0")} projects
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-[clamp(2.2rem,12vw,8.5rem)] uppercase text-zinc-50"
        >
          Outsource
        </motion.h2>
        <div className="mt-10 grid grid-cols-12 gap-x-4 md:gap-x-6">
          <div className="hidden md:block md:col-span-3" />
          <p className="col-span-12 md:col-span-7 text-lg text-zinc-300 leading-relaxed">
            외부 의뢰를 받아 기획부터 개발, 배포 준비까지 맡은 프로젝트들입니다.
            모바일·서버·데스크탑을 아우르는 실제 운영 시스템을 만들었습니다.
          </p>
        </div>

        {/* Project selector — titles double as tabs */}
        <div
          role="tablist"
          aria-label="외주 프로젝트"
          onKeyDown={onTabKey}
          className="mt-16 md:mt-24 flex flex-wrap items-end gap-x-6 sm:gap-x-10 gap-y-2 border-b border-zinc-800"
        >
          {OUTSOURCE.map((p, i) => {
            const selected = i === index;
            return (
              <button
                key={p.id}
                id={`outsource-tab-${p.id}`}
                role="tab"
                aria-selected={selected}
                aria-controls="outsource-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                className="group relative pb-4 text-left"
              >
                <span className="block text-[11px] text-zinc-500 mb-1">
                  {p.period}
                </span>
                <span
                  className={`block font-display text-[clamp(1.5rem,3.6vw,3rem)] uppercase transition-colors duration-300 ${
                    selected
                      ? "text-zinc-50"
                      : "text-zinc-700 group-hover:text-zinc-400"
                  }`}
                >
                  {p.title}
                </span>
                {selected && (
                  <motion.span
                    layoutId="outsource-underline"
                    className="absolute -bottom-px left-0 right-0 h-[3px] rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id="outsource-panel"
          role="tabpanel"
          aria-labelledby={`outsource-tab-${project.id}`}
          className="mt-12 md:mt-16"
        >
          <AnimatePresence mode="wait">
            <ProjectPanel key={project.id} project={project} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
