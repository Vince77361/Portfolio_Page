"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  phase: number;
  hue: string;
};
type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  trail: { x: number; y: number }[];
};
type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: string;
};
type Ring = { x: number; y: number; life: number };

const LINK_RADIUS = 160;
const TRAIL_LENGTH = 34;

// dir: 1 = toward the right, -1 = toward the left; falls 20–34° below horizontal.
function createMeteor(x: number, y: number, dir: number, scale = 1): Meteor {
  const speed = (8 + Math.random() * 4) * scale;
  const angle = 0.35 + Math.random() * 0.25;
  return {
    x,
    y,
    vx: dir * Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    decay: 0.011 + Math.random() * 0.004,
    trail: [],
  };
}
// White, violet and blue starlight — matches the page accents.
const HUES = ["236,232,255", "236,232,255", "196,181,253", "147,197,253"];

function createStars(w: number, h: number): Star[] {
  const count = Math.round(Math.min(200, (w * h) / 6500));
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 0.8 + 0.2,
    r: Math.random() * 1.3 + 0.35,
    phase: Math.random() * Math.PI * 2,
    hue: HUES[Math.floor(Math.random() * HUES.length)],
  }));
}

// Stars drift with the cursor (parallax by depth). Near the cursor they link
// into a constellation and leave a sparkle trail; clicking launches a
// shooting star with a burst.
export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];
    const sparks: Spark[] = [];
    const rings: Ring[] = [];
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(w, h);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.y >= 0 && pointer.y <= h && pointer.x >= 0 && pointer.x <= w;
      parallax.tx = (pointer.x / w - 0.5) * -28;
      parallax.ty = (pointer.y / h - 0.5) * -20;

      if (pointer.active && !reduceMotion && pointer.px !== -9999) {
        const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
        const count = Math.min(3, Math.floor(speed / 14));
        for (let i = 0; i < count; i++) {
          sparks.push({
            x: pointer.x + (Math.random() - 0.5) * 8,
            y: pointer.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.6,
            vy: Math.random() * 0.5 + 0.15,
            life: 1,
            size: Math.random() * 1.4 + 0.6,
            hue: HUES[1 + Math.floor(Math.random() * 3)],
          });
        }
      }
      pointer.px = pointer.x;
      pointer.py = pointer.y;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.px = -9999;
      parallax.tx = 0;
      parallax.ty = 0;
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 0 || y > h) return;
      meteors.push(createMeteor(x, y, Math.random() > 0.5 ? 1 : -1));
      rings.push({ x, y, life: 1 });
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const speed = 1.2 + Math.random() * 2.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 1.6 + 0.8,
          hue: HUES[1 + Math.floor(Math.random() * 3)],
        });
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);

    let raf = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(host);

    const drawStars = (t: number) => {
      const near: { x: number; y: number; d: number }[] = [];

      for (const s of stars) {
        const x = s.x + parallax.x * s.z;
        const y = s.y + parallax.y * s.z;
        const twinkle = reduceMotion
          ? 0.8
          : 0.55 + 0.45 * Math.sin(t * 0.0012 + s.phase);
        let boost = 0;
        if (pointer.active) {
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          if (d < LINK_RADIUS) {
            boost = 1 - d / LINK_RADIUS;
            near.push({ x, y, d });
          }
        }
        const r = s.r * (1 + boost * 1.1);
        if (boost > 0.35 || (s.r > 1.4 && twinkle > 0.85)) {
          const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
          halo.addColorStop(0, `rgba(${s.hue},${0.35 * Math.max(boost, 0.4)})`);
          halo.addColorStop(1, `rgba(${s.hue},0)`);
          ctx.fillStyle = halo;
          ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12);
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = boost
          ? `rgba(${s.hue},${Math.min(1, 0.55 + boost)})`
          : `rgba(${s.hue},${0.18 + s.z * 0.45 * twinkle})`;
        ctx.fill();
      }
      return near;
    };

    const drawConstellation = (near: { x: number; y: number; d: number }[]) => {
      if (near.length < 2) return;
      near.sort((a, b) => a.d - b.d);
      const picked = near.slice(0, 10);
      ctx.lineWidth = 0.9;
      for (let i = 0; i < picked.length; i++) {
        for (let j = i + 1; j < Math.min(picked.length, i + 3); j++) {
          const a = picked[i];
          const b = picked[j];
          const alpha = 0.6 * (1 - Math.max(a.d, b.d) / LINK_RADIUS);
          const line = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          line.addColorStop(0, `rgba(196,181,253,${alpha})`);
          line.addColorStop(1, `rgba(147,197,253,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = line;
          ctx.stroke();
        }
      }
      const glow = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        LINK_RADIUS
      );
      glow.addColorStop(0, "rgba(139,92,246,0.12)");
      glow.addColorStop(0.6, "rgba(96,165,250,0.04)");
      glow.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(
        pointer.x - LINK_RADIUS,
        pointer.y - LINK_RADIUS,
        LINK_RADIUS * 2,
        LINK_RADIUS * 2
      );
    };

    // Tapered tail (white → violet → blue), soft halo and a 4-point glint.
    const drawMeteor = (m: Meteor) => {
      const pts = [...m.trail, { x: m.x, y: m.y }];
      const n = pts.length;
      ctx.lineCap = "round";
      for (let j = 1; j < n; j++) {
        const t = j / (n - 1);
        const a = pts[j - 1];
        const b = pts[j];
        const color =
          t > 0.75 ? "255,255,255" : t > 0.4 ? "196,181,253" : "147,197,253";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${color},${t * t * m.life})`;
        ctx.lineWidth = 0.4 + t * 3.2 * m.life;
        ctx.stroke();
      }
      // wide faint glow under the tail
      if (n > 2) {
        const tail = pts[0];
        const glow = ctx.createLinearGradient(tail.x, tail.y, m.x, m.y);
        glow.addColorStop(0, "rgba(96,165,250,0)");
        glow.addColorStop(1, `rgba(167,139,250,${0.25 * m.life})`);
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = glow;
        ctx.lineWidth = 10 * m.life;
        ctx.stroke();
      }

      const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 22);
      halo.addColorStop(0, `rgba(255,255,255,${m.life})`);
      halo.addColorStop(0.18, `rgba(221,214,254,${0.7 * m.life})`);
      halo.addColorStop(0.5, `rgba(139,92,246,${0.18 * m.life})`);
      halo.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(m.x - 22, m.y - 22, 44, 44);

      const flicker = 0.75 + Math.random() * 0.25;
      const angle = Math.atan2(m.vy, m.vx);
      for (const [rot, len] of [
        [0, 26],
        [Math.PI / 2, 14],
      ] as const) {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(angle + Math.PI / 4 + rot);
        const ray = ctx.createLinearGradient(-len, 0, len, 0);
        ray.addColorStop(0, "rgba(255,255,255,0)");
        ray.addColorStop(0.5, `rgba(255,255,255,${0.9 * m.life * flicker})`);
        ray.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = ray;
        ctx.fillRect(-len, -0.6, len * 2, 1.2);
        ctx.restore();
      }
    };

    const drawEffects = () => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.022;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${p.life})`;
        ctx.fill();
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life -= 0.025;
        if (ring.life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        const radius = (1 - ring.life) * 70;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(196,181,253,${ring.life * 0.7})`;
        ctx.lineWidth = 1.5 * ring.life;
        ctx.stroke();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.trail.push({ x: m.x, y: m.y });
        if (m.trail.length > TRAIL_LENGTH) m.trail.shift();
        m.x += m.vx;
        m.y += m.vy;
        m.vy += 0.05; // slight arc
        m.life -= m.decay;
        if (m.life <= 0) {
          meteors.splice(i, 1);
          continue;
        }
        if (!reduceMotion && Math.random() < 0.6) {
          sparks.push({
            x: m.x - m.vx * Math.random() * 2,
            y: m.y - m.vy * Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.5 - m.vx * 0.04,
            vy: Math.random() * 0.4 + 0.2,
            life: 0.9 * m.life,
            size: Math.random() * 1.1 + 0.4,
            hue: HUES[1 + Math.floor(Math.random() * 3)],
          });
        }
        drawMeteor(m);
      }

      ctx.restore();
    };

    let nextAmbient = performance.now() + 2500;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (!reduceMotion && t > nextAmbient) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const startX = dir > 0 ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5;
        meteors.push(createMeteor(startX, Math.random() * h * 0.25, dir, 0.85));
        nextAmbient = t + 5000 + Math.random() * 5000;
      }
      ctx.clearRect(0, 0, w, h);
      parallax.x += (parallax.tx - parallax.x) * 0.06;
      parallax.y += (parallax.ty - parallax.y) * 0.06;
      const near = drawStars(t);
      if (pointer.active) drawConstellation(near);
      drawEffects();
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
    />
  );
}
