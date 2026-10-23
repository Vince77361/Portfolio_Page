import { ImageResponse } from "next/og";
import OgCard, { OG_SIZE } from "@/components/og/og-card";
import { PORTFOLIO } from "@/lib/constants";

export const alt = "Lee Yubi portfolio project";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ id: item.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = PORTFOLIO.find((p) => p.slug === id);
  // Titles may be Hangul; the slug keeps the image text Latin-only.
  const isLatin = item && /^[\x20-\x7E]+$/.test(item.title);
  const title = (isLatin ? item.title : id).toUpperCase();

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`PROJECT · ${item?.date ?? ""}`}
        title={title}
        subtitle="Lee Yubi — Portfolio"
        tags={(item?.stack ?? []).filter((t) => /^[\x20-\x7E]+$/.test(t)).slice(0, 6)}
      />
    ),
    size
  );
}
