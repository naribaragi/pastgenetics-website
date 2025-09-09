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
const trendingPrompts = [{
  rank: 1,
  title: "Vintage City Map Art Bundles",
  category: "Midjourney",
  price: "$4.99",
  image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=60&h=60&fit=crop"
}, {
  rank: 2,
  title: "Celestial Golden Harmony Art",
  category: "Midjourney",
  price: "$4.99",
  image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=60&h=60&fit=crop"
}, {
  rank: 6,
  title: "Business Logo Generators",
  category: "ChatGPT Image",
  price: "$3.99",
  image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop"
}, {
  rank: 7,
  title: "Christmas Fairy Tale Kids Characters",
  category: "Midjourney",
  price: "$3.99",
  image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=60&h=60&fit=crop"
}];
const PromptShowcase = () => {
  return <div className="container px-4 max-w-screen-xl space-y-16">
      {/* Featured Prompts */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Featured Prompts</h2>
          <Star className="w-6 h-6 text-coral" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featuredPrompts.map(prompt => <Card key={prompt.id} className="group overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="relative">
                <img src={prompt.image} alt={prompt.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                {prompt.isVideo && <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>}
                <Badge className="absolute top-2 left-2 text-xs" variant={prompt.isVideo ? "default" : "secondary"}>
                  {prompt.category}
                </Badge>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-coral transition-colors">
                  {prompt.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-star text-star" />
                    <span className="text-xs text-muted-foreground">{prompt.rating}</span>
                  </div>
                  <span className="font-bold text-coral">{prompt.price}</span>
                </div>
              </div>
            </Card>)}
        </div>
      </section>

      {/* Trending Prompts */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Trending Prompts</h2>
          <TrendingUp className="w-6 h-6 text-coral" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingPrompts.map((prompt, index) => <Card key={index} className="p-4 bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-coral w-8">
                  {prompt.rank}
                </div>
                
                <img src={prompt.image} alt={prompt.title} className="w-12 h-12 rounded-lg object-cover" />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{prompt.title}</h4>
                  <p className="text-xs text-muted-foreground">{prompt.category}</p>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-coral">{prompt.price}</div>
                </div>
              </div>
            </Card>)}
        </div>

        <div className="text-center mt-8">
          
        </div>
      </section>
    </div>;
};
export default PromptShowcase;