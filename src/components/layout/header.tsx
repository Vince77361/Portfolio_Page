"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Awards", id: "awards" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-2 py-2 md:px-3 font-mono text-[10px] md:text-[11px] tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase text-zinc-500 hover:text-zinc-50 transition-colors relative group"
            >
              <span className="hidden sm:inline text-accent-400 mr-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
