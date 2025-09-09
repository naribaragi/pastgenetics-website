import { Button } from "@/components/ui/button";

const SellCTABanner = () => {
  const handleSellClick = () => {
    // Optional analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_sell_prompt_click', {
        event_category: 'engagement',
        event_label: 'sell_prompt_banner'
      });
    }
  };

  return (
    <>
      {/* Top divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      
      <section 
        id="sell-cta" 
        role="region" 
        aria-labelledby="sell-cta-title"
        className="w-full bg-gradient-to-b from-[#111826] to-[#0E1220] py-16"
      >
        <div className="container max-w-[1280px] mx-auto px-4">
          <div className="sell-cta-banner bg-[#121629]/90 backdrop-blur-sm rounded-[32px] overflow-hidden relative">
            {/* Background overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,12,20,0.35)] to-[rgba(10,12,20,0.75)] pointer-events-none" />
            
            <div className="relative z-10 sell-cta-grid">
              {/* Left: Text Content */}
              <div className="sell-cta-content">
                <div className="text-sm text-coral font-medium mb-4">
                  Start selling in minutes
                </div>
                
                <h2 
                  id="sell-cta-title" 
                  className="sell-cta-headline text-[#F3F4F6] font-black mb-6"
                >
                  Sell your prompts on PromptBase
                </h2>
                
                <p className="sell-cta-subtext text-[#C8CDD9] mb-8 leading-relaxed">
                  Upload your prompt, connect Stripe, and become a seller in about 2 minutes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Button
                    asChild
                    className="sell-cta-button bg-gradient-to-r from-[#FFB98A] to-[#FF6E7A] text-[#1B1020] font-bold hover:brightness-110 hover:shadow-lg hover:shadow-coral/20 focus:ring-2 focus:ring-[#FFD3B8] focus:ring-offset-2 focus:ring-offset-background transition-all duration-300"
                    size="lg"
                    onClick={handleSellClick}
                  >
                    <a 
                      href="/sell" 
                      aria-label="Start selling a prompt"
                      className="px-6"
                    >
                      Sell a prompt
                    </a>
                  </Button>
                  
                  <a 
                    href="/sellers" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium underline-offset-4 hover:underline"
                  >
                    Learn more
                  </a>
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="sell-cta-image-container">
                <div className="sell-cta-image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop&q=80"
                    alt=""
                    aria-hidden="true"
                    className="sell-cta-image w-full h-full object-cover filter blur-[6px] brightness-75"
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,12,20,0.75)] to-[rgba(10,12,20,0.35)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellCTABanner;