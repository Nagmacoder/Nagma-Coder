"use client";

import { useEffect, useRef } from "react";

/**
 * A small trailing ring for mouse users. The normal cursor is never hidden.
 * Not rendered for touch, pen-less coarse pointers or reduced motion.
 */
export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, running = false;

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(tick);
      else running = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.visible = "true";
      const target = e.target as Element | null;
      el.dataset.hot = target?.closest("a, button, summary, [role='tab']") ? "true" : "false";
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => (el.dataset.visible = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-aura" aria-hidden="true" data-visible="false" />;
}
