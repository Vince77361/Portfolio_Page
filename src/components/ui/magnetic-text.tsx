"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const FAR = -9999;

function MagneticLetter({
  char,
  index,
  pointerX,
  pointerY,
}: {
  char: string;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // Offset from the letter's center to the cursor, plus 0–1 closeness.
  const measure = ([px, py]: number[]) => {
    const el = ref.current;
    if (!el || px === FAR) return { dx: 0, dy: 0, strength: 0 };
    const rect = el.getBoundingClientRect();
    const dx = px - (rect.left + rect.width / 2);
    const dy = py - (rect.top + rect.height / 2);
    const strength = Math.max(0, 1 - Math.hypot(dx, dy) / 420);
    return { dx, dy, strength };
  };

  const spring = { stiffness: 160, damping: 14 };
  const x = useSpring(
    useTransform([pointerX, pointerY], (v: number[]) => {
      const m = measure(v);
      return m.dx * 0.12 * m.strength;
    }),
    spring
  );
  const y = useSpring(
    useTransform([pointerX, pointerY], (v: number[]) => {
      const m = measure(v);
      return m.dy * 0.12 * m.strength - m.strength * 10;
    }),
    spring
  );
  const glow = useSpring(
    useTransform([pointerX, pointerY], (v: number[]) => measure(v).strength),
    { stiffness: 120, damping: 20 }
  );
  const color = useTransform(glow, [0, 1], ["#fafafa", "#ddd6fe"]);
  const textShadow = useTransform(
    glow,
    (g) =>
      `0 0 ${g * 40}px rgba(139,92,246,${g * 0.9}), 0 0 ${g * 90}px rgba(96,165,250,${g * 0.35})`
  );

  return (
    <motion.span
      initial={{ opacity: 0, y: 60, rotateX: -70, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{
        delay: 0.15 + index * 0.12,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block"
      aria-hidden
    >
      <motion.span
        ref={ref}
        style={{ x, y, color, textShadow }}
        className="inline-block will-change-transform"
      >
        {char}
      </motion.span>
    </motion.span>
  );
}

export default function MagneticText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const pointerX = useMotionValue(FAR);
  const pointerY = useMotionValue(FAR);

  return (
    <span
      className={`inline-block ${className}`}
      style={{ perspective: 800 }}
      onPointerMove={(e) => {
        pointerX.set(e.clientX);
        pointerY.set(e.clientY);
      }}
      onPointerLeave={() => {
        pointerX.set(FAR);
        pointerY.set(FAR);
      }}
      role="text"
      aria-label={text}
    >
      {Array.from(text).map((char, i) => (
        <MagneticLetter
          key={`${char}-${i}`}
          char={char}
          index={i}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      ))}
    </span>
  );
}
