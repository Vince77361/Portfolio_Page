"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AWARDS } from "@/lib/constants";
import PrizeBadge from "@/components/ui/prize-badge";

gsap.registerPlugin(ScrollTrigger);

function drawStarfield(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  isMobile: boolean
) {
  ctx.clearRect(0, 0, w, h);
  const starCount = isMobile ? 110 : 220;
  const accentCount = isMobile ? 18 : 36;
  const glowBoost = 1.7;

  for (let i = 0; i < starCount; i++) {
    const sx = (Math.sin(i * 127.1 + 3.5) * 0.5 + 0.5) * w;
    const sy = (Math.sin(i * 311.7 + 1.2) * 0.5 + 0.5) * h;
    const brightness = Math.abs(Math.sin(i * 51.3));
    const sz = brightness * 1.6 + 0.45;
    const twinkle = 0.65 + 0.35 * Math.sin(time * 0.0011 + i * 0.73);
    const op =
      Math.min(0.78, (brightness * 0.38 + 0.12) * glowBoost) * twinkle;
    ctx.beginPath();
    ctx.arc(sx, sy, sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${op})`;
    ctx.fill();
  }

  for (let i = 0; i < accentCount; i++) {
    const sx = (Math.sin(i * 213.7 + 1.8) * 0.5 + 0.5) * w;
    const sy = (Math.sin(i * 419.3 + 5.1) * 0.5 + 0.5) * h;
    const twinkle = 0.55 + 0.45 * Math.sin(time * 0.00085 + i * 1.31);
    const op =
      Math.min(0.6, (Math.abs(Math.sin(i * 73.1)) * 0.26 + 0.08) * glowBoost) *
      twinkle;
    ctx.beginPath();
    ctx.arc(sx, sy, 2.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,210,255,${op})`;
    ctx.fill();
  }
}

