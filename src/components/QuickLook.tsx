import { useState, useEffect, useRef } from "react";
import { X, Heart, ExternalLink, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
      const popupWidth = 480;
      const popupHeight = 400;
      const offset = 16;
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let top = triggerRect.top - popupHeight - offset;
      let left = triggerRect.right - popupWidth + (triggerRect.width * 0.3);

      // Flip vertically if not enough space above
      if (top < 20) {
        top = triggerRect.bottom + offset;
      }

      // Adjust horizontally if overflowing
      if (left < 20) {
        left = 20;
      } else if (left + popupWidth > viewport.width - 20) {
        left = viewport.width - popupWidth - 20;
      }

      // Ensure it doesn't go below viewport
      if (top + popupHeight > viewport.height - 20) {
        top = viewport.height - popupHeight - 20;
      }

      setPosition({ top, left });
    };

    calculatePosition();
    window.addEventListener('scroll', onClose);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', onClose);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerElement, onClose, isMobile]);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        // Keep focus within popup
        if (!popupRef.current) return;
        
        const focusableElements = popupRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus close button when opening
      setTimeout(() => closeButtonRef.current?.focus(), 100);
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

  const handlePanelMouseEnter = () => {
    // Prevent closing when hovering over popup
  };

  const handlePanelMouseLeave = () => {
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
          className="fixed inset-0 z-[1000]" 
          onClick={onClose}
          style={{ backgroundColor: 'transparent' }}
        />
      )}
      
      <div
        ref={popupRef}
        className={`fixed z-[1001] transition-all duration-150 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: '480px',
          maxHeight: '70vh',
          background: '#1B2136',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quicklook-title"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={handlePanelMouseEnter}
        onMouseLeave={handlePanelMouseLeave}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close preview"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="flex flex-col h-full max-h-[70vh]">
          {/* Hero Image */}
          <div className="relative aspect-[4/3] flex-shrink-0">
            <img
              src={data.coverImage}
              alt={data.title}
              className="w-full h-full object-cover rounded-t-[20px]"
            />
            {data.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            )}
            
            {/* Corner actions */}
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={handleSaveToggle}
                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={isSaved ? "Remove from saved" : "Save"}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <button
                onClick={handleExternalLink}
                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Compact Product Bar */}
          <div className="flex items-center gap-3 p-4 bg-slate-800/50 backdrop-blur-sm rounded-b-[20px]">
            <img
              src={data.smallThumb || data.coverImage}
              alt=""
              className="w-7 h-7 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div 
                id="quicklook-title"
                className="text-sm font-medium text-white truncate"
              >
                {data.title}
              </div>
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
              className="px-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
              data-track={`quicklook_cta:${data.id}`}
            >
              Get prompt
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickLook;
