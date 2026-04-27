"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO } from "@/lib/constants";
import { useCinematicScroll } from "@/hooks/use-cinematic-scroll";

gsap.registerPlugin(ScrollTrigger);

const STAR_TOP = 0.06;
const STAR_BOTTOM = 0.94;

function getItemState(p: number, i: number, total: number) {
  const zone = 1 / total;
  const start = i * zone;
  const end = (i + 1) * zone;
  const fadeIn = zone * 0.22;
  const fadeOut = zone * 0.18;

  if (p <= start) return { opacity: 0, y: -36 };
  if (p < start + fadeIn) {
    const t = (p - start) / fadeIn;
    return { opacity: t, y: -36 * (1 - t) };
  }
  if (p < end - fadeOut) return { opacity: 1, y: 0 };
  if (p < end) {
    const t = (p - (end - fadeOut)) / fadeOut;
    return { opacity: 1 - t, y: 16 * t };
  }
  return { opacity: 0, y: 16 };
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  isMobile: boolean
) {
  const starCount = isMobile ? 105 : 210;
  const accentCount = isMobile ? 17 : 34;
  const glowBoost = 1.35;

  // Background stars spread across the full canvas
  for (let i = 0; i < starCount; i++) {
    const sx = (Math.sin(i * 127.1 + 3.5) * 0.5 + 0.5) * w;
    const sy = (Math.sin(i * 311.7 + 1.2) * 0.5 + 0.5) * h;
    const brightness = Math.abs(Math.sin(i * 51.3));
    const sz = brightness * 1.25 + 0.28;
    const op = Math.min(0.58, (brightness * 0.34 + 0.1) * glowBoost);
    ctx.beginPath();
    ctx.arc(sx, sy, sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${op})`;
    ctx.fill();
  }
  // Slightly larger accent stars for variety
  for (let i = 0; i < accentCount; i++) {
    const sx = (Math.sin(i * 213.7 + 1.8) * 0.5 + 0.5) * w;
    const sy = (Math.sin(i * 419.3 + 5.1) * 0.5 + 0.5) * h;
    const op = Math.min(0.42, (Math.abs(Math.sin(i * 73.1)) * 0.22 + 0.06) * glowBoost);
    ctx.beginPath();
    ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,210,255,${op})`;
    ctx.fill();
  }

  if (p <= 0) return;

  const starY = h * (STAR_TOP + (STAR_BOTTOM - STAR_TOP) * p);

  // Wide nebula glow following the star
  const nr = w * 0.42;
  const nebula = ctx.createRadialGradient(w * 0.5, starY, 0, w * 0.5, starY, nr);
  nebula.addColorStop(0,   "rgba(130, 90, 255, 0.22)");
  nebula.addColorStop(0.4, "rgba(90,  65, 210, 0.12)");
  nebula.addColorStop(1,   "rgba(0,   0,  0,   0)");
  ctx.beginPath();
  ctx.arc(w * 0.5, starY, nr, 0, Math.PI * 2);
  ctx.fillStyle = nebula;
  ctx.fill();

  // Secondary offset glow for depth
  const nr2 = w * 0.28;
  const nebula2 = ctx.createRadialGradient(w * 0.5 + w * 0.06, starY - h * 0.06, 0, w * 0.5 + w * 0.06, starY - h * 0.06, nr2);
  nebula2.addColorStop(0,   "rgba(180, 125, 255, 0.16)");
  nebula2.addColorStop(1,   "rgba(0,   0,   0,   0)");
  ctx.beginPath();
  ctx.arc(w * 0.5 + w * 0.06, starY - h * 0.06, nr2, 0, Math.PI * 2);
  ctx.fillStyle = nebula2;
  ctx.fill();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  p: number,
  w: number,
  h: number,
  isMobile: boolean
) {
  ctx.clearRect(0, 0, w, h);
  drawBackground(ctx, w, h, p, isMobile);
  if (p <= 0) return;

  const x = w * 0.5;
  const y = h * (STAR_TOP + (STAR_BOTTOM - STAR_TOP) * p);
  const tailLen = Math.min(p * 420, 380);
  const tailY = Math.max(h * STAR_TOP, y - tailLen);

  // Wide soft tail (purple haze)
  const tgWide = ctx.createLinearGradient(x, tailY, x, y);
  tgWide.addColorStop(0, "rgba(180,150,255,0)");
  tgWide.addColorStop(0.55, "rgba(180,150,255,0.18)");
  tgWide.addColorStop(1, "rgba(220,200,255,0.45)");
  ctx.beginPath();
  ctx.moveTo(x - 7, tailY);
  ctx.quadraticCurveTo(x, tailY + (y - tailY) * 0.4, x - 1.4, y);
  ctx.lineTo(x + 1.4, y);
  ctx.quadraticCurveTo(x, tailY + (y - tailY) * 0.4, x + 7, tailY);
  ctx.closePath();
  ctx.fillStyle = tgWide;
  ctx.fill();

  // Crisp inner tail line
  const tg = ctx.createLinearGradient(x, tailY, x, y);
  tg.addColorStop(0, "rgba(255,255,255,0)");
  tg.addColorStop(0.4, "rgba(210,190,255,0.45)");
  tg.addColorStop(1, "rgba(255,255,255,1)");
  ctx.beginPath();
  ctx.moveTo(x, tailY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = tg;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  // Halo — slow breathing
  const haloPulse = 0.5 + 0.5 * Math.sin(p * 11 + 0.4);
  const haloR = 50 + haloPulse * 18;
  const halo = ctx.createRadialGradient(x, y, 0, x, y, haloR);
  halo.addColorStop(0, `rgba(255,255,255,${0.35 + haloPulse * 0.35})`);
  halo.addColorStop(0.4, `rgba(195,170,255,${0.14 + haloPulse * 0.18})`);
  halo.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(x, y, haloR, 0, Math.PI * 2);
  ctx.fillStyle = halo;
  ctx.fill();

  // Each ray gets its own freq + phase so they shimmer independently
  const rays: {
    angle: number;
    baseLen: number;
    thickness: number;
    freq: number;
    phase: number;
    color: string;
    alphaBase: number;
    alphaAmp: number;
    diagonal?: boolean;
  }[] = [
    // Horizontal — half of the previous length
    { angle: 0, baseLen: 40, thickness: 1.7, freq: 17, phase: 0.0, color: "rgba(255,255,255,1)", alphaBase: 0.25, alphaAmp: 0.7 },
    { angle: 0, baseLen: 56, thickness: 0.9, freq: 12, phase: 1.6, color: "rgba(220,200,255,0.75)", alphaBase: 0.2, alphaAmp: 0.65 },
    // Vertical — short so it doesn't fight the tail
    { angle: Math.PI / 2, baseLen: 36, thickness: 1.4, freq: 23, phase: 0.9, color: "rgba(255,255,255,0.95)", alphaBase: 0.25, alphaAmp: 0.7 },
    // Off-axis diagonals — boosted base length, brighter, abs(sin) → twice as many highlight peaks
    { angle: 0.42, baseLen: 46, thickness: 1.2, freq: 22, phase: 2.1, color: "rgba(230,210,255,0.95)", alphaBase: 0.45, alphaAmp: 0.95, diagonal: true }, // ~24°
    { angle: 1.18, baseLen: 50, thickness: 1.2, freq: 18, phase: 3.4, color: "rgba(205,185,255,0.95)", alphaBase: 0.45, alphaAmp: 0.95, diagonal: true }, // ~67°
    { angle: 2.05, baseLen: 44, thickness: 1.15, freq: 25, phase: 0.6, color: "rgba(230,210,255,0.9)", alphaBase: 0.45, alphaAmp: 0.9, diagonal: true }, // ~117°
    { angle: 2.55, baseLen: 48, thickness: 1.2, freq: 20, phase: 4.2, color: "rgba(200,180,255,0.95)", alphaBase: 0.45, alphaAmp: 0.95, diagonal: true }, // ~146°
  ];

  for (const r of rays) {
    // Diagonals use |sin| so they peak twice per cycle → highlighted more often
    const raw = Math.sin(p * r.freq + r.phase);
    const pulse = r.diagonal ? Math.abs(raw) : 0.5 + 0.5 * raw;
    const lenMul = 0.5 + pulse * 0.95;
    const alpha = r.alphaBase + pulse * r.alphaAmp;
    const len = r.baseLen * lenMul;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(r.angle);
    ctx.globalAlpha = alpha;
    const grad = ctx.createLinearGradient(-len, 0, len, 0);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, r.color);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(-len, -r.thickness / 2, len * 2, r.thickness);
    ctx.restore();
  }

  // Inner glow flickers fast
  const corePulse = 0.78 + 0.22 * Math.sin(p * 31 + 1.3);
  const ig = ctx.createRadialGradient(x, y, 0, x, y, 11);
  ig.addColorStop(0, `rgba(255,255,255,${corePulse})`);
  ig.addColorStop(0.6, `rgba(235,225,255,${corePulse * 0.85})`);
  ig.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(x, y, 11, 0, Math.PI * 2);
  ctx.fillStyle = ig;
  ctx.fill();

  // Bright core — subtle size breathing
  const coreR = 2.6 + 0.7 * Math.sin(p * 25 + 2.1);
  ctx.beginPath();
  ctx.arc(x, y, coreR, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.restore();

  if (p > 0.03) {
    for (let i = 0; i < 6; i++) {
      const t = (i / 6) * p;
      const sy = h * (STAR_TOP + (STAR_BOTTOM - STAR_TOP) * t);
      const age = p - t;
      const op = Math.max(0, 0.72 - age * 2.5);
      const sz = Math.max(0, 2.1 - age * 3.5);
      if (op > 0 && sz > 0) {
        ctx.beginPath();
        ctx.arc(
          x + Math.sin(i * 11.3) * 11,
          sy + Math.cos(i * 7.1) * 8,
          sz,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fill();
      }
    }
  }
}

function PortfolioHeader() {
  const { sectionRef, contentRef } = useCinematicScroll();

  return (
    <div
      ref={sectionRef}
      className="min-h-[75vh] md:min-h-screen flex items-center py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-zinc-950"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto w-full">
        <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3 mb-12">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            <span className="text-accent-400">02</span>&nbsp;—&nbsp;Works
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-600">
            {String(PORTFOLIO.length).padStart(2, "0")} projects
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.8rem,16vw,8.5rem)] uppercase text-zinc-50">
          Main Projects
        </h2>
        <div className="mt-10 grid grid-cols-12 gap-x-4 md:gap-x-6">
          <div className="hidden md:block md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
              ↳ Summary
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-3">
            <p className="text-lg text-zinc-300 leading-relaxed">
              참여했거나 직접 개발한 프로젝트들입니다.
              <br />
              스크롤하여 확인해 보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStar(ctx, 0, canvas.width, canvas.height, isMobile);
    };
    resize();
    window.addEventListener("resize", resize);

    itemRefs.current.forEach((el) => {
      if (el) gsap.set(el, { yPercent: -50, opacity: 0 });
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: isMobile ? "+=480%" : "+=600%",
      pin: true,
      scrub: isMobile ? 1.2 : 1.8,
      onUpdate: (self) => {
        const p = self.progress;
        drawStar(ctx, p, canvas.width, canvas.height, isMobile);

        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const { opacity, y } = getItemState(p, i, PORTFOLIO.length);
          gsap.set(el, { opacity, y, yPercent: -50 });
        });

        // Fade out whole section as last item disappears
        if (fadeRef.current) {
          const fadeOpacity = Math.max(0, Math.min(1, (p - 0.87) / 0.13));
          gsap.set(fadeRef.current, { opacity: fadeOpacity });
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="relative h-screen bg-zinc-950">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Fade-to-black overlay */}
      <div
        ref={fadeRef}
        className="absolute inset-0 z-30 bg-zinc-950 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Subtle center guide */}
      <div className="absolute left-1/2 inset-y-0 w-px bg-zinc-800/20 pointer-events-none" />

      {PORTFOLIO.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={item.title}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute z-10 top-[55%] md:top-1/2 pointer-events-auto"
            style={{
              opacity: 0,
              ...(isMobile
                ? { left: "1rem", right: "1rem" }
                : isLeft
                  ? { left: "3%", right: "51%" }
                  : { right: "3%", left: "51%" }),
            }}
          >
            <p
              className={`font-mono text-[10px] md:text-[11px] tracking-[0.22em] md:tracking-[0.3em] text-accent-400 mb-3 ${
                isMobile ? "text-center" : !isLeft ? "text-right" : ""
              }`}
            >
              — {String(i + 1).padStart(2, "0")} &nbsp;/&nbsp; {item.date}
            </p>
            <h3
              className={`font-display text-[clamp(2.55rem,15vw,4.5rem)] md:text-[clamp(3rem,7vw,7.5rem)] text-zinc-50 uppercase leading-[0.88] mb-3 ${
                isMobile ? "text-center" : !isLeft ? "text-right" : ""
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-accent-300 text-sm sm:text-base md:text-xl font-medium leading-snug mb-5 ${
                isMobile ? "mx-auto max-w-[18rem] text-center" : !isLeft ? "text-right" : ""
              }`}
            >
              {item.subTitle}
            </p>
            <div
              className={`flex flex-wrap gap-x-3 gap-y-1.5 mb-6 ${
                isMobile ? "justify-center" : !isLeft ? "justify-end" : ""
              }`}
            >
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] md:text-[11px] tracking-wider text-zinc-500"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className={`flex ${isMobile ? "justify-center" : !isLeft ? "justify-end" : ""}`}>
              <Link
                href={`/portfolio/${item.title.toLowerCase()}`}
                className="inline-flex items-center gap-3 group"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-300 group-hover:text-accent-200 transition-colors">
                  View Project
                </span>
                <span className="h-px w-10 bg-accent-500/60 group-hover:w-16 group-hover:bg-accent-300 transition-all duration-500" />
                <span className="text-accent-300 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio">
      <PortfolioHeader />
      <StarSection />
    </section>
  );
}
