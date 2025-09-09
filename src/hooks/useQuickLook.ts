import { useState, useCallback, useEffect } from "react";
import { QuickLookData } from "@/lib/types";
import { useHoverIntent } from "./useHoverIntent";

export function useQuickLook() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<QuickLookData | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const hover = useHoverIntent();
  const isTouch = typeof window !== "undefined" && (("ontouchstart" in window) || navigator.maxTouchPoints > 0);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
    setTriggerEl(null);
  }, []);

  const showFromTrigger = useCallback((el: HTMLElement, quickLookData: QuickLookData) => {
    setData(quickLookData);
    setTriggerEl(el);
    if (isTouch) {
      open();
    } else {
      hover.onTriggerEnter(open);
    }
  }, [isTouch, hover, open]);

  const leaveTrigger = useCallback(() => {
    if (isTouch) return;
    hover.onTriggerLeave(close);
  }, [isTouch, hover, close]);

  const popupEnter = useCallback(() => {
    if (isTouch) return;
    hover.onPopupEnter();
  }, [isTouch, hover]);

  const popupLeave = useCallback(() => {
    if (isTouch) return;
    hover.onPopupLeave(close);
  }, [isTouch, hover, close]);

  useEffect(() => {
    return () => hover.clear();
  }, [hover]);

  return { showFromTrigger, leaveTrigger, popupEnter, popupLeave, close, isOpen, data, triggerEl, isTouch };
}
