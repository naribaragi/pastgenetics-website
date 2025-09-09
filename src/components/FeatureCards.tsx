import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
const discountDeals = [
  {
    tool: "Midjourney Plus",
    perk: "Bigger renders & fast queue",
    deal: "Save 15% yearly",
    originalPrice: "$96/year",
    discountPrice: "$81.60/year",
    coupon: "MJ15",
    badge: "15% OFF",
    ctaUrl: "https://example.com/mj?ref=affiliate_id",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&h=60&fit=crop",
    track: "deal_click:midjourney_plus"
  },
  {
    tool: "ChatGPT Team",
    perk: "Shared workspace & higher limits",
    deal: "10% off annual",
    originalPrice: "$300/year",
    discountPrice: "$270/year",
    coupon: "TEAM10",
    badge: "10% OFF",
    ctaUrl: "https://example.com/cgpt?utm_source=site&utm_campaign=aff",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop",
    track: "deal_click:chatgpt_team"
  },
  {
    tool: "Sora Video Credits",
    perk: "Cinematic video packs",
    deal: "Bundle: 25% off",
    originalPrice: "$200/pack",
    discountPrice: "$150/pack",
    coupon: "SORA25",
    badge: "25% OFF",
    ctaUrl: "https://example.com/sora?ref=affiliate_id",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=60&h=60&fit=crop",
    track: "deal_click:sora_video"
  },
  {
    tool: "Ideogram Pro",
    perk: "Branded image generation",
    deal: "Free month + 20% off",
    originalPrice: "$20/month",
    discountPrice: "First month free",
    coupon: "IDEO20",
    badge: "New",
    ctaUrl: "https://example.com/ideo?aff=id",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=60&h=60&fit=crop",
    track: "deal_click:ideogram_pro"
  }
];

const FeatureCards = () => {
  const { toast } = useToast();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const copyCoupon = async (coupon: string) => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopiedCoupon(coupon);
      toast({
        title: "Copied!",
        description: `Coupon code "${coupon}" copied to clipboard`,
        duration: 2000,
      });
      setTimeout(() => setCopiedCoupon(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="ai-discounts-section">
      {/* Top Divider */}
      <div className="w-full border-t border-border/30 mb-12"></div>
      
      <div className="container px-4 max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h2 className="text-3xl font-bold text-foreground">Exclusive AI Tool Discounts</h2>
            <Badge variant="secondary" className="text-xs">Updated weekly</Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Save on top AI apps and plugins. Limited offers — coupons auto-apply.
          </p>
        </div>

        {/* Discount Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {discountDeals.map((deal, index) => (
            <Card key={index} className="group overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-coral/10">
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={`${deal.tool} promo artwork`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Partner Logo */}
                <div className="absolute top-3 left-3">
                  <img 
                    src={deal.logo} 
                    alt={`${deal.tool} logo`}
                    className="w-8 h-8 rounded-lg border border-white/20"
                  />
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-coral-primary text-white font-bold">
                    {deal.badge}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {/* Tool Name & Perk */}
                <div>
                  <h3 className="font-semibold text-base mb-1 group-hover:text-coral transition-colors">
                    {deal.tool}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {deal.perk}
                  </p>
                </div>
                
                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      {deal.originalPrice}
                    </span>
                    <span className="font-bold text-coral">
                      {deal.discountPrice}
                    </span>
                  </div>
                  <p className="text-xs text-success-green font-medium">
                    {deal.deal}
                  </p>
                </div>
                
                {/* Coupon */}
                <button
                  onClick={() => copyCoupon(deal.coupon)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm font-medium transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
                  role="button"
                  aria-label={`Copy coupon code ${deal.coupon}`}
                >
                  <code className="text-xs">{deal.coupon}</code>
                  {copiedCoupon === deal.coupon ? (
                    <Check className="w-3 h-3 text-success-green" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                
                {/* CTAs */}
                <div className="space-y-2">
                  <Button 
                    asChild
                    variant="primary"
                    className="w-full font-semibold"
                    data-track={deal.track}
                  >
                    <a 
                      href={`${deal.ctaUrl}&utm_source=site&utm_medium=affiliate_grid&utm_campaign=tool_deals`}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Get ${deal.tool} deal`}
                    >
                      Get Deal
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline">
                    Learn more
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Affiliate Disclosure */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Some links are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
      
      {/* Bottom Divider */}
      <div className="w-full border-b border-border/30 mt-12"></div>
    </div>
  );
};
export default FeatureCards;