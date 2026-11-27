"use client";

import { useEffect, useRef } from "react";

export default function DotGridBackdrop() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let rafId = 0;
    let nextX = -400;
    let nextY = -400;

    const flush = () => {
      rafId = 0;
      el.style.setProperty("--mx", `${nextX}px`);
      el.style.setProperty("--my", `${nextY}px`);
    };

    const onMove = (e: PointerEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(flush);
      }
    };

    const onLeave = () => {
      nextX = -400;
      nextY = -400;
      if (!rafId) {
        rafId = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="dot-backdrop" aria-hidden="true" />
      <div ref={glowRef} className="dot-backdrop-glow" aria-hidden="true" />
    </>
  );
}
