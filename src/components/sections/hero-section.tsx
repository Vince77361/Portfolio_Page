"use client";

import { motion, type Variants } from "framer-motion";
import { HERO, HISTORIES, TECH_STACK } from "@/lib/constants";
import TechBadge from "@/components/ui/tech-badge";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 max-w-6xl mx-auto mt-32"
    >
      {/* Slogan */}
      <motion.p
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-sm font-mono text-violet-400 tracking-widest uppercase mb-6"
      >
        {HERO.slogan}
      </motion.p>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-zinc-50 leading-none">
          {HERO.name}
        </h1>
        <p className="mt-3 text-xl md:text-2xl text-violet-400 font-medium">
          {HERO.role}
        </p>
      </motion.div>

      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-8 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed"
      >
        {HERO.greeting}
      </motion.p>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {HISTORIES.map((h) => (
          <div
            key={h.name}
            className="flex-1 border border-zinc-800 rounded-xl p-5 bg-zinc-900/50 hover:border-violet-500/40 hover:bg-zinc-900 transition-all duration-300"
          >
            <p className="text-sm text-violet-400 font-mono mb-1">{h.sub}</p>
            <p className="text-base font-semibold text-zinc-100">{h.name}</p>
            <p className="mt-1 text-sm text-zinc-500">{h.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10"
      >
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
          Tech Stack
        </p>
        <div className="flex flex-col gap-3">
          {(Object.entries(TECH_STACK) as [string, string[]][]).map(
            ([category, items]) => (
              <div key={category} className="flex items-start gap-3 flex-wrap">
                <span className="text-xs text-zinc-400 w-20 shrink-0 pt-0.5 capitalize">
                  {category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </motion.div>

      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-16 flex items-center gap-2 text-zinc-400 text-sm"
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
