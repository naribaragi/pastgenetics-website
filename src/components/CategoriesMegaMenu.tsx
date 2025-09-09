import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ArrowLeft, Grid3x3, Palette, Image, Type, Briefcase, Camera, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface CategoryItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  subcategories?: string[];
}

interface TopLevelCategory {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  items: CategoryItem[];
}

const categoriesData: TopLevelCategory[] = [
  {
    id: "models",
    label: "Models",
    icon: Grid3x3,
    items: [
      { id: "all-models", label: "All Models prompts", href: "/models" },
      { id: "chatgpt", label: "ChatGPT prompts", href: "/chatgpt" },
      { id: "claude", label: "Claude prompts", href: "/claude" },
      { id: "dalle", label: "DALL·E prompts", href: "/dalle" },
      { id: "midjourney", label: "Midjourney prompts", href: "/midjourney" },
      { id: "stable-diffusion", label: "Stable Diffusion prompts", href: "/stable-diffusion" }
    ]
  },
  {
    id: "art",
    label: "Art",
    icon: Palette,
    items: [
      { id: "all-art", label: "All Art & Illustrations prompts", href: "/art" },
      { id: "anime", label: "Anime prompts", href: "/art/anime" },
      { id: "cartoon", label: "Cartoon prompts", href: "/art/cartoon" },
      { id: "painting", label: "Painting prompts", href: "/art/painting" },
      { id: "illustration", label: "Illustration prompts", href: "/art/illustration" },
      { id: "unique-styles", label: "Unique Styles prompts", href: "/art/unique-styles" }
    ]
  },
  {
    id: "logos",
    label: "Logos",
    icon: Type,
    items: [
      { id: "all-logos", label: "All Logo prompts", href: "/logos" },
      { id: "business", label: "Business logos", href: "/logos/business" },
      { id: "tech", label: "Tech logos", href: "/logos/tech" },
      { id: "creative", label: "Creative logos", href: "/logos/creative" }
    ]
  },
  {
    id: "graphics",
    label: "Graphics",
    icon: Image,
    items: [
      { id: "all-graphics", label: "All Graphics prompts", href: "/graphics" },
      { id: "web-design", label: "Web Design prompts", href: "/graphics/web-design" },
      { id: "print", label: "Print Design prompts", href: "/graphics/print" }
    ]
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: Briefcase,
    items: [
      { id: "all-productivity", label: "All Productivity prompts", href: "/productivity" },
      { id: "writing", label: "Writing prompts", href: "/productivity/writing" },
      { id: "business", label: "Business prompts", href: "/productivity/business" }
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Briefcase,
    items: [
      { id: "all-marketing", label: "All Marketing prompts", href: "/marketing" },
      { id: "social-media", label: "Social Media prompts", href: "/marketing/social-media" },
      { id: "advertising", label: "Advertising prompts", href: "/marketing/advertising" }
    ]
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
    items: [
      { id: "all-photography", label: "All Photography prompts", href: "/photography" },
      { id: "portrait", label: "Portrait prompts", href: "/photography/portrait" },
      { id: "landscape", label: "Landscape prompts", href: "/photography/landscape" }
    ]
  },
  {
    id: "games",
    label: "Games",
    icon: Gamepad2,
    items: [
      { id: "all-games", label: "All Games prompts", href: "/games" },
      { id: "character", label: "Character Design prompts", href: "/games/character" },
      { id: "environment", label: "Environment prompts", href: "/games/environment" }
    ]
  }
];

interface CategoriesMegaMenuProps {
  className?: string;
}

export const CategoriesMegaMenu = ({ className }: CategoriesMegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopCategory, setSelectedTopCategory] = useState<TopLevelCategory>(categoriesData[0]);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Mobile state
  const [mobileView, setMobileView] = useState<'main' | 'sub'>('main');
  const [mobileSelected, setMobileSelected] = useState<TopLevelCategory | null>(null);
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node) && 
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle hover to open
  const handleTriggerMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleTriggerMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handlePanelMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handlePanelMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handleTopCategoryHover = (category: TopLevelCategory) => {
    setSelectedTopCategory(category);
  };

  const handleItemClick = (href?: string) => {
    if (href) {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  // Desktop Mega Menu Panel
  const MegaMenuPanel = () => (
    <div
      ref={panelRef}
      className="fixed left-0 right-0 mt-2 border border-white/8 rounded-2xl z-50 overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2 mx-4"
      style={{ 
        background: '#171C2D',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
        height: '500px',
        maxWidth: 'none'
      }}
      role="dialog"
      aria-label="Browse categories"
      id="mega-categories"
      onMouseEnter={handlePanelMouseEnter}
      onMouseLeave={handlePanelMouseLeave}
    >
      {/* Top Category Row */}
      <div className="border-b border-white/6 p-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categoriesData.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-150 ${
                  selectedTopCategory.id === category.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                onMouseEnter={() => handleTopCategoryHover(category)}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-white/6 p-4">
          <div className="space-y-1">
            {selectedTopCategory.items.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-150"
                onClick={() => handleItemClick(item.href)}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-4">
          <div className="text-slate-400 text-sm">
            Select a category from the left to see more options
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sheet Content
  const MobileSheetContent = () => (
    <>
      <SheetHeader className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          {mobileView === 'sub' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileView('main')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <SheetTitle className="text-lg font-semibold">
            {mobileView === 'main' ? 'Categories' : mobileSelected?.label}
          </SheetTitle>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-4">
        {mobileView === 'main' ? (
          <div className="space-y-2">
            {categoriesData.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/50 rounded-lg transition-colors"
                  onClick={() => {
                    setMobileSelected(category);
                    setMobileView('sub');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-white">{category.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {mobileSelected?.items.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-700/30 rounded-md transition-colors"
                onClick={() => handleItemClick(item.href)}
              >
                <span className="text-white">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop/Tablet Trigger */}
      <div className={`hidden md:block relative ${className}`}>
        <Button
          ref={triggerRef}
          variant="ghost"
          size="sm"
          className="gap-1 text-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          aria-expanded={isOpen}
          aria-controls="mega-categories"
          role="button"
        >
          <Grid3x3 className="h-4 w-4" />
          Categories 
          <ChevronDown className="h-4 w-4" />
        </Button>

        {isOpen && <MegaMenuPanel />}
      </div>

      {/* Mobile Trigger & Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <Grid3x3 className="h-4 w-4" />
              Categories 
              <ChevronDown className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full sm:max-w-md bg-slate-900 border-slate-700"
          >
            <MobileSheetContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default CategoriesMegaMenu;