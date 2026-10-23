import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CursorGlow from "@/components/ui/cursor-glow";
import JsonLd from "@/components/json-ld";
import { PERSON_SCHEMA, SITE } from "@/lib/constants";
import HeroSection from "@/components/sections/hero-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import OutsourceSection from "@/components/sections/outsource-section";
import AwardsSection from "@/components/sections/awards-section";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            PERSON_SCHEMA,
            {
              "@type": "WebSite",
              "@id": `${SITE.url}/#website`,
              url: SITE.url,
              name: SITE.name,
              description: SITE.description,
              inLanguage: "ko-KR",
              author: { "@id": PERSON_SCHEMA["@id"] },
            },
            {
              "@type": "ProfilePage",
              url: SITE.url,
              name: SITE.title,
              mainEntity: { "@id": PERSON_SCHEMA["@id"] },
            },
          ],
        }}
      />
      <CursorGlow />
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <OutsourceSection />
        <AwardsSection />
        <div className="h-48 md:h-72 bg-zinc-950" />
      </main>
      <Footer />
    </>
  );
}
