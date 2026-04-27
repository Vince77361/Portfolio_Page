"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ShootingStarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(currentProgress);
    };

    let currentProgress = 0;

    const draw = (progress: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (progress <= 0) return;

      // Star path: top-center → bottom-center, slight diagonal
      const startX = w * 0.5;
      const startY = h * 0.05;
      const endX = w * 0.5;
      const endY = h * 0.95;

      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress;

      // Tail: from spawn point to current position
      const tailStartY = Math.max(startY, y - 280 * progress);
      const tailStartX = startX + (x - startX) * ((tailStartY - startY) / Math.max(y - startY, 1));

      // Tail gradient
      const tailGrad = ctx.createLinearGradient(tailStartX, tailStartY, x, y);
      tailGrad.addColorStop(0, "rgba(255,255,255,0)");
      tailGrad.addColorStop(0.4, "rgba(180,160,255,0.15)");
      tailGrad.addColorStop(0.8, "rgba(230,220,255,0.55)");
      tailGrad.addColorStop(1, "rgba(255,255,255,0.9)");

      ctx.beginPath();
      ctx.moveTo(tailStartX, tailStartY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer glow
      const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 48);
      outerGlow.addColorStop(0, "rgba(255,255,255,0.18)");
      outerGlow.addColorStop(0.5, "rgba(180,160,255,0.08)");
      outerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, 48, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Inner glow
      const innerGlow = ctx.createRadialGradient(x, y, 0, x, y, 10);
      innerGlow.addColorStop(0, "rgba(255,255,255,1)");
      innerGlow.addColorStop(0.4, "rgba(220,210,255,0.7)");
      innerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Sparkles along the tail
      if (progress > 0.05) {
        const sparkCount = 6;
        for (let i = 0; i < sparkCount; i++) {
          const t = (i / sparkCount) * progress;
          const sx = startX + (x - startX) * (t / progress);
          const sy = startY + (y - startY) * (t / progress);
          const age = progress - t;
          const opacity = Math.max(0, 0.5 - age * 2);
          const size = 1.2 * (1 - age * 3);

          if (opacity > 0 && size > 0) {
            ctx.beginPath();
            ctx.arc(sx + (Math.sin(i * 13.7) * 8), sy + (Math.cos(i * 7.3) * 6), size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${opacity})`;
            ctx.fill();
          }
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      pin: true,
      onUpdate: (self) => {
        currentProgress = self.progress;
        draw(currentProgress);
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <canvas
        ref={canvasRef}
        className="sticky top-0 w-full h-screen bg-zinc-950"
      />
    </section>
  );
}
