import { useState, useEffect, useRef } from "react";
import { X, Heart, ExternalLink, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface QuickLookData {
  id: string;
  title: string;
  coverImage: string;
  price: string;
  rating?: number;
  modelTag: string;
  slug: string;
  smallThumb?: string;
  isVideo?: boolean;
  isSaved?: boolean;
}

interface QuickLookProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuickLookData | null;
  triggerElement: HTMLElement | null;
  isMobile?: boolean;
}

export const QuickLook = ({ isOpen, onClose, data, triggerElement, isMobile = false }: QuickLookProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isSaved, setIsSaved] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setIsSaved(data.isSaved || false);
    }
  }, [data]);

  // Position calculation for desktop
  useEffect(() => {
    if (!isOpen || !triggerElement || isMobile) return;

    const calculatePosition = () => {
      const triggerRect = triggerElement.getBoundingClientRect();
      const popupWidth = 400;
      const popupHeight = 300;
      const offset = 12;

      // Position above and slightly to the right like PromptBase
      let top = triggerRect.top - popupHeight - offset;
      let left = triggerRect.left + (triggerRect.width / 2) - (popupWidth / 2);

      // Adjust if popup goes off-screen
      if (left < 16) left = 16;
      if (left + popupWidth > window.innerWidth - 16) {
        left = window.innerWidth - popupWidth - 16;
      }
      
      // If no space above, show below
      if (top < 16) {
        top = triggerRect.bottom + offset;
      }

      setPosition({ top, left });
    };

    calculatePosition();
    const handleScroll = () => onClose();
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerElement, onClose, isMobile]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    // TODO: Wire to actual favorites system
  };

  const handleExternalLink = () => {
    if (data?.slug) {
      window.open(data.slug, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCTAClick = () => {
    if (data?.slug) {
      window.location.href = data.slug;
    }
    onClose();
  };


  if (!data) return null;

  // Mobile Bottom Sheet
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="bottom" 
          className="h-[80vh] rounded-t-3xl bg-slate-800 border-slate-700"
          style={{ background: '#1B2136' }}
        >
          <div className="flex flex-col h-full">
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* Hero Image */}
            <div className="relative flex-shrink-0 aspect-[4/3] mb-4 rounded-2xl overflow-hidden">
              <img
                src={data.coverImage}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              {data.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              )}
              
              {/* Corner actions */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={handleSaveToggle}
                  className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-colors hover:bg-black/70"
                  aria-label={isSaved ? "Remove from saved" : "Save"}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button
                  onClick={handleExternalLink}
                  className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-colors hover:bg-black/70"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto">
              <div className="text-slate-400 text-sm">
                Tap "Get prompt" to view full details
              </div>
            </div>

            {/* Sticky bottom bar */}
            <div className="flex items-center gap-3 p-4 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 rounded-t-xl -mx-6 -mb-6">
              <img
                src={data.smallThumb || data.coverImage}
                alt=""
                className="w-7 h-7 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{data.title}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">{data.modelTag}</span>
                  {data.rating && (
                    <>
                      <span className="text-slate-500">•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-slate-300">{data.rating}</span>
                      </div>
                    </>
                  )}
                  <span className="text-slate-500">•</span>
                  <span className="text-white font-medium">{data.price}</span>
                </div>
              </div>
              <Button
                onClick={handleCTAClick}
                variant="primary"
                size="sm"
                className="px-6"
                data-track={`quicklook_cta:${data.id}`}
              >
                Get prompt
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop Popup
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[998]" 
          onClick={onClose}
        />
      )}
      
      {isOpen && (
        <div
          ref={popupRef}
          className="fixed z-[999] animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: '400px',
          }}
        >
          <div 
            className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Hero Image */}
            <div className="relative aspect-[5/4]">
              <img
                src={data.coverImage}
                alt={data.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              {data.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
              )}
              
              {/* Corner actions */}
              <div className="absolute top-3 left-3 flex gap-2">
                <button
                  onClick={handleSaveToggle}
                  className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                  aria-label={isSaved ? "Unsave" : "Save"}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button
                  onClick={handleExternalLink}
                  className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Info Bar */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-white text-sm leading-snug">{data.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span>{data.modelTag}</span>
                  {data.rating && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-slate-300">{data.rating}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{data.price}</span>
                <Button
                  onClick={handleCTAClick}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 h-auto text-xs font-medium rounded-lg"
                >
                  Get prompt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickLook;
