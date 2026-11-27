"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/contexts/AudioContext";

interface Spring {
  x: number;
  v: number;
  t: number;
  k: number;
  c: number;
}

interface RopePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function createSpring(x: number, k: number, c: number, reduced: boolean): Spring {
  return { x, v: 0, t: x, k, c: reduced ? 2 * Math.sqrt(k) : c };
}

function stepSpring(s: Spring, dt: number) {
  const a = -s.k * (s.x - s.t) - s.c * s.v;
  s.v += a * dt;
  s.x += s.v * dt;
}

export default function PullCordToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playSwitchClick } = useAudio();
  const [isHeld, setIsHeld] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<HTMLDivElement>(null);
  const grabRef = useRef<HTMLButtonElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);

  const themeRef = useRef(theme);
  const toggleRef = useRef(toggleTheme);
  const clickSoundRef = useRef(playSwitchClick);
  themeRef.current = theme;
  toggleRef.current = toggleTheme;
  clickSoundRef.current = playSwitchClick;

  // Exposed imperative pull for click/keyboard triggers
  const triggerPullRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pathEl = pathRef.current;
    const beadEl = beadRef.current;
    const grabEl = grabRef.current;
    const socketEl = socketRef.current;
    if (!wrap || !pathEl || !beadEl || !grabEl || !socketEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const AX = 26;
    const AY = 4;
    const isNarrow = window.matchMedia("(max-width: 767px)").matches;
    const N = isNarrow ? 6 : 8;
    const SEG = isNarrow ? 5.2 : 6.2;
    const L = N * SEG;
    const CLICK = isNarrow ? 12 : 15;
    const MAXS = isNarrow ? 30 : 38;

    const pts: RopePoint[] = [];
    for (let i = 0; i <= N; i++) {
      pts.push({ x: AX, y: AY + i * SEG, vx: 0, vy: 0 });
    }

    const K = createSpring(1, 300, 17, reduced);
    const TUG = createSpring(0, 320, 14, reduced);
    const HX = createSpring(AX, 230, 22, reduced);
    const HY = createSpring(AY + L, 230, 22, reduced);

    let armed = true;
    let ghost = false;
    let ghostTimer: number | null = null;
    let held: {
      id: number;
      x: number;
      y: number;
      ox: number;
      oy: number;
      sx: number;
      sy: number;
      moved: number;
      flipped: boolean;
    } | null = null;

    const fireFlip = () => {
      clickSoundRef.current();
      TUG.v += 110;
      const rect = wrap.getBoundingClientRect();
      const b = pts[N];
      toggleRef.current({ x: rect.left + b.x, y: rect.top + b.y });
    };

    const runGhostPull = () => {
      if (reduced) {
        fireFlip();
        return;
      }
      if (ghost || held) return;
      const b = pts[N];
      ghost = true;
      armed = true;
      HX.x = b.x;
      HY.x = b.y;
      HX.v = b.vx;
      HY.v = b.vy;
      HX.t = AX + 4;
      HY.t = AY + L + 34;
      if (ghostTimer !== null) window.clearTimeout(ghostTimer);
      ghostTimer = window.setTimeout(() => {
        ghost = false;
      }, 420);
    };

    triggerPullRef.current = runGhostPull;

    const getLocal = (e: PointerEvent): [number, number] => {
      const r = wrap.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };

    const onPointerDown = (e: PointerEvent) => {
      const [x, y] = getLocal(e);
      const b = pts[N];
      held = {
        id: e.pointerId,
        x: b.x,
        y: b.y,
        ox: b.x - x,
        oy: b.y - y,
        sx: x,
        sy: y,
        moved: 0,
        flipped: false,
      };
      ghost = false;
      armed = true;
      setIsHeld(true);
      try {
        grabEl.setPointerCapture(e.pointerId);
      } catch {
        // ignore capture issues
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!held || e.pointerId !== held.id) return;
      const [x, y] = getLocal(e);
      held.x = x + held.ox;
      held.y = y + held.oy;
      held.moved = Math.max(held.moved, Math.hypot(x - held.sx, y - held.sy));
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!held || e.pointerId !== held.id) return;
      const isTap = held.moved < 5 && !held.flipped && e.type === "pointerup";
      held = null;
      setIsHeld(false);
      if (isTap) {
        runGhostPull();
      }
    };

    const onKeyClick = (e: MouseEvent) => {
      // detail === 0 indicates keyboard activation (Enter / Space)
      if (e.detail === 0) {
        runGhostPull();
      }
    };

    grabEl.addEventListener("pointerdown", onPointerDown);
    grabEl.addEventListener("pointermove", onPointerMove);
    grabEl.addEventListener("pointerup", onPointerUp);
    grabEl.addEventListener("pointercancel", onPointerUp);
    grabEl.addEventListener("click", onKeyClick);

    let rafId = 0;
    let last = performance.now();

    const frame = (dt: number) => {
      stepSpring(K, dt);
      stepSpring(TUG, dt);
      stepSpring(HX, dt);
      stepSpring(HY, dt);

      const pin = held ? [held.x, held.y] : ghost ? [HX.x, HY.x] : null;
      const b = pts[N];

      let px = 0;
      let py = 0;
      let stretch = 0;

      if (pin) {
        const dx = pin[0] - AX;
        const dy = pin[1] - AY;
        const d = Math.hypot(dx, dy) || 1;
        const over = Math.max(0, d - L);
        const give = MAXS * (1 - Math.exp(-over / 48));
        const r = Math.min(d, L) + give;
        px = AX + (dx / d) * r;
        py = AY + (dy / d) * r;
        stretch = give;
        if (over > 0) {
          K.x = r / L;
          K.t = r / L;
          K.v = 0;
        }
        if (armed && give > CLICK) {
          armed = false;
          fireFlip();
          if (held) {
            held.flipped = true;
          } else {
            if (ghostTimer !== null) window.clearTimeout(ghostTimer);
            ghostTimer = window.setTimeout(() => {
              ghost = false;
            }, 90);
          }
        }
      }

      if (!pin || !stretch) {
        K.t = 1;
      }

      const seg = SEG * Math.max(1, K.x);
      TUG.t = stretch * 0.14;

      const prev = pts.map((q) => [q.x, q.y]);
      for (let i = 1; i <= N; i++) {
        const q = pts[i];
        const damp = Math.exp(-(i === N ? 1.4 : 2.8) * dt);
        q.vy += 2400 * dt;
        q.vx *= damp;
        q.vy *= damp;
        const sp = Math.hypot(q.vx, q.vy);
        if (sp > 2200) {
          q.vx *= 2200 / sp;
          q.vy *= 2200 / sp;
        }
        q.x += q.vx * dt;
        q.y += q.vy * dt;
      }

      for (let it = 0; it < 7; it++) {
        pts[0].x = AX;
        pts[0].y = AY + TUG.x;
        if (pin) {
          b.x = px;
          b.y = py;
        }
        for (let i = 0; i < N; i++) {
          const a = pts[i];
          const c = pts[i + 1];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const d = Math.hypot(dx, dy) || 1e-6;
          const f = ((d - seg) / d) * 0.5;
          const wa = i === 0 ? 0 : 1;
          const wc = i + 1 === N ? (pin ? 0 : 0.32) : 1;
          const sum = wa + wc || 1;
          a.x += (dx * f * wa * 2) / sum;
          a.y += (dy * f * wa * 2) / sum;
          c.x -= (dx * f * wc * 2) / sum;
          c.y -= (dy * f * wc * 2) / sum;
        }
      }

      pts[0].x = AX;
      pts[0].y = AY + TUG.x;
      if (pin) {
        b.x = px;
        b.y = py;
      }

      for (let i = 1; i <= N; i++) {
        pts[i].vx = (pts[i].x - prev[i][0]) / dt;
        pts[i].vy = (pts[i].y - prev[i][1]) / dt;
      }
    };

    const render = () => {
      const b = pts[N];
      const e = pts[N - 1];
      let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < N; i++) {
        const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(1);
        const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(1);
        d += `Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx} ${my}`;
      }
      d += `L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;

      const ang = Math.atan2(e.x - b.x, b.y - e.y);
      pathEl.setAttribute("d", d);
      socketEl.style.transform = `translate3d(0, ${TUG.x.toFixed(2)}px, 0)`;
      beadEl.style.transform = `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0) rotate(${ang.toFixed(4)}rad)`;
      grabEl.style.transform = `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0)`;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      if (dt > 0) {
        const sub = 4;
        for (let s = 0; s < sub; s++) frame(dt / sub);
        render();
      }
      rafId = window.requestAnimationFrame(loop);
    };

    render();
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (ghostTimer !== null) window.clearTimeout(ghostTimer);
      grabEl.removeEventListener("pointerdown", onPointerDown);
      grabEl.removeEventListener("pointermove", onPointerMove);
      grabEl.removeEventListener("pointerup", onPointerUp);
      grabEl.removeEventListener("pointercancel", onPointerUp);
      grabEl.removeEventListener("click", onKeyClick);
    };
  }, []);

  const isLight = theme === "light";

  return (
    <div
      ref={wrapRef}
      className="no-print relative h-[96px] w-[52px] select-none pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {/* Top grommet / miniature studio lamp cap */}
      <div
        ref={socketRef}
        aria-hidden="true"
        className="absolute left-[18px] top-0 h-[8px] w-[16px] rounded-b-[4px]"
        style={{ backgroundColor: "var(--cord-cap)" }}
      />

      {/* Rope path */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="var(--cord-wire)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Weighted pull bead with brass/amber tip */}
      <div
        ref={beadRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-[-6px] top-[-2px] flex h-[22px] w-[12px] flex-col items-center justify-end overflow-hidden rounded-full border"
        style={{
          backgroundColor: "var(--cord-bead)",
          borderColor: "var(--rule-strong)",
          transformOrigin: "6px 2px",
        }}
      >
        <span
          className="block h-[6px] w-full"
          style={{ backgroundColor: "var(--cord-bead-tip)" }}
        />
      </div>

      {/* Real interactive handle following the bead */}
      <button
        ref={grabRef}
        type="button"
        role="switch"
        aria-checked={isLight}
        aria-label={isLight ? "Pull cord to switch to dark obsidian mode" : "Pull cord to switch to light linen mode"}
        title={isLight ? "Pull cord for dark mode" : "Pull cord for light mode"}
        className={`group pointer-events-auto absolute left-[-20px] top-[-10px] h-[44px] w-[40px] rounded-lg bg-transparent touch-none ${
          isHeld ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <span
          className="pointer-events-none absolute right-[36px] top-[8px] whitespace-nowrap rounded px-2 py-1 text-[11px] font-medium opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            backgroundColor: "var(--surface-raised)",
            color: "var(--ink-secondary)",
            border: "1px solid var(--rule-hair)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {isLight ? "pull for dark" : "pull for light"}
        </span>
      </button>
    </div>
  );
}
