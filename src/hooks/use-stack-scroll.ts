"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useStackScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 120, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 25%",
            scrub: 1,
          },
        },
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 2,
          },
        })
        .to(content, { duration: 0.6, ease: "none" })
        .to(content, {
          scale: 0.86,
          opacity: 0.12,
          filter: "blur(10px)",
          y: -80,
          duration: 0.4,
          ease: "none",
        });
    });

    return () => ctx.revert();
  }, []);

  return { sectionRef, contentRef };
}
