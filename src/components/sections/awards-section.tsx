"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AWARDS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

type Tier = { rgb: string; label: string };

// Color and short rank label for each prize.
function getTier(prize: string): Tier {
  const rank = prize.match(/(\d)위/)?.[1];
  if (prize.includes("1위") || prize.includes("대상"))
    return { rgb: "250,204,21", label: "1ST" };
  if (rank === "2") return { rgb: "203,213,225", label: "2ND" };
  if (rank === "3") return { rgb: "245,158,11", label: "3RD" };
  return { rgb: "167,139,250", label: "SPECIAL" };
}

const TIERS = AWARDS.map((a) => getTier(a.prize));

// Scroll position t runs from START to END; card i sits in front at t = i.
const START = 0;
const END = AWARDS.length - 1 + 0.3;
const HOLD = 0.3;

function cardState(d: number) {
  if (d < 0) {
    // approaching out of the depth
    return {
      z: d * 2400,
      opacity: Math.max(0, 1 + d * 1.25),
      blur: -d * 10,
      rotateX: d * -12,
    };
  }
  if (d <= HOLD) return { z: 0, opacity: 1, blur: 0, rotateX: 0 };
  // flying past the viewer
  const k = Math.min(1, (d - HOLD) / 0.45);
  return {
    z: k * 900,
    opacity: Math.max(0, 1 - k * 1.7),
    blur: k * 10,
    rotateX: k * 18,
  };
}

type WarpStar = { x: number; y: number; z: number; pz: number; cool: boolean };

// Stars live in a box x,y ∈ [-1, 1], z ∈ (0, FAR]. Far stars project close
// to the vanishing point, so new stars always appear from the center.
const FAR = 3;
const IDLE_SPEED = 0.001;

function resetWarpStar(s: WarpStar, z = FAR) {
  s.x = (Math.random() - 0.5) * 2;
  s.y = (Math.random() - 0.5) * 2;
  s.z = z;
  s.pz = z;
}

function createWarpStars(count: number): WarpStar[] {
  return Array.from({ length: count }, () => {
    const star = { x: 0, y: 0, z: FAR, pz: FAR, cool: Math.random() < 0.18 };
    resetWarpStar(star, 0.15 + Math.random() * (FAR - 0.15));
    return star;
  });
}

type DustStar = { x: number; y: number; r: number; phase: number; hue: string };

// Distant, mostly static stars so the warp has a sky behind it.
function createDustStars(count: number): DustStar[] {
  const hues = ["244,244,255", "244,244,255", "196,181,253", "147,197,253"];
  return Array.from({ length: count }, () => {
    // Bias a share of stars into a diagonal "galaxy band".
    const inBand = Math.random() < 0.45;
    const t = Math.random();
    return {
      x: inBand ? t : Math.random(),
      y: inBand ? 0.85 - t * 0.7 + (Math.random() - 0.5) * 0.18 : Math.random(),
      r: Math.random() < 0.08 ? 1.3 + Math.random() * 0.6 : 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      hue: hues[Math.floor(Math.random() * hues.length)],
    };
  });
}

