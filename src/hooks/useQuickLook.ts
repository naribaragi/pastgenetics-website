import { useState, useCallback, useRef, useEffect } from "react";

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

export const useQuickLook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<QuickLookData | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const show = useCallback((element: HTMLElement, quickLookData: QuickLookData) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // If already showing same item, don't restart
    if (isOpen && data?.id === quickLookData.id) return;

    setData(quickLookData);
    setTriggerElement(element);

    if (isMobile) {
      // Mobile: show immediately on tap
      setIsOpen(true);
    } else {
      // Desktop: show after hover delay
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      hoverTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 200);
    }
  }, [isOpen, data, isMobile]);

  const hide = useCallback((immediate = false) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (immediate || isMobile) {
      setIsOpen(false);
      setData(null);
      setTriggerElement(null);
    } else {
      // Desktop: delay before hiding to allow moving to popup
      hideTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setData(null);
        setTriggerElement(null);
      }, 150);
    }
  }, [isMobile]);

  const cancelHide = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    data,
    triggerElement,
    isMobile,
    show,
    hide,
    cancelHide
  };
};

export default useQuickLook;