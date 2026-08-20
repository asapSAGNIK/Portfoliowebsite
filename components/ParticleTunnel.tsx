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
  const maxDistRef = useRef<number>(0);

  const clampX = Math.max(0, Math.min(100, x));
  const clampY = Math.max(0, Math.min(100, y));
  const clampRadius = Math.max(0, radius);
  const clampDensity = Math.max(4, Math.min(80, Math.round(density)));
  const clampGap = Math.max(12, gap);
  const clampSize = Math.max(1, particleSize);
  const clampSpeed = Math.max(0, speed);
  const palette = colors.length ? colors : DEFAULT_COLORS;
  // single colour for smooth look
  const singleColor = palette[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    const effSpeed = reduced ? clampSpeed * 0.35 : clampSpeed;

    const build = (W: number, H: number) => {
      const cx = (W * clampX) / 100;
      const cy = (H * clampY) / 100;
      const dx = Math.max(cx, W - cx);
      const dy = Math.max(cy, H - cy);
      const needed = Math.hypot(dx, dy) + clampGap * 2;
      const rangeNeeded = Math.max(1, needed - clampRadius);
      const perSpoke = Math.ceil(rangeNeeded / clampGap);
      // seamless range = perSpoke * gap (no remainder gap)
      const range = perSpoke * clampGap;
      const maxDist = clampRadius + range;
      perSpokeRef.current = perSpoke;
      rangeRef.current = range;
      maxDistRef.current = maxDist;
      const out: Template[] = [];
      for (let i = 0; i < clampDensity; i++) {
        const angle = (Math.PI * 2 * i) / clampDensity;
        for (let j = 0; j < perSpoke; j++) {
          out.push({ angle, baseOffset: j * clampGap });
        }
      }
      templatesRef.current = out;
    };

    const resize = () => {
      const r = wrapper.getBoundingClientRect();
      const W = Math.max(1, r.width);
      const H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: W, h: H, dpr };
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(W, H);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    window.addEventListener("resize", resize);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = (e: MediaQueryListEvent) => {
      reduced = e.matches;
    };
    try {
      mq.addEventListener("change", onMq);
    } catch {
      // @ts-ignore
      mq.addListener(onMq);
    }

    // absolute time offset for perfectly smooth, never-breaking flow
    const speedFactor = 0.06; // px per ms per speed unit (tuned for buttery)
    let start = performance.now();

    const draw = (now: number) => {
      const elapsed = now - start;
      const { w: W, h: H } = sizeRef.current;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const baseCx = (W * clampX) / 100;
      const baseCy = (H * clampY) / 100;
      const range = rangeRef.current;
      // seamless global offset from absolute time — no dt jitter, no accumulation drift
      const rawOffset = (elapsed * effSpeed * speedFactor) % range;
      const offset = direction === "inside" ? rawOffset : range - rawOffset;

      // gentle upward drift of the whole tunnel — sine-based so never breaks/jumps
      // combines a slow sine (±7px) + a very slow upward creep (-4px avg) for "move a bit like upwards"
      const driftY = Math.sin(now * 0.00042) * 7 - ((elapsed * 0.003) % 8) * 0.5 + 2;
      const driftX = Math.cos(now * 0.00022) * 3;
      const cx = baseCx + driftX;
      const cy = baseCy + driftY;

      ctx.clearRect(0, 0, W, H);

      const templates = templatesRef.current;
      // draw back-to-front: deepest (near void) first
      // compute dists then sort —  ~500 items, cheap
      // we can compute and sort in one go
      const drawables = new Array(templates.length);
      for (let k = 0; k < templates.length; k++) {
        const t = templates[k];
        // seamless wrap: (baseOffset - offset) mod range
        let mod = t.baseOffset - offset;
        mod %= range;
        if (mod < 0) mod += range;
        const dist = clampRadius + mod;
        drawables[k] = { angle: t.angle, dist };
      }
      drawables.sort((a: any, b: any) => a.dist - b.dist);

      // single colour, smooth alpha curve
      ctx.fillStyle = singleColor;
      for (const p of drawables) {
        const t = (p.dist - clampRadius) / range; // 0 at void, 1 at outer
        const scale = 0.24 + 0.76 * Math.pow(t, 1.08);
        const size = clampSize * scale;
        // opacity: very subtle near void, stronger outer — smooth pow
        const opacity = 0.07 + 0.62 * Math.pow(t, 0.9);
        // soften both ends to avoid any visible pop at wrap / void
        const fadeIn = t < 0.08 ? t / 0.08 : 1;
        const fadeOut = t > 0.88 ? (1 - t) / 0.12 : 1;
        const alpha = opacity * fadeIn * fadeOut;
        if (alpha < 0.015) continue;
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;
        if (px < -size || px > W + size || py < -size || py > H + size) continue;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        // keep circles for all sizes — no rect pop at threshold
        ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (clampRadius > 0.5) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(cx, cy, clampRadius, 0, Math.PI * 2);
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
  }, [clampX, clampY, clampRadius, clampDensity, clampGap, clampSize, direction, clampSpeed, singleColor]);

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
