"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Soft light that trails the cursor across the page. Mouse devices only.
export default function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="hidden [@media(pointer:fine)]:block motion-reduce:hidden pointer-events-none fixed left-0 top-0 z-40 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(96,165,250,0.05) 35%, transparent 65%)",
      }}
    />
  );
}
