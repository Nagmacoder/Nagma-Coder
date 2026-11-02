"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SceneFallback } from "./SceneFallback";

// Three.js lives in its own chunk and is only requested once we decide to show it.
const WorkspaceScene = dynamic(() => import("./WorkspaceScene"), { ssr: false });

function canUseWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduced = () => window.matchMedia(REDUCE_QUERY).matches;
const getReducedServer = () => false;

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export function HeroScene() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  // Decide after hydration whether this device should get the 3D scene.
  useEffect(() => {
    const nav = navigator as NavigatorHints;
    if (nav.connection?.saveData) return;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2) return;
    if (!canUseWebGL()) return;

    // Wait until the browser is idle so the headline and first paint are never delayed.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setMount(true), { timeout: 2500 });
    else timeoutId = window.setTimeout(() => setMount(true), 1200);

    return () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  // Pause rendering when off-screen or when the tab is in the background.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`scene-frame ${ready ? "is-live" : ""}`}
      role="img"
      aria-label="Illustration of a floating developer workspace: a laptop showing code, a glowing orbital symbol, server blocks, database cylinders, a terminal window and connected nodes."
    >
      <SceneFallback />
      {mount && (
        <div className="scene-canvas">
          <WorkspaceScene
            active={visible && pageVisible}
            reducedMotion={reducedMotion}
            onReady={() => setReady(true)}
          />
        </div>
      )}
      {ready && !reducedMotion && <p className="scene-hint" aria-hidden="true">Drag to look around</p>}
    </div>
  );
}
