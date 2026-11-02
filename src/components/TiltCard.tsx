"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/** Subtle pointer-driven tilt. Mouse/pen only; disabled by CSS under reduced motion. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
