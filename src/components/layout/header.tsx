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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-xl font-bold tracking-tight text-zinc-50 hover:text-violet-400 transition-colors"
        >
          LYB Archive
        </button>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/60 rounded-lg transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
