import { useRef, useCallback } from "react";

export function useHoverIntent(openDelay = 120, closeDelay = 180) {
  const openT = useRef<number | null>(null);
  const closeT = useRef<number | null>(null);
  const isPointerIn = useRef<{ trigger: boolean; popup: boolean }>({ trigger: false, popup: false });

  const clear = () => {
    if (openT.current) { window.clearTimeout(openT.current); openT.current = null; }
    if (closeT.current) { window.clearTimeout(closeT.current); closeT.current = null; }
  };

  const onTriggerEnter = useCallback((openFn: () => void) => {
    isPointerIn.current.trigger = true;
    if (closeT.current) { window.clearTimeout(closeT.current); closeT.current = null; }
    if (!openT.current) openT.current = window.setTimeout(() => { openFn(); openT.current = null; }, openDelay);
  }, [openDelay]);

  const onTriggerLeave = useCallback((closeFn: () => void) => {
    isPointerIn.current.trigger = false;
    if (openT.current) { window.clearTimeout(openT.current); openT.current = null; }
    if (!isPointerIn.current.popup) {
      if (closeT.current) window.clearTimeout(closeT.current);
      closeT.current = window.setTimeout(() => { if (!isPointerIn.current.trigger && !isPointerIn.current.popup) closeFn(); }, closeDelay);
    }
  }, [closeDelay]);

  const onPopupEnter = useCallback(() => {
    isPointerIn.current.popup = true;
    if (closeT.current) { window.clearTimeout(closeT.current); closeT.current = null; }
  }, []);

  const onPopupLeave = useCallback((closeFn: () => void) => {
    isPointerIn.current.popup = false;
    if (!isPointerIn.current.trigger) {
      if (closeT.current) window.clearTimeout(closeT.current);
      closeT.current = window.setTimeout(() => { if (!isPointerIn.current.trigger && !isPointerIn.current.popup) closeFn(); }, closeDelay);
    }
  }, [closeDelay]);

  return { onTriggerEnter, onTriggerLeave, onPopupEnter, onPopupLeave, clear };
}
