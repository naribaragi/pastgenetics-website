import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, X, ArrowLeft, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface CategoryItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  middle?: string[];
  right?: string[];
}

interface CategoryGroup {
  id: string;
  label: string;
  icon?: string;
  children: CategoryItem[];
}

const categoriesData: CategoryGroup[] = [
  {
    id: "models",
    label: "All Models prompts",
    icon: "models",
    children: [
      {
        id: "chatgpt-image",
        label: "ChatGPT Image prompts",
        icon: "chatgpt-image",
        href: "/chatgpt-image",
        middle: ["Cartoon", "Celebrity", "Clothing", "Clip Art", "Cute", "Cyberpunk", "Drawing", "Drink", "Fantasy", "Fashion"],
        right: ["Food", "Jewelry", "Landscape", "Logo", "Mockup", "Monogram", "Monster", "Nature", "Pattern", "Painting", "People", "Photographic", "Pixel Art", "Poster", "Product", "Psychedelic", "Retro", "Scary", "Space", "Steampunk", "Statue", "Sticker", "Unique Style", "Synthwave", "Texture", "Vehicle", "Wallpaper"]
      },
      {
        id: "claude",
        label: "Claude prompts",
        icon: "claude",
        href: "/claude",
        middle: ["Business", "Creative", "Technical", "Academic", "Personal", "Research"],
        right: ["Analysis", "Brainstorming", "Code Review", "Content Creation", "Data Processing", "Email Templates", "Marketing Copy", "Report Writing", "Strategy Planning", "Summarization"]
      },
      {
        id: "dalle",
        label: "DALL·E prompts",
        icon: "dalle",
        href: "/dalle",
        middle: ["Abstract", "Artistic", "Realistic", "Cartoon", "Fantasy", "Portrait"],
        right: ["Architecture", "Animals", "Characters", "Digital Art", "Fashion", "Food Photography", "Illustrations", "Landscapes", "Product Design", "Concept Art"]
      },
      {
        id: "midjourney",
        label: "Midjourney prompts",
        icon: "midjourney",
        href: "/midjourney",
        middle: ["Photography", "Art Styles", "Characters", "Environments", "Products", "Abstract"],
        right: ["Portrait Photography", "Landscape Art", "Character Design", "Architecture", "Product Mockups", "Digital Painting", "Concept Art", "Fashion Photography", "Still Life", "Surreal Art"]
      },
      {
        id: "stable-diffusion",
        label: "Stable Diffusion prompts",
        icon: "stable-diffusion",
        href: "/stable-diffusion",
        middle: ["Realistic", "Anime", "Digital Art", "Photography", "3D Render", "Painting"],
        right: ["Portraits", "Landscapes", "Architecture", "Fantasy", "Sci-Fi", "Horror", "Cute", "Professional", "Artistic", "Commercial"]
      },
      {
        id: "sora",
        label: "Sora prompts",
        icon: "sora",
        href: "/sora",
        middle: ["Cinematic", "Documentary", "Animation", "Product Demo", "Training", "Explainer"],
        right: ["Corporate Videos", "Social Media", "Advertisements", "Educational Content", "Entertainment", "News Reports"]
      }
    ]
  }
];

interface CategoriesMegaMenuProps {
  className?: string;
}

