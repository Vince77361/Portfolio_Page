"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO } from "@/lib/constants";
import ImageContainer from "@/components/image-container";
import { useCinematicScroll } from "@/hooks/use-cinematic-scroll";

gsap.registerPlugin(ScrollTrigger);

function PortfolioItem({
  item,
  index,
}: {
  item: (typeof PORTFOLIO)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // 진입 애니메이션: 아래서 올라오면서 나타남
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
        },
      );

      // 퇴장 애니메이션: 고정된 상태에서 커지며 사라짐
      gsap
        .timeline({
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

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center py-24 px-6 bg-zinc-950"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div className={isEven ? "lg:order-1" : "lg:order-2"}>
            <span className="text-[6rem] md:text-[8rem] font-black text-zinc-600 leading-none block -mb-2 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-4">
              {item.date}
            </p>

            <h3 className="text-4xl md:text-6xl font-black text-zinc-50 leading-tight mb-4">
              {item.title}
            </h3>

            <p className="text-lg md:text-xl text-zinc-300 mb-4 leading-relaxed font-medium">
              {item.subTitle}
            </p>

            <p className="text-zinc-500 leading-relaxed mb-8 text-sm md:text-base">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-zinc-700 text-zinc-400 bg-zinc-900/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              href={`/portfolio/${index}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-300 font-mono text-sm"
            >
              자세히 보기 →
            </Link>
          </div>

          {/* Image side */}
          <div className={isEven ? "lg:order-2" : "lg:order-1"}>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-violet-600/10 to-transparent rounded-2xl -m-2 blur-xl" />
              <ImageContainer
                src={item.image}
                alt={item.title}
                className="w-full aspect-4/3 rounded-2xl relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioHeader() {
  const { sectionRef, contentRef } = useCinematicScroll();

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-24 px-6 bg-zinc-950"
    >
      <div ref={contentRef} className="text-center">
        <p className="text-sm font-mono text-violet-400 tracking-widest uppercase mb-4">
          Works
        </p>
        <h2 className="text-6xl md:text-8xl font-black text-zinc-50 mb-4">
          Portfolio
        </h2>
        <p className="text-lg text-zinc-500">
          참여했거나 직접 개발한 프로젝트들입니다.
        </p>
        <p className="mt-4 text-sm text-zinc-600">
          * 일부 사진은 준비 중인 점 양해 부탁드립니다.
        </p>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio">
      <PortfolioHeader />
      <div>
        {PORTFOLIO.map((item, i) => (
          <PortfolioItem key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
