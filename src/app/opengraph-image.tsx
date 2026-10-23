import { ImageResponse } from "next/og";
import OgCard, { OG_SIZE } from "@/components/og/og-card";

export const alt = "Lee Yubi (이유비) — Web & Mobile Full-stack Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="PORTFOLIO"
        title="LEE YUBI"
        subtitle="Web · Mobile Full-stack Developer"
        tags={["Next.js", "React", "Flutter", "NestJS", "FastAPI", "Go"]}
      />
    ),
    size
  );
}