export const CategoriesMegaMenu = ({ className }: CategoriesMegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState<CategoryItem | null>(null);
  const [selectedMiddle, setSelectedMiddle] = useState<string | null>(null);
  const [focusedPane, setFocusedPane] = useState<'left' | 'middle' | 'right'>('left');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Mobile state
  const [mobileView, setMobileView] = useState<'main' | 'sub'>('main');
  const [mobileSelected, setMobileSelected] = useState<CategoryItem | null>(null);
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leftRailRef = useRef<HTMLDivElement>(null);

  // Initialize with first item and load from localStorage
  useEffect(() => {
    if (categoriesData[0]?.children[0]) {
      const savedGroup = localStorage.getItem('ui.lastCategoryGroup');
      const initialItem = savedGroup 
        ? categoriesData[0].children.find(item => item.id === savedGroup) || categoriesData[0].children[0]
        : categoriesData[0].children[0];
      setSelectedLeft(initialItem);
    }
  }, []);

  // Save selection to localStorage
  useEffect(() => {
    if (selectedLeft) {
      localStorage.setItem('ui.lastCategoryGroup', selectedLeft.id);
    }
  }, [selectedLeft]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (focusedPane === 'left' && categoriesData[0]?.children) {
            const nextIndex = Math.min(focusedIndex + 1, categoriesData[0].children.length - 1);
            setFocusedIndex(nextIndex);
            setSelectedLeft(categoriesData[0].children[nextIndex]);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (focusedPane === 'left') {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
            setSelectedLeft(categoriesData[0].children[prevIndex]);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (focusedPane === 'left') {
            setFocusedPane('middle');
            setFocusedIndex(0);
          } else if (focusedPane === 'middle') {
            setFocusedPane('right');
            setFocusedIndex(0);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (focusedPane === 'right') {
            setFocusedPane('middle');
          } else if (focusedPane === 'middle') {
            setFocusedPane('left');
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedPane === 'left' && categoriesData[0]?.children[focusedIndex]) {
            handleItemClick(categoriesData[0].children[focusedIndex].href);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedPane, focusedIndex]);

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

  const handleLeftItemHover = (item: CategoryItem, index: number) => {
    setSelectedLeft(item);
    setSelectedMiddle(null);
    setFocusedIndex(index);
  };

  const handleMiddleItemHover = (item: string) => {
    setSelectedMiddle(item);
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
      className="fixed left-1/2 transform -translate-x-1/2 mt-2 border border-white/8 rounded-2xl z-50 min-h-96 max-h-[72vh] overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2"
      style={{ 
        background: '#171C2D',
        width: 'min(1440px, calc(100vw - 32px))',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)'
      }}
      role="dialog"
      aria-label="Browse categories"
      id="mega-categories"
      onMouseEnter={handlePanelMouseEnter}
      onMouseLeave={handlePanelMouseLeave}
    >
      <div className="grid grid-cols-3 h-full p-5 gap-0">
        {/* Left Rail */}
        <div className="flex flex-col min-h-0 pr-4" style={{ width: '320px', flexShrink: 0 }}>
          <h3 className="text-sm uppercase tracking-wider mb-4 font-medium" style={{ color: '#AEB5C9', letterSpacing: '0.06em' }}>
            Categories
          </h3>
          <div 
            ref={leftRailRef}
            className="flex-1 overflow-y-auto scrollbar-hide space-y-1"
          >
            {categoriesData[0]?.children.map((item, index) => (
              <button
                key={item.id}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-150 ${
                  selectedLeft?.id === item.id 
                    ? 'text-white' 
                    : 'text-slate-300 hover:text-white'
                } ${focusedPane === 'left' && focusedIndex === index ? 'ring-2 ring-blue-400' : ''}`}
                style={{ 
                  height: '48px',
                  backgroundColor: selectedLeft?.id === item.id ? '#242C46' : 'transparent'
                }}
                onMouseEnter={() => handleLeftItemHover(item, index)}
                onClick={() => handleItemClick(item.href)}
                aria-current={selectedLeft?.id === item.id ? 'true' : undefined}
              >
                <span className="font-medium text-sm">{item.label}</span>
                <ChevronRight className="h-4 w-4" style={{ opacity: 0.6 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="absolute left-80 top-5 bottom-5 w-px bg-white/6" />

        {/* Middle List */}
        <div className="flex flex-col min-h-0 px-4">
          <h3 className="text-sm uppercase tracking-wider mb-4 font-medium" style={{ color: '#AEB5C9', letterSpacing: '0.06em' }}>
            {selectedLeft ? `All ${selectedLeft.label}` : 'Subcategories'}
          </h3>
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
            {selectedLeft?.middle?.map((item) => (
              <button
                key={item}
                className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-150 text-sm ${
                  selectedMiddle === item 
                    ? 'text-white bg-slate-700/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/20'
                }`}
                style={{ lineHeight: '34px' }}
                onMouseEnter={() => handleMiddleItemHover(item)}
                onClick={() => handleItemClick(`${selectedLeft.href}?filter=${encodeURIComponent(item)}`)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="absolute right-80 top-5 bottom-5 w-px bg-white/6" />

        {/* Right Grid */}
        <div className="flex flex-col min-h-0 pl-4">
          <h3 className="text-sm uppercase tracking-wider mb-4 font-medium" style={{ color: '#AEB5C9', letterSpacing: '0.06em' }}>
            Popular Tags
          </h3>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {selectedLeft?.right?.map((tag) => (
                <button
                  key={tag}
                  className="text-slate-300 hover:text-white hover:underline text-left py-1 transition-all duration-150 underline-offset-2"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                  onClick={() => handleItemClick(`${selectedLeft.href}?tag=${encodeURIComponent(tag)}`)}
                >
                  {tag}
                </button>
              ))}
            </div>
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
            {categoriesData[0]?.children.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/50 rounded-lg transition-colors"
                onClick={() => {
                  setMobileSelected(item);
                  setMobileView('sub');
                }}
              >
                <span className="font-medium text-white">{item.label}</span>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Middle items */}
            {mobileSelected?.middle && mobileSelected.middle.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3 font-medium">Subcategories</h3>
                <div className="space-y-2">
                  {mobileSelected.middle.map((item) => (
                    <button
                      key={item}
                      className="block w-full text-left p-3 text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-md transition-colors"
                      onClick={() => handleItemClick(`${mobileSelected.href}?filter=${encodeURIComponent(item)}`)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Right grid as list on mobile */}
            {mobileSelected?.right && mobileSelected.right.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3 font-medium">Popular Tags</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mobileSelected.right.map((tag) => (
                    <button
                      key={tag}
                      className="text-sm text-slate-300 hover:text-white hover:underline text-left p-2 transition-colors"
                      onClick={() => handleItemClick(`${mobileSelected.href}?tag=${encodeURIComponent(tag)}`)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
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