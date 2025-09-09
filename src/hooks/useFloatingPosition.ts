import { useLayoutEffect, useState, useCallback } from "react";

type Pos = { top: number; left: number };
export function useFloatingPosition(triggerEl: HTMLElement | null, popupEl: HTMLElement | null, offset = 12) {
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });

  const update = useCallback(() => {
    if (!triggerEl || !popupEl) return;
    const t = triggerEl.getBoundingClientRect();
    const pW = popupEl.offsetWidth;
    const pH = popupEl.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gutter = 16;

    // default: top-left aligned below the card
    let top = t.top + window.scrollY - pH - offset; // above
    let left = t.left + window.scrollX;

    // flip to bottom if not enough space above
    if (top < window.scrollY + gutter) top = t.bottom + window.scrollY + offset;

    // shift horizontally within gutters
    if (left + pW > window.scrollX + vw - gutter) left = window.scrollX + vw - gutter - pW;
    if (left < window.scrollX + gutter) left = window.scrollX + gutter;

    setPos({ top, left });
  }, [triggerEl, popupEl, offset]);

  useLayoutEffect(() => {
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update]);

  return { style: { top: pos.top, left: pos.left, position: "absolute" as const }, update };
}
