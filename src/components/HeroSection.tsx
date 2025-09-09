import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import heroImage from "@/assets/hero-ai-showcase.jpg";
const HeroSection = () => {
  return <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="AI-generated artwork showcase" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-coral bg-clip-text text-transparent">
          AI Prompt Marketplace
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Explore 210k expert-crafted prompt templates
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8 text-lg">
          <span className="text-coral font-semibold">Midjourney</span>
          <span className="text-muted-foreground">,</span>
          <span className="text-coral font-semibold">ChatGPT</span>
          <span className="text-muted-foreground">,</span>
          <span className="text-coral font-semibold">Veo</span>
          <span className="text-muted-foreground">,</span>
          <span className="text-coral font-semibold">Gemini</span>
          <span className="text-muted-foreground">& more</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="primary" size="lg" className="px-8 py-6 text-lg font-semibold">
            Explore prompts
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold">
            Sell prompts
          </Button>
        </div>

        {/* Social Proof */}
        

        {/* Media Mentions */}
        <div className="mt-8 opacity-60">
          <p className="text-xs text-muted-foreground mb-4">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-medium text-muted-foreground">
            <span>THE VERGE</span>
            <span>FAST COMPANY</span>
            <span>FINANCIAL TIMES</span>
            <span>TechCrunch</span>
            <span>Wired</span>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;