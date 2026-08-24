"use client";

import React, { useEffect, useRef } from "react";

export type ParticleTunnelProps = {
  x?: number;
  y?: number;
  radius?: number;
  density?: number;
  gap?: number;
  particleSize?: number;
  direction?: "inside" | "outside";
  speed?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
};

type Template = {
  angle: number;
  baseOffset: number;
};

const DEFAULT_COLORS = ["#A7D129"];

export default function ParticleTunnel({
  x = 50,
  y = 50,
  radius = 100,
  density = 30,
  gap = 40,
  particleSize = 10,
  direction = "inside",
  speed = 2,
  colors = DEFAULT_COLORS,
  className,
  style,
}: ParticleTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<Template[]>([]);
  const animRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 1 });
  const rangeRef = useRef<number>(1);
  const perSpokeRef = useRef<number>(0);

  const clampX = Math.max(0, Math.min(100, x));
  const clampY = Math.max(0, Math.min(100, y));
  const clampRadius = Math.max(0, radius);
  const clampDensity = Math.max(4, Math.min(80, Math.round(density)));
  const clampGap = Math.max(12, gap);
  const clampSize = Math.max(1, particleSize);
  const clampSpeed = Math.max(0, speed);
  const palette = colors.length ? colors : DEFAULT_COLORS;
  const singleColor = palette[0];

  // keep live refs so the rAF loop never needs to restart on prop changes
  const clampXRef = useRef(clampX);
  const clampYRef = useRef(clampY);
  const clampRadiusRef = useRef(clampRadius);
  const clampDensityRef = useRef(clampDensity);
  const clampGapRef = useRef(clampGap);
  const clampSizeRef = useRef(clampSize);
  const clampSpeedRef = useRef(clampSpeed);
  const directionRef = useRef(direction);
  const singleColorRef = useRef(singleColor);
  clampXRef.current = clampX;
  clampYRef.current = clampY;
  clampRadiusRef.current = clampRadius;
  clampDensityRef.current = clampDensity;
  clampGapRef.current = clampGap;
  clampSizeRef.current = clampSize;
  clampSpeedRef.current = clampSpeed;
  directionRef.current = direction;
  singleColorRef.current = singleColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedRef = { current: false };
    try {
      reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}

    const build = (W: number, H: number) => {
      const cx = (W * clampXRef.current) / 100;
      const cy = (H * clampYRef.current) / 100;
      const dx = Math.max(cx, W - cx);
      const dy = Math.max(cy, H - cy);
      const needed = Math.hypot(dx, dy) + clampGapRef.current * 2;
      const rangeNeeded = Math.max(1, needed - clampRadiusRef.current);
      const perSpoke = Math.ceil(rangeNeeded / clampGapRef.current);
      const range = perSpoke * clampGapRef.current;
      perSpokeRef.current = perSpoke;
      rangeRef.current = range;
      const out: Template[] = [];
      for (let i = 0; i < clampDensityRef.current; i++) {
        const angle = (Math.PI * 2 * i) / clampDensityRef.current;
        for (let j = 0; j < perSpoke; j++) {
          out.push({ angle, baseOffset: j * clampGapRef.current });
        }
      }
      templatesRef.current = out;
    };

    let resizePending = false;
    const resize = () => {
      if (resizePending) return;
      resizePending = true;
      requestAnimationFrame(() => {
        resizePending = false;
        const r = wrapper.getBoundingClientRect();
        const W = Math.max(1, Math.round(r.width));
        const H = Math.max(1, Math.round(r.height));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const prev = sizeRef.current;
        // skip rebuild if size unchanged (prevents ResizeObserver spam → flicker)
        if (prev.w === W && prev.h === H && prev.dpr === dpr) return;
        sizeRef.current = { w: W, h: H, dpr };
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build(W, H);
      });
    };

    // initial sizing
    {
      const r = wrapper.getBoundingClientRect();
      const W = Math.max(1, Math.round(r.width));
      const H = Math.max(1, Math.round(r.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: W, h: H, dpr };
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(W, H);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    window.addEventListener("resize", resize);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    try {
      mq.addEventListener("change", onMq);
    } catch {
      // @ts-ignore
      mq.addListener(onMq);
    }

    const speedFactor = 0.06; // px per ms per speed unit (tuned for buttery)
    let start: number | null = null;

    const draw = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const { w: W, h: H } = sizeRef.current;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const cxBase = clampXRef.current;
      const cyBase = clampYRef.current;
      const baseCx = (W * cxBase) / 100;
      const baseCy = (H * cyBase) / 100;
      const range = rangeRef.current;
      const cSpeed = clampSpeedRef.current;
      const effSpeed = reducedRef.current ? cSpeed * 0.35 : cSpeed;
      const rawOffset = (elapsed * effSpeed * speedFactor) % range;
      const offset = directionRef.current === "inside" ? rawOffset : range - rawOffset;

      // smooth continuous drift — pure sine, no modulo sawtooth
      const driftY = Math.sin(now * 0.00035) * 6;
      const driftX = Math.cos(now * 0.00022) * 2.5;
      const cx = baseCx + driftX;
      const cy = baseCy + driftY;

      ctx.clearRect(0, 0, W, H);

      const templates = templatesRef.current;
      const cRadius = clampRadiusRef.current;
      const cSize = clampSizeRef.current;
      const col = singleColorRef.current;

      // compute wrapped distances
      const drawables = new Array(templates.length);
      for (let k = 0; k < templates.length; k++) {
        const t = templates[k];
        let mod = t.baseOffset - offset;
        mod %= range;
        if (mod < 0) mod += range;
        const dist = cRadius + mod;
        drawables[k] = { angle: t.angle, dist };
      }
      // back-to-front for correct overlap
      drawables.sort((a: any, b: any) => a.dist - b.dist);

      ctx.fillStyle = col;
      for (const p of drawables) {
        const t = (p.dist - cRadius) / range;
        const scale = 0.24 + 0.76 * Math.pow(t, 1.08);
        const size = cSize * scale;
        const opacity = 0.07 + 0.62 * Math.pow(t, 0.9);
        const fadeIn = t < 0.08 ? t / 0.08 : 1;
        const fadeOut = t > 0.88 ? (1 - t) / 0.12 : 1;
        const alpha = opacity * fadeIn * fadeOut;
        if (alpha < 0.015) continue;
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;
        if (px < -size || px > W + size || py < -size || py > H + size) continue;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (cRadius > 0.5) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(cx, cy, cRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(167,209,41,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      try {
        mq.removeEventListener("change", onMq);
      } catch {
        // @ts-ignore
        mq.removeListener(onMq);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full pointer-events-none"}
      style={{ overflow: "hidden", background: "transparent", ...style }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }} />
    </div>
  );
}
