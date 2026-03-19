import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import AwardsSection from "@/components/sections/awards-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <AwardsSection />
      </main>
      <Footer />
    </>
  );
}
