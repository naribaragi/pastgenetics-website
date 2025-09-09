import { useState, useCallback, useRef, useEffect } from "react";
import { useIsMobile } from "./use-mobile";
import { QuickLookData } from "@/lib/types";

export const useQuickLook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<QuickLookData | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      // Mobile: show immediately
      setIsOpen(true);
    } else {
      // Desktop: show after brief delay
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      
      showTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 200);
    }
  }, [isOpen, data, isMobile]);

  const hide = useCallback((immediate = false) => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    if (immediate || isMobile) {
      setIsOpen(false);
      setData(null);
      setTriggerElement(null);
    } else {
      // Desktop: small delay to allow moving cursor to popup
      hideTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setData(null);
        setTriggerElement(null);
      }, 100);
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
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
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
