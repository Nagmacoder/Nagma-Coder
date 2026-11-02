"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const LINES = [
  { kind: "cmd", text: "boot nagma.exe" },
  { kind: "out", text: "Loading Full Stack Engineering experience..." },
  { kind: "out", text: "Initializing React, Next.js and Node.js..." },
  { kind: "out", text: "Connecting backend services..." },
  { kind: "out", text: "Loading AI projects..." },
  { kind: "ok", text: "Portfolio ready." },
  { kind: "wait", text: "Awaiting recruiter input:" },
] as const;

const STEP_MS = 420;

/**
 * The full transcript is server-rendered, so it is readable without JavaScript.
 * When the terminal first scrolls into view (and motion is allowed) it replays as a boot sequence.
 * It never blocks the page: it is a normal section below the hero, with Skip and Replay controls.
 */
export function BootTerminal() {
  const [shown, setShown] = useState<number>(LINES.length);
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const stop = useCallback(() => {
    window.clearInterval(timer.current);
    setRunning(false);
    setShown(LINES.length);
  }, []);

  const run = useCallback(() => {
    window.clearInterval(timer.current);
    setShown(0);
    setRunning(true);
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= LINES.length) {
        window.clearInterval(timer.current);
        setRunning(false);
      }
    }, STEP_MS);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (reduce || !el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer.current);
    };
  }, [run]);

  useEffect(() => {
    if (!running) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, stop]);

  const done = shown >= LINES.length;

  return (
    <div className="terminal" ref={rootRef}>
      <div className="terminal__bar">
        <span className="terminal__dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className="terminal__title">~/nagma.exe</span>
        {running ? (
          <button type="button" className="terminal__ctl" onClick={stop}>
            Skip
          </button>
        ) : (
          <button type="button" className="terminal__ctl" onClick={run}>
            Replay boot
          </button>
        )}
      </div>

      {/* Screen readers get the complete transcript at once instead of a partial animation. */}
      <ol className="sr-only">
        {LINES.map((l) => (
          <li key={l.text}>{l.kind === "cmd" ? `Command: ${l.text}` : l.text}</li>
        ))}
      </ol>

      <div className="terminal__screen" aria-hidden="true">
        {LINES.slice(0, shown).map((l) => (
          <p key={l.text} className={`terminal__line terminal__line--${l.kind}`}>
            <span className="terminal__prefix">{l.kind === "cmd" ? "$" : ">"}</span> {l.text}
            {l.kind === "wait" && <span className="terminal__caret">_</span>}
          </p>
        ))}
        {!done && <span className="terminal__caret terminal__caret--solo">_</span>}
      </div>

      <div className={`terminal__actions ${done ? "is-ready" : ""}`}>
        <Link href="/projects" className="btn btn--primary">
          Explore Portfolio
        </Link>
        <Link href="/contact" className="btn btn--ghost">
          Contact Me
        </Link>
      </div>
    </div>
  );
}
