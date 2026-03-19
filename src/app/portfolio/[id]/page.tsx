import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PORTFOLIO } from "@/lib/constants";
import ImageContainer from "@/components/image-container";
import Header from "@/components/layout/header";
import TechBadge from "@/components/ui/tech-badge";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PORTFOLIO.map((_, i) => ({ id: String(i) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = PORTFOLIO[Number(id)];
  if (!item) return {};
  return { title: `${item.title} | 이유비 Portfolio` };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const index = Number(id);
  const item = PORTFOLIO[index];

  if (!item) notFound();

  const prev = PORTFOLIO[index - 1];
  const next = PORTFOLIO[index + 1];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-950 pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-violet-400 transition-colors mb-10"
          >
            ← Portfolio 목록으로
          </Link>
          <ImageContainer
            src={item.image}
            alt={item.title}
            className="w-full aspect-4/3 mb-8"
          />

          <span className="text-xs font-mono text-zinc-600">{item.date}</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-black text-zinc-50 leading-tight">
            {item.title}
          </h1>
          <p className="mt-1 text-lg text-violet-400">{item.subTitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
          <div className="mt-6 mb-6 border-t border-zinc-800" />
          <p className="text-base text-zinc-300 leading-loose">
            {item.description}
          </p>

          {/* Prev / Next */}
          <div className="mt-16 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/portfolio/${index - 1}`}
                className="col-start-1 group border border-zinc-800 rounded-xl p-4 bg-zinc-900/40 hover:border-violet-500/40 hover:bg-zinc-900 transition-all"
              >
                <p className="text-xs text-zinc-600 mb-1">← 이전 프로젝트</p>
                <p className="text-sm font-semibold text-zinc-300 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/portfolio/${index + 1}`}
                className="col-start-2 group border border-zinc-800 rounded-xl p-4 bg-zinc-900/40 hover:border-violet-500/40 hover:bg-zinc-900 transition-all text-right"
              >
                <p className="text-xs text-zinc-600 mb-1">다음 프로젝트 →</p>
                <p className="text-sm font-semibold text-zinc-300 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
