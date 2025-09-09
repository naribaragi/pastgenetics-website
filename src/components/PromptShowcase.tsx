import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, TrendingUp } from "lucide-react";
const featuredPrompts = [{
  id: 1,
  title: "Vintage Stipple Engraving Style",
  price: "$4.99",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
  category: "Midjourney",
  isVideo: false
}, {
  id: 2,
  title: "Phosphorescent Paper For Junk Journals",
  price: "$5.99",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop",
  category: "Midjourney",
  isVideo: false
}, {
  id: 3,
  title: "Synthwave Anime Cyberpunk Aesthetic",
  price: "$3.99",
  rating: 4.7,
  image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
  category: "Midjourney",
  isVideo: false
}, {
  id: 4,
  title: "Epic Adventure Drone Storytelling Video",
  price: "$3.99",
  rating: 4.6,
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  category: "Midjourney Video",
  isVideo: true
}, {
  id: 5,
  title: "70s Film Stock Motion Visuals Kodak",
  price: "$3.99",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=300&fit=crop",
  category: "Midjourney Video",
  isVideo: true
}];
const trendingPrompts = [
  {
    rank: 1,
    title: "Vintage City Map Art Bundles",
    category: "Midjourney",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&h=300&fit=crop",
    rating: 4.9
  },
  {
    rank: 2,
    title: "Celestial Golden Harmony Art",
    category: "Midjourney",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=300&fit=crop",
    rating: 4.8
  },
  {
    rank: 3,
    title: "Business Logo Generators",
    category: "ChatGPT Image",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
    rating: 4.7
  },
  {
    rank: 4,
    title: "Christmas Fairy Tale Kids Characters",
    category: "Midjourney",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=300&h=300&fit=crop",
    rating: 4.6
  },
  {
    rank: 5,
    title: "Professional Portrait Photography",
    category: "Midjourney",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    rating: 4.9
  },
  {
    rank: 6,
    title: "Abstract Geometric Patterns",
    category: "Midjourney",
    price: "$2.99",
    image: "https://images.unsplash.com/photo-1557672172-298cb2e13703?w=300&h=300&fit=crop",
    rating: 4.5
  },
  {
    rank: 7,
    title: "Cyberpunk Neon Cityscapes",
    category: "Midjourney",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
    rating: 4.8
  },
  {
    rank: 8,
    title: "Minimalist Product Mockups",
    category: "ChatGPT Image",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=300&fit=crop",
    rating: 4.7
  },
  {
    rank: 9,
    title: "Fantasy Character Illustrations",
    category: "Midjourney",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    rating: 4.9
  },
  {
    rank: 10,
    title: "Social Media Templates",
    category: "ChatGPT Image",
    price: "$2.99",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
    rating: 4.4
  },
  {
    rank: 11,
    title: "Watercolor Botanical Art",
    category: "Midjourney",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.8
  },
  {
    rank: 12,
    title: "Corporate Presentation Templates",
    category: "ChatGPT Image",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
    rating: 4.6
  },
  {
    rank: 13,
    title: "Vintage Movie Poster Style",
    category: "Midjourney",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1489599142998-0ec8d8b53b2b?w=300&h=300&fit=crop",
    rating: 4.7
  },
  {
    rank: 14,
    title: "Modern Architecture Renders",
    category: "Midjourney",
    price: "$7.99",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop",
    rating: 4.8
  },
  {
    rank: 15,
    title: "Food Photography Styling",
    category: "Midjourney",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop",
    rating: 4.5
  },
  {
    rank: 16,
    title: "Digital Art Portraits",
    category: "Midjourney",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop",
    rating: 4.9
  },
  {
    rank: 17,
    title: "Seamless Pattern Designs",
    category: "ChatGPT Image",
    price: "$2.99",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
    rating: 4.6
  },
  {
    rank: 18,
    title: "Luxury Brand Identity",
    category: "ChatGPT Image",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=300&h=300&fit=crop",
    rating: 4.9
  },
  {
    rank: 19,
    title: "3D Isometric Illustrations",
    category: "Midjourney",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=300&fit=crop",
    rating: 4.7
  },
  {
    rank: 20,
    title: "Retro Gaming Assets",
    category: "Midjourney",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop",
    rating: 4.8
  }
];
const PromptShowcase = () => {
  return <div className="container px-4 max-w-screen-xl space-y-16">
      {/* Featured Prompts */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Featured Prompts</h2>
          <Star className="w-6 h-6 text-coral" />
        </div>
        
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
            {featuredPrompts.map(prompt => (
              <Card key={prompt.id} className="group flex-none w-72 sm:w-80 overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg snap-start">
                <div className="relative">
                  <img src={prompt.image} alt={prompt.title} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" />
                  {prompt.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  <Badge className="absolute top-2 left-2 text-xs" variant={prompt.isVideo ? "default" : "secondary"}>
                    {prompt.category}
                  </Badge>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-2 line-clamp-1 group-hover:text-coral transition-colors">
                    {prompt.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-star text-star" />
                      <span className="text-xs text-muted-foreground">{prompt.rating}</span>
                    </div>
                    <span className="font-bold text-coral text-sm">{prompt.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Prompts */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Trending Prompts</h2>
          <TrendingUp className="w-6 h-6 text-coral" />
        </div>

        <div className="space-y-4 max-h-[600px] overflow-hidden">
          {Array.from({ length: Math.min(5, Math.ceil(trendingPrompts.length / 4)) }, (_, rowIndex) => {
            const rowItems = trendingPrompts.slice(rowIndex * 4, (rowIndex + 1) * 4);
            return (
              <div key={rowIndex} className="relative">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
                  {rowItems.map((prompt, index) => (
                    <Card key={`${rowIndex}-${index}`} className="group flex-none w-80 sm:w-96 overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-coral/10 snap-start">
                      <div className="flex items-center gap-4 p-4 h-24">
                        {/* Left: Thumbnail */}
                        <div className="relative flex-shrink-0">
                          <img 
                            src={prompt.image} 
                            alt={prompt.title} 
                            className="w-16 h-16 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300" 
                          />
                          {/* Ranking Badge */}
                          <div className="absolute -top-2 -left-2">
                            <div className="bg-coral text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg min-w-[24px] text-center">
                              #{prompt.rank}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right: Content */}
                        <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                          {/* Top: Title and Platform */}
                          <div className="space-y-1">
                            <h4 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-coral transition-colors">
                              {prompt.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                {prompt.category}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-star text-star" />
                                <span className="text-xs text-muted-foreground">{prompt.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Bottom: Price */}
                          <div className="flex justify-end">
                            <span className="font-bold text-coral text-lg">
                              {prompt.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          
        </div>
      </section>
    </div>;
};
export default PromptShowcase;