export default function AwardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const indexLabelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const lastIndex = Math.max(AWARDS.length - 1, 1);
  const baseAngles = useMemo(
    () => AWARDS.map((_, i) => (i * 240) / lastIndex),
    [lastIndex]
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const compactQuery = window.matchMedia("(max-width: 1024px)");
    const update = () => {
      setIsMobile(mobileQuery.matches);
      setIsCompact(compactQuery.matches);
    };
    update();
    mobileQuery.addEventListener("change", update);
    compactQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      compactQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      drawStarfield(ctx, canvas.width, canvas.height, now - start, isMobile);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    const cd = cdRef.current;
    if (!section || !cd) return;

    const totalRotation = -240;
    const fadeScrollShare = 0.16;
    const rotationEndProgress = 1 - fadeScrollShare;

    awardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        rotation: 0,
        opacity: i === 0 ? 1 : 0,
      });
    });
    gsap.set(cd, { rotation: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: isMobile ? "+=420%" : "+=500%",
        pin: true,
        scrub: isMobile ? 1 : 1.2,
        onUpdate: (self) => {
          const rotationProgress = Math.min(
            1,
            self.progress / rotationEndProgress
          );
          const cdRot = totalRotation * rotationProgress;

          // Keep the final award visible until it reaches the top marker,
          // then use the remaining scroll distance to fade the disc out.
          const fadeOut = Math.max(
            0,
            Math.min(
              1,
              (self.progress - rotationEndProgress) / fadeScrollShare
            )
          );
          const visible = 1 - fadeOut;

          gsap.set(cd, { rotation: cdRot, opacity: visible });

          if (headerRef.current) {
            gsap.set(headerRef.current, { opacity: visible });
          }

          let closestIdx = 0;
          let closestDist = 999;

          awardsRef.current.forEach((el, i) => {
            if (!el) return;
            const current = baseAngles[i] + cdRot;
            const normalized = ((((current + 180) % 360) + 360) % 360) - 180;
            const dist = Math.abs(normalized);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = i;
            }
            const baseOpacity = dist < 55 ? 1 - (dist / 55) * 0.95 : 0;
            gsap.set(el, {
              rotation: 0,
              opacity: baseOpacity * visible,
            });
          });

          if (indexLabelRef.current) {
            indexLabelRef.current.textContent = String(closestIdx + 1).padStart(
              2,
              "0"
            );
          }
        },
      });
    });

    return () => ctx.revert();
  }, [baseAngles, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative h-screen overflow-hidden bg-zinc-950"
      style={{
        ["--cd-radius" as string]: isMobile
          ? "min(56vh, 104vw)"
          : isCompact
            ? "min(62vh, 88vw)"
            : "min(72vh, 78vw)",
        ["--cd-top" as string]: isMobile
          ? "108%"
          : isCompact
            ? "116%"
            : "130%",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 72%, rgba(109,40,217,0.12) 0%, rgba(76,29,149,0.07) 28%, rgba(9,9,11,0) 58%), radial-gradient(circle at 20% 48%, rgba(139,92,246,0.055) 0%, rgba(9,9,11,0) 34%), radial-gradient(circle at 82% 42%, rgba(99,102,241,0.045) 0%, rgba(9,9,11,0) 32%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 92%, transparent 100%)",
        }}
      />
      <div
        className="absolute left-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          width: "calc(var(--cd-radius) * 1.7)",
          height: "calc(var(--cd-radius) * 0.9)",
          top: "calc(var(--cd-top) - var(--cd-radius) * 0.6)",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.04) 42%, rgba(9,9,11,0) 72%)",
        }}
      />
      <div
        className="absolute left-1/2 rounded-full blur-2xl pointer-events-none"
        style={{
          width: "calc(var(--cd-radius) * 0.85)",
          height: "calc(var(--cd-radius) * 0.5)",
          top: "calc(var(--cd-top) - var(--cd-radius) * 1.02)",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(196,181,253,0.05) 0%, rgba(139,92,246,0.04) 34%, rgba(9,9,11,0) 70%)",
        }}
      />

      {/* Header overlay */}
      <div
        ref={headerRef}
        className="absolute inset-x-0 top-0 z-30 px-4 sm:px-6 md:px-12 pt-20 md:pt-24 lg:pt-32 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
              <span className="text-accent-400">03</span> &nbsp;—&nbsp;
              Achievements
            </span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-600">
              <span ref={indexLabelRef} className="text-accent-300">
                01
              </span>
              {" / "}
              {String(AWARDS.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,4rem)] uppercase text-zinc-50 leading-[0.85]">
              Awards
            </h2>
            <p className="hidden md:block font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 pb-4">
              ↳ Scroll to Rotate Disc
            </p>
          </div>
        </div>
      </div>

      {/* CD wheel */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 rounded-full"
          style={{
            width: "calc(var(--cd-radius) * 2)",
            height: "calc(var(--cd-radius) * 2)",
            top: "var(--cd-top)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            ref={cdRef}
            className="absolute inset-0 rounded-full"
            style={{
              transformOrigin: "center center",
            }}
          >
          {/* Iridescent base */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(139,92,246,0.06), rgba(255,255,255,0.03), rgba(139,92,246,0.10), rgba(255,255,255,0.03), rgba(139,92,246,0.06), rgba(255,255,255,0.02), rgba(139,92,246,0.08))",
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-25"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.05) 0%, rgba(139,92,246,0.025) 24%, rgba(255,255,255,0) 48%, rgba(167,139,250,0.04) 76%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            className="absolute inset-[7%] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 12%, rgba(255,255,255,0.06), rgba(139,92,246,0.025) 30%, rgba(255,255,255,0) 58%)",
            }}
          />

          {/* Grooves */}
          <div className="absolute inset-0 rounded-full border border-zinc-800 shadow-[0_0_34px_rgba(139,92,246,0.08)]" />
          <div className="absolute inset-[2%] rounded-full border border-zinc-800/80" />
          <div className="absolute inset-[5%] rounded-full border border-zinc-800/60" />
          <div className="absolute inset-[10%] rounded-full border border-zinc-800/50" />
          <div className="absolute inset-[16%] rounded-full border border-zinc-800/40" />
          <div className="absolute inset-[24%] rounded-full border border-zinc-800/35" />
          <div className="absolute inset-[33%] rounded-full border border-zinc-800/30" />
          <div className="absolute inset-[42%] rounded-full border border-accent-500/25" />
          <div className="absolute inset-[45%] rounded-full border border-accent-500/20" />

          {/* Outer accent rim */}
          <div className="absolute inset-0 rounded-full border border-accent-500/20 shadow-[inset_0_0_30px_rgba(139,92,246,0.04)]" />

          {/* Center label */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.08),inset_0_0_18px_rgba(139,92,246,0.04)]"
            style={{
              width: "calc(var(--cd-radius) * 0.28)",
              height: "calc(var(--cd-radius) * 0.28)",
            }}
          >
            <div className="text-center">
              <p className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-accent-400">
                LYB · 03
              </p>
              <p className="hidden sm:block font-mono text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-zinc-600 mt-1">
                Achievement Disc
              </p>
            </div>
          </div>

          {/* Spindle hole */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-950 border border-zinc-700" />

          {/* Awards on rim */}
          {AWARDS.map((award, i) => (
            <div
              key={award.title}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${baseAngles[i]}deg) translateY(calc(var(--cd-radius) * -1.06))`,
                transformOrigin: "0 0",
                width: 0,
                height: 0,
              }}
            >
              <div
                ref={(el) => {
                  awardsRef.current[i] = el;
                }}
                className="absolute"
                style={{
                  top: 0,
                  left: 0,
                  width: isMobile ? "min(86vw, 340px)" : "min(82vw, 500px)",
                }}
              >
                <div className="text-center">
                  <div className="mb-3 md:mb-5 flex justify-center">
                    <PrizeBadge prize={award.prize} />
                  </div>
                  <p className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-zinc-500 mb-3 md:mb-4">
                    — {String(i + 1).padStart(2, "0")}{" "}
                    <span className="mx-2 text-zinc-700">/</span> {award.date}
                  </p>
                  <h3 className="font-display text-[clamp(1.8rem,8vw,2.8rem)] md:text-6xl text-zinc-50 uppercase leading-[0.9] mb-4 md:mb-5">
                    {award.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-[18rem] md:max-w-md mx-auto">
                    {award.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Top crosshair / tick marker at 12 o'clock */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
        style={{ top: "calc(var(--cd-top) - var(--cd-radius) * 1.02)" }}
      >
        <span className="h-3 w-px bg-accent-400/70" />
      </div>

      {/* Subtle bottom fade where CD meets canvas */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
