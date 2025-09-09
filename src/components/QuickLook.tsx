import { useEffect, useRef, useState, useCallback } from "react";
import { X, Heart, ExternalLink, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { QuickLookData } from "@/lib/types";
import { useFloatingPosition } from "@/hooks/useFloatingPosition";

interface QuickLookProps {
  isOpen: boolean;
  data: QuickLookData | null;
  triggerEl: HTMLElement | null;
  close: () => void;
  popupEnter: () => void;
  popupLeave: () => void;
  isTouch: boolean;
}

export const QuickLook = ({ isOpen, data, triggerEl, close, popupEnter, popupLeave, isTouch }: QuickLookProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { style, update } = useFloatingPosition(triggerEl, popupRef.current);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (data) setIsSaved(data.isSaved || false);
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      update();
      closeRef.current?.focus();
    } else {
      triggerEl?.focus();
    }
  }, [isOpen, update, triggerEl]);

  useEffect(() => {
    if (!isOpen || isTouch) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        const focusable = popupRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            (last as HTMLElement).focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            (first as HTMLElement).focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close, isTouch]);

  const handleSaveToggle = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, []);

  const handleExternalLink = useCallback(() => {
    if (data?.slug) {
      window.open(data.slug, "_blank", "noopener,noreferrer");
    }
  }, [data?.slug]);

  const handleCTAClick = useCallback(() => {
    if (data?.slug) {
      window.location.href = data.slug;
    }
    close();
  }, [data?.slug, close]);

  if (!data) return null;

  if (isTouch) {
    return (
      <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
        <SheetContent
          side="bottom"
          className="h-[80vh] rounded-t-3xl bg-slate-800 border-slate-700"
          style={{ background: '#1B2136' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>
            <div className="relative flex-shrink-0 aspect-[4/3] mb-4 rounded-2xl overflow-hidden">
              <img
                src={data.coverImage}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-white text-lg leading-tight">{data.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                  <span>{data.modelTag}</span>
                  {data.rating && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
                  variant="primary"
                  size="sm"
                  className="px-6"
                  data-track={`quicklook_cta:${data.id}`}
                >
                  Get prompt
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[998]" onClick={close} />}
      {isOpen && (
        <div
          ref={popupRef}
          role="dialog"
          aria-modal="true"
          aria-label="Quick look"
          tabIndex={-1}
          className="z-[999] animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ ...style, width: '400px' }}
          onMouseEnter={popupEnter}
          onMouseLeave={() => popupLeave()}
        >
          <div
            className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={close}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
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
