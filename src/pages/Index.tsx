import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import PromptShowcase from "@/components/PromptShowcase";
import SellCTABanner from "@/components/SellCTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeatureCards />
        <div className="py-16">
          <PromptShowcase />
        </div>
        <SellCTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
