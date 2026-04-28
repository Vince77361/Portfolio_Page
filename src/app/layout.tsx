import type { Metadata } from "next";
import { Saira, Noto_Sans_KR, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = new URL("https://vincedev.kr");
const siteTitle = "이유비 | Web/Mobile Developer & Engineer";
const siteDescription =
  "대학생 1인 개발자 이유비의 포트폴리오 페이지입니다. PC에서 더욱 원활한 확인을 하실수 있습니다.";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "이유비 포트폴리오",
  title: {
    default: siteTitle,
    template: "%s | 이유비 Portfolio",
  },
  description: siteDescription,
  keywords: [
    "이유비",
    "Vince",
    "Vince77361",
    "vincedev",
    "개발자 포트폴리오",
    "웹 개발자",
    "모바일 개발자",
    "프론트엔드",
    "Next.js",
    "React",
    "TypeScript",
    "업무 최적화 플랫폼",
    "VOAH",
    "SilkRoad",
    "한별",
  ],
  authors: [{ name: "이유비", url: siteUrl }],
  creator: "이유비",
  publisher: "이유비",
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "이유비 Portfolio",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${saira.variable} ${notoSans.variable} ${inter.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
