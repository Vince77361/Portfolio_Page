"use client";

import { AWARDS } from "@/lib/constants";
import ImageContainer from "@/components/image-container";
import PrizeBadge from "@/components/ui/prize-badge";
import { useCinematicScroll } from "@/hooks/use-cinematic-scroll";

function AwardItem({
  award,
  index,
}: {
  award: (typeof AWARDS)[0];
  index: number;
}) {
  const { sectionRef, contentRef } = useCinematicScroll();
  const isEven = index % 2 === 0;

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
              {award.date}
            </p>

            <div className="mb-4">
              <PrizeBadge prize={award.prize} />
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-zinc-50 leading-tight mb-6">
              {award.title}
            </h3>

            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              {award.description}
            </p>
          </div>

          {/* Image side */}
          <div className={isEven ? "lg:order-2" : "lg:order-1"}>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-violet-600/10 to-transparent rounded-2xl -m-2 blur-xl" />
              <ImageContainer
                src={award.image}
                alt={award.title}
                className="w-full aspect-4/3 rounded-2xl relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardsHeader() {
  const { sectionRef, contentRef } = useCinematicScroll();

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-24 px-6 bg-zinc-950"
    >
      <div ref={contentRef} className="text-center">
        <p className="text-sm font-mono text-violet-400 tracking-widest uppercase mb-4">
          Achievements
        </p>
        <h2 className="text-6xl md:text-8xl font-black text-zinc-50 mb-4">
          Awards
        </h2>
        <p className="text-lg text-zinc-500">
          수상 이력입니다. <br />
          스크롤하여 확인해 보세요!
        </p>
        <p className="mt-4 text-sm text-zinc-600">
          * 일부 사진은 준비 중인 점 양해 부탁 드립니다.
        </p>
      </div>
    </div>
  );
}

export default function AwardsSection() {
  return (
    <section id="awards">
      <AwardsHeader />
      <div>
        {AWARDS.map((award, i) => (
          <AwardItem key={award.title} award={award} index={i} />
        ))}
      </div>
    </section>
  );
}
