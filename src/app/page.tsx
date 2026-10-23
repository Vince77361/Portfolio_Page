import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CursorGlow from "@/components/ui/cursor-glow";
import HeroSection from "@/components/sections/hero-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import OutsourceSection from "@/components/sections/outsource-section";
import AwardsSection from "@/components/sections/awards-section";

export default function Home() {
  return (
    <>
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
