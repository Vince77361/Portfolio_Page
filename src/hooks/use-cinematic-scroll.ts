"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // 진입: 아래서 올라오며 나타남
      gsap.fromTo(
        content,
        { opacity: 0.05, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 3,
          },
        }
      );

      // 퇴장: 고정된 상태에서 커지며 사라짐
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 2.4,
        },
      })
        .to(content, { duration: 1.5, ease: "none" })
        .to(content, { scale: 1.18, opacity: 0, duration: 1, ease: "none" });
    });

    return () => ctx.revert();
  }, []);

  return { sectionRef, contentRef };
}
