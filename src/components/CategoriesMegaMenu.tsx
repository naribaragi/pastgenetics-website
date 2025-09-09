import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, X, ArrowLeft } from "lucide-react";
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
  
  // Mobile state
  const [mobileView, setMobileView] = useState<'main' | 'sub'>('main');
  const [mobileSelected, setMobileSelected] = useState<CategoryItem | null>(null);
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leftRailRef = useRef<HTMLDivElement>(null);

  // Initialize with first item
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
            setFocusedIndex((prev) => Math.min(prev + 1, categoriesData[0].children.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (focusedPane === 'left') {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
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
            setSelectedLeft(categoriesData[0].children[focusedIndex]);
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

  const handleLeftItemHover = (item: CategoryItem) => {
    setSelectedLeft(item);
    setSelectedMiddle(null);
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

  // Desktop Mega Menu
  const MegaMenuPanel = () => (
    <div
      ref={panelRef}
      className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-white/8 rounded-2xl shadow-2xl z-50 min-h-96 max-h-[72vh] overflow-hidden"
      style={{ 
        background: '#171C2D',
        left: 'calc(-50vw + 50%)',
        right: 'calc(-50vw + 50%)',
        width: '100vw',
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      role="dialog"
      aria-label="Browse categories"
    >
      <div className="grid grid-cols-3 h-full p-4 gap-6">
        {/* Left Rail */}
        <div className="flex flex-col min-h-0">
          <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-4 font-medium">Categories</h3>
          <div 
            ref={leftRailRef}
            className="flex-1 overflow-y-auto scrollbar-hide space-y-1"
          >
            {categoriesData[0]?.children.map((item, index) => (
              <button
                key={item.id}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedLeft?.id === item.id 
                    ? 'bg-slate-700 text-white' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                } ${focusedPane === 'left' && focusedIndex === index ? 'ring-2 ring-blue-400' : ''}`}
                onMouseEnter={() => handleLeftItemHover(item)}
                onClick={() => handleItemClick(item.href)}
              >
                <span className="font-medium">{item.label}</span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="absolute left-1/3 top-4 bottom-4 w-px bg-white/6" />

        {/* Middle List */}
        <div className="flex flex-col min-h-0">
          <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-4 font-medium">
            {selectedLeft ? `All ${selectedLeft.label}` : 'Subcategories'}
          </h3>
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
            {selectedLeft?.middle?.map((item, index) => (
              <button
                key={item}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedMiddle === item 
                    ? 'text-white bg-slate-700/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/20'
                }`}
                onMouseEnter={() => handleMiddleItemHover(item)}
                onClick={() => handleItemClick(`${selectedLeft.href}?filter=${encodeURIComponent(item)}`)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="absolute left-2/3 top-4 bottom-4 w-px bg-white/6" />

        {/* Right Grid */}
        <div className="flex flex-col min-h-0">
          <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-4 font-medium">Popular Tags</h3>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-2">
              {selectedLeft?.right?.map((tag) => (
                <button
                  key={tag}
                  className="text-sm text-slate-300 hover:text-white hover:underline text-left py-1 transition-colors"
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
          aria-expanded={isOpen}
          aria-controls="mega-categories"
        >
          Categories <ChevronDown className="h-4 w-4" />
        </Button>

        {isOpen && <MegaMenuPanel />}
      </div>

      {/* Mobile Trigger & Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              Categories <ChevronDown className="h-4 w-4" />
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