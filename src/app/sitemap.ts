import type { MetadataRoute } from "next";
import { PORTFOLIO, SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...PORTFOLIO.map((item) => ({
      url: `${SITE.url}/portfolio/${item.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
