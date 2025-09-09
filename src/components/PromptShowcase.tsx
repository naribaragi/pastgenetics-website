import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [columnsPerPage, setColumnsPerPage] = useState(3);

  // Calculate responsive columns per page
  useEffect(() => {
    const updateColumnsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setColumnsPerPage(3);
      } else if (width >= 768) {
        setColumnsPerPage(2);
      } else {
        setColumnsPerPage(1);
      }
    };

    updateColumnsPerPage();
    window.addEventListener('resize', updateColumnsPerPage);
    return () => window.removeEventListener('resize', updateColumnsPerPage);
  }, []);

  // Calculate total pages based on columns per page
  useEffect(() => {
    const totalColumns = Math.ceil(trendingPrompts.length / 5); // 5 rows per column
    setTotalPages(Math.ceil(totalColumns / columnsPerPage));
  }, [columnsPerPage]);

  const scrollToPage = (page: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const columnWidth = container.scrollWidth / Math.ceil(trendingPrompts.length / 5);
    const scrollPosition = page * columnWidth * columnsPerPage;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevious();
    }
  };

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

      {/* Trending Prompts Carousel */}
      <section
        role="region"
        aria-label="Trending carousel"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="relative focus:outline-none focus:ring-2 focus:ring-ring rounded-lg"
      >
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Trending Prompts</h2>
          <TrendingUp className="w-6 h-6 text-coral" />
        </div>

        <div className="relative">
          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-[12%] bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          
          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[12%] bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Left Arrow */}
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-background/90 disabled:opacity-40 disabled:hover:scale-100 ${
              isHovering ? 'opacity-100' : 'opacity-0 md:opacity-100'
            }`}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Button>

          {/* Right Arrow */}
          <Button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next page"
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-background/90 disabled:opacity-40 disabled:hover:scale-100 ${
              isHovering ? 'opacity-100' : 'opacity-0 md:opacity-100'
            }`}
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Button>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="trending-carousel-container overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', paddingInline: '20px' }}
          >
            <div className="trending-carousel-grid">
              {trendingPrompts
                .sort((a, b) => a.rank - b.rank)
                .map((prompt) => (
                  <Card 
                    key={prompt.rank} 
                    className="group trending-card bg-card/50 hover:bg-card/80 border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-coral/10"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="flex items-center gap-3 p-3 h-20">
                      {/* Left: Thumbnail with Badge */}
                      <div className="relative flex-shrink-0">
                        <img 
                          src={prompt.image} 
                          alt={prompt.title} 
                          className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        {/* Ranking Badge */}
                        <div className="absolute -top-1 -left-1">
                          <div className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md min-w-[20px] text-center leading-tight">
                            #{prompt.rank}
                          </div>
                        </div>
                      </div>
                      
                      {/* Right: Content */}
                      <div className="flex-1 min-w-0 space-y-1">
                        {/* Title */}
                        <h4 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-coral transition-colors">
                          {prompt.title}
                        </h4>
                        
                        {/* Meta row: Platform + Rating */}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-sm">{prompt.category}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-star text-star" />
                            <span className="text-sm">{prompt.rating}</span>
                          </div>
                        </div>
                        
                        {/* Price - separate line, muted */}
                        <div className="text-sm font-semibold text-muted-foreground/80">
                          {prompt.price}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Page Indicator */}
          {totalPages > 1 && (
            <div className="absolute bottom-4 right-6 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
              Page {currentPage + 1} of {totalPages}
            </div>
          )}
        </div>
      </section>
    </div>;
};
export default PromptShowcase;