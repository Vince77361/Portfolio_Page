import type { Metadata, Viewport } from "next";
import {
  Unbounded,
  Black_Han_Sans,
  IBM_Plex_Sans_KR,
  IBM_Plex_Mono,
} from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

// Search console ownership tokens, set per deployment (never hard-coded).
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NAVER_SITE_VERIFICATION;

// Display: wide Unbounded for Latin, Black Han Sans picks up Hangul glyphs.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const plexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: SITE.title,
    template: "%s | 이유비 Portfolio",
  },
  description: SITE.description,
  keywords: [
    "이유비",
    "Vince",
    "Vince77361",
    "vincedev",
    "개발자 포트폴리오",
    "풀스택 개발자",
    "웹 개발자",
    "모바일 개발자",
    "외주 개발",
    "앱 개발 외주",
    "웹 개발 외주",
    "Next.js",
    "React",
    "TypeScript",
    "Flutter",
    "NestJS",
    "FastAPI",
    "Go",
    "업무 최적화 플랫폼",
    "VOAH",
    "SilkRoad",
    "한별",
    "MindLens",
    "Hanmin",
    "Cora",
    "Tamguro",
    "탐구로",
    "한양대학교",
  ],
  authors: [{ name: "이유비", url: SITE.url }],
  creator: "이유비",
  publisher: "이유비",
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "ko_KR",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    firstName: "유비",
    lastName: "이",
    username: "Vince77361",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(naverVerification
      ? { other: { "naver-site-verification": naverVerification } }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${unbounded.variable} ${blackHanSans.variable} ${plexSansKr.variable} ${plexMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
