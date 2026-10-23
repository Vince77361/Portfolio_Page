"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Outsource", id: "outsource" },
  { label: "Awards", id: "awards" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        const p = max > 0 ? window.scrollY / max : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      let current = "hero";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(id: string) {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <span
        ref={progressRef}
        aria-hidden
        className="absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent-500 via-accent-300 to-blue-300"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 transition-all duration-300 ease-out ${
          scrolled
            ? "mt-3 h-11 md:h-[3.2rem] w-[92%] sm:w-[78%] md:w-[70%] max-w-[1100px] rounded-full bg-zinc-950/45 backdrop-blur-md border border-zinc-600/60 shadow-[0_8px_30px_rgba(0,0,0,0.35)] px-5 md:px-7"
            : "mt-0 h-14 md:h-16 w-full max-w-7xl rounded-none bg-transparent backdrop-blur-0 border border-transparent border-b-transparent shadow-none px-4 sm:px-6 md:px-12"
        }`}
      >
        <button
          onClick={() => scrollToSection("hero")}
          className="flex min-w-0 items-center gap-2 md:gap-3 group"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors">
            LYB
          </span>
          <span className="hidden sm:block h-px w-6 bg-zinc-700 group-hover:bg-zinc-400 group-hover:w-10 transition-all" />
          <span className="hidden sm:inline font-display text-sm font-bold tracking-[0.1em] uppercase text-zinc-50">
            Archive
          </span>
        </button>

        <nav className="flex shrink-0 items-center gap-0.5 md:gap-1">
          {NAV_ITEMS.map((item, i) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={active ? "true" : undefined}
                className={`isolate px-1.5 sm:px-2 py-1.5 md:px-3 rounded-full font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.06em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase transition-colors relative group ${
                  active ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-50"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-accent-500/15 border border-accent-400/30 shadow-[0_0_18px_rgba(139,92,246,0.35),inset_0_0_12px_rgba(139,92,246,0.15)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="hidden lg:inline text-accent-400 mr-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
