import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PORTFOLIO } from "@/lib/constants";
import ImageContainer from "@/components/image-container";
import Header from "@/components/layout/header";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ id: item.title.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = PORTFOLIO.find((p) => p.title.toLowerCase() === id);
  if (!item) return {};
  return { title: `${item.title} | 이유비 Portfolio` };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const index = PORTFOLIO.findIndex((p) => p.title.toLowerCase() === id);
  if (index === -1) notFound();

  const item = PORTFOLIO[index];
  const prev = PORTFOLIO[index - 1];
  const next = PORTFOLIO[index + 1];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-950 pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-4 group mb-10 md:mb-16">
            <span className="text-zinc-300 group-hover:text-accent-300 group-hover:-translate-x-1 transition-all">
              ←
            </span>
            <span className="h-px w-10 bg-zinc-700 group-hover:bg-accent-400 group-hover:w-20 transition-all duration-500" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-200 group-hover:text-accent-300 transition-colors">
              Back to Index
            </span>
          </Link>

          <div className="grid grid-cols-12 gap-x-4 gap-y-2 md:gap-x-6 items-baseline border-b border-zinc-800 pb-3 mb-8 md:mb-10">
            <span className="col-span-3 md:col-span-2 font-mono text-[11px] tracking-[0.25em] text-accent-400">
              — {String(index + 1).padStart(2, "0")}
            </span>
            <span className="col-span-9 md:col-span-7 font-mono text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.25em] uppercase text-zinc-500 text-right md:text-left">
              Project / {item.date}
            </span>
            <span className="col-span-12 md:col-span-3 md:text-right font-mono text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.25em] uppercase text-zinc-500 truncate">
              {item.stack[0]}
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,19vw,9rem)] uppercase text-zinc-50 mb-6">
            {item.title}
          </h1>
          <p className="text-lg md:text-xl text-accent-300 font-medium max-w-2xl leading-snug mb-12">
            {item.subTitle}
          </p>

          <div className="relative mb-12 md:mb-16">
            <div className="absolute inset-0 bg-linear-to-br from-accent-500/20 via-accent-700/5 to-transparent -m-2 md:-m-4 blur-2xl pointer-events-none" />
            <ImageContainer
              src={item.image}
              alt={item.title}
              className="w-full aspect-[4/3] sm:aspect-[16/9] relative"
            />
          </div>

          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10 mb-20">
            <aside className="col-span-12 md:col-span-3">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
                ↳ Stack
              </p>
              <ul className="space-y-2">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs text-zinc-300 border-b border-zinc-900 pb-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
                ↳ About the project
              </p>
              <p className="text-base md:text-lg text-zinc-200 leading-loose">
                {item.description}
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4">
            {prev ? (
              <Link
                href={`/portfolio/${prev.title.toLowerCase()}`}
                className="group sm:border-r border-zinc-900 sm:pr-6"
              >
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-2">
                  ← Prev / {String(index).padStart(2, "0")}
                </p>
                <p className="font-display text-xl md:text-2xl text-zinc-300 group-hover:text-accent-300 transition-colors line-clamp-2 uppercase">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/portfolio/${next.title.toLowerCase()}`}
                className="group sm:text-right sm:pl-6"
              >
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-2">
                  Next / {String(index + 2).padStart(2, "0")} →
                </p>
                <p className="font-display text-xl md:text-2xl text-zinc-300 group-hover:text-accent-300 transition-colors line-clamp-2 uppercase">
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