function AwardCard({
  award,
  tier,
  index,
}: {
  award: (typeof AWARDS)[number];
  tier: Tier;
  index: number;
}) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--px", `${px * 100}%`);
    el.style.setProperty("--py", `${py * 100}%`);
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
    el.style.setProperty("--foil", `${px * 220 + py * 140}deg`);
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="award-card group relative overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.03] p-7 sm:p-11 md:p-14 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
      style={{ "--tier": tier.rgb } as React.CSSProperties}
    >
      {/* tier hairline */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${tier.rgb},0.9), transparent)`,
        }}
      />
      {/* holographic foil + cursor light */}
      <div aria-hidden className="award-foil pointer-events-none absolute inset-0" />
      <div aria-hidden className="award-glare pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-500">
            {award.date}
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-500">
            {String(index + 1).padStart(2, "0")} / {String(AWARDS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-7 md:mt-9 flex items-baseline gap-4">
          <p
            className="font-display text-[clamp(2.8rem,12vw,6rem)] leading-none"
            style={{ color: `rgb(${tier.rgb})` }}
          >
            {tier.label}
          </p>
          <p className="text-sm md:text-base text-zinc-300">{award.prize}</p>
        </div>

        <h3 className="mt-6 md:mt-10 font-display text-[clamp(1.5rem,6vw,3rem)] leading-[1.15] text-zinc-50">
          {award.title}
        </h3>
        <p className="mt-4 md:mt-5 max-w-xl text-sm md:text-lg leading-relaxed text-zinc-300">
          {award.description}
        </p>
      </div>
    </div>
  );
}

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [current, setCurrent] = useState(0);

  // Scroll-driven flight of the cards + warp speed from scroll velocity.
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stars = createWarpStars(isMobile ? 130 : 260);
    const dust = createDustStars(isMobile ? 220 : 480);
    let progress = 0;
    let w = 0;
    let h = 0;
    let speed = IDLE_SPEED;
    let targetSpeed = IDLE_SPEED;

    const resize = () => {
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const placeCards = (t: number) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = cardState(t - i);
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          z: s.z,
          rotateX: s.rotateX,
          opacity: s.opacity,
          filter: s.blur > 0.2 ? `blur(${s.blur}px)` : "none",
          pointerEvents: s.opacity > 0.6 ? "auto" : "none",
          zIndex: Math.round(1000 - Math.abs(t - i) * 100),
        });
      });
    };
    placeCards(START);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${AWARDS.length * (isMobile ? 90 : 110)}%`,
      pin: true,
      scrub: 0.8,
      // Created before the Works pin re-mounts on mobile; measure it last.
      refreshPriority: -1,
      onUpdate: (self) => {
        progress = self.progress;
        const t = START + self.progress * (END - START);
        placeCards(t);
        const idx = Math.max(0, Math.min(AWARDS.length - 1, Math.round(t)));
        setCurrent(idx);
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(45% 40% at 50% 55%, rgba(${TIERS[idx].rgb},0.07), transparent 70%)`;
        }
        if (!reduceMotion) {
          targetSpeed = Math.min(
            0.03,
            IDLE_SPEED + Math.abs(self.getVelocity()) / 120000
          );
        }
      },
    });
    triggerRef.current = trigger;

    // Late-loading web fonts change section heights; re-measure pins after.
    document.fonts?.ready.then(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    let raf = 0;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(section);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      speed += (targetSpeed - speed) * 0.08;
      targetSpeed += (IDLE_SPEED - targetSpeed) * 0.04;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Distant sky: slow drift with scroll, gentle twinkle.
      const driftY = progress * 40;
      for (const d of dust) {
        const twinkle = reduceMotion
          ? 0.7
          : 0.45 + 0.55 * Math.abs(Math.sin(now * 0.0009 + d.phase));
        const y = (((d.y * h - driftY) % h) + h) % h;
        ctx.beginPath();
        ctx.arc(d.x * w, y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.hue},${(0.2 + d.r * 0.35) * twinkle})`;
        ctx.fill();
      }

      // Warp streaks flying out of the vanishing point.
      const focal = Math.min(w, h) * 0.6;
      ctx.lineCap = "round";
      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0.05) {
          resetWarpStar(s);
          continue;
        }
        const sx = cx + (s.x / s.z) * focal;
        const sy = cy + (s.y / s.z) * focal;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) {
          resetWarpStar(s);
          continue;
        }
        const px = cx + (s.x / s.pz) * focal;
        const py = cy + (s.y / s.pz) * focal;
        const near = 1 - s.z / FAR; // 0 far → 1 close
        const alpha = Math.min(0.9, near * near * 1.3);
        ctx.strokeStyle = s.cool
          ? `rgba(196,181,253,${alpha})`
          : `rgba(244,244,255,${alpha})`;
        ctx.lineWidth = 0.35 + near * near * 1.6;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx + 0.01, sy + 0.01);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      trigger.kill();
      triggerRef.current = null;
    };
  }, []);

  function jumpTo(i: number) {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const progress = (i - START) / (END - START);
    window.scrollTo({
      top: trigger.start + progress * (trigger.end - trigger.start),
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative h-screen overflow-hidden bg-zinc-950"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      />
      {/* Nebula clouds and galaxy band */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="nebula-drift absolute -left-[15%] top-[10%] h-[70vh] w-[70vw] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.22), rgba(124,58,237,0.06) 60%, transparent)",
          }}
        />
        <div
          className="nebula-drift-slow absolute -right-[10%] bottom-[0%] h-[65vh] w-[60vw] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(59,130,246,0.05) 60%, transparent)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[28vh] w-[140vw] -translate-x-1/2 -translate-y-1/2 -rotate-[22deg] blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(196,181,253,0.05) 30%, rgba(244,244,255,0.07) 50%, rgba(147,197,253,0.05) 70%, transparent)",
          }}
        />
      </div>
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-[background] duration-700"
        style={{
          background: `radial-gradient(45% 40% at 50% 55%, rgba(${TIERS[0].rgb},0.07), transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(9,9,11,0.85) 100%)",
        }}
      />

      {/* Header overlay */}
      <div className="absolute inset-x-0 top-0 z-30 px-4 sm:px-6 md:px-12 pt-20 md:pt-24 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between border-b border-zinc-800/80 pb-3">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
              <span className="text-accent-400">04</span> &nbsp;—&nbsp;
              Achievements
            </span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-600">
              <span className="text-accent-300">
                {String(current + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(AWARDS.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-5 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,4rem)] uppercase text-zinc-50 leading-[0.85]">
              Awards
            </h2>
            <p className="hidden md:block text-xs text-zinc-500 pb-1">
              스크롤을 빠르게 할수록 더 빠르게 날아갑니다
            </p>
          </div>
        </div>
      </div>

      {/* Cards flying through depth */}
      <div
        className="absolute inset-0 z-20"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {AWARDS.map((award, i) => (
            <div
              key={award.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-[57%] w-[min(90vw,760px)] will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <AwardCard award={award} tier={TIERS[i]} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Jump rail */}
      <nav
        aria-label="수상 목록"
        className="absolute z-30 bottom-10 left-1/2 -translate-x-1/2 flex flex-row gap-4 md:bottom-auto md:left-auto md:translate-x-0 md:right-10 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-3"
      >
        {AWARDS.map((award, i) => {
          const active = i === current;
          return (
            <button
              key={award.title}
              onClick={() => jumpTo(i)}
              aria-current={active ? "true" : undefined}
              aria-label={`${award.date} ${award.title}`}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`hidden lg:block font-mono text-[10px] tracking-[0.2em] transition-colors ${
                  active ? "text-zinc-200" : "text-zinc-600 group-hover:text-zinc-400"
                }`}
              >
                {award.date}
              </span>
              <span
                className="block h-2.5 w-2.5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: `rgba(${TIERS[i].rgb},${active ? 1 : 0.5})`,
                  background: active ? `rgba(${TIERS[i].rgb},1)` : "transparent",
                  boxShadow: active ? `0 0 14px rgba(${TIERS[i].rgb},0.9)` : "none",
                  transform: active ? "scale(1.3)" : "scale(1)",
                }}
              />
            </button>
          );
        })}
      </nav>

      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
