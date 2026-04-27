"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { HERO, HISTORIES, TECH_STACK, SLOGAN } from "@/lib/constants";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLOGAN.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const techEntries = Object.entries(TECH_STACK) as [string, string[]][];

  return (
    <section
      id="hero"
      className="min-h-screen px-4 sm:px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 max-w-7xl mx-auto"
    >
      {/* Meta row */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex items-baseline justify-between gap-4 border-b border-zinc-800 pb-3"
      >
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
          <span className="text-accent-400">01</span> &nbsp;—&nbsp; Index
        </span>
        <div className="h-4 overflow-hidden" style={{ perspective: 800 }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={index}
              initial={{ rotateX: 45, opacity: 0, y: 10 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: -45, opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="block max-w-[42vw] truncate text-right font-mono text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.25em] uppercase text-accent-300"
            >
              {SLOGAN[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Name + role asymmetric */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 md:mt-14 grid grid-cols-12 gap-x-4 md:gap-x-6 items-end"
      >
        <h1 className="col-span-12 md:col-span-9 font-display text-[clamp(3.75rem,22vw,11rem)] uppercase text-zinc-50">
          {HERO.name}
        </h1>
        <div className="col-span-12 md:col-span-3 mt-4 md:mt-0 md:pb-4">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-2">
            Role
          </p>
          <p className="text-sm md:text-base text-accent-300 leading-snug font-medium">
            {HERO.role}
          </p>
        </div>
      </motion.div>

      {/* Greeting */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 md:mt-14 grid grid-cols-12 gap-x-4 md:gap-x-6"
      >
        <div className="hidden md:block md:col-span-3 pt-1">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            ↳ About
          </p>
        </div>
        <p className="col-span-12 md:col-span-7 text-zinc-300 text-base md:text-lg leading-relaxed">
          {HERO.greeting}
        </p>
      </motion.div>

      {/* Histories */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-16 md:mt-24"
      >
        <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3 mb-2">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            ↳ Histories
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-600">
            {String(HISTORIES.length).padStart(2, "0")} items
          </span>
        </div>
        <ul>
          {HISTORIES.map((h, i) => (
            <li
              key={h.name}
              className="grid grid-cols-12 gap-x-4 md:gap-x-6 py-6 border-b border-zinc-900 hover:border-accent-500/40 transition-colors"
            >
              <span className="col-span-2 md:col-span-1 font-mono text-[11px] text-accent-400 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 md:col-span-4">
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 leading-tight">
                  {h.name}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-accent-400">
                  {h.sub}
                </p>
              </div>
              <p className="col-span-12 md:col-span-7 mt-3 md:mt-0 md:self-center text-sm text-zinc-400 leading-relaxed">
                {h.description}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-14 md:mt-20"
      >
        <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            ↳ Tech Stack
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-600">
            {String(techEntries.length).padStart(2, "0")} categories
          </span>
        </div>
        {techEntries.map(([category, items]) => (
          <div
            key={category}
            className="grid grid-cols-12 gap-x-4 md:gap-x-6 py-4 border-b border-zinc-900"
          >
            <span className="col-span-12 sm:col-span-4 md:col-span-2 font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500 capitalize pt-0.5">
              {category}
            </span>
            <div className="col-span-12 sm:col-span-8 md:col-span-10 mt-2 sm:mt-0 flex flex-wrap gap-x-4 gap-y-1">
              {items.map((tech, i) => (
                <span key={tech} className="flex items-center text-sm text-zinc-200">
                  {tech}
                  {i < items.length - 1 && (
                    <span className="ml-4 text-zinc-700">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-16 md:mt-24 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500"
      >
        <span>Scroll</span>
        <span className="h-px w-16 bg-zinc-700" />
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-accent-400"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
