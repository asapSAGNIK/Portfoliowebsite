"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import {
  siPython,
  siJavascript,
  siTypescript,
  siMysql,
  siPostgresql,
  siSharp,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siFastapi,
  siNodedotjs,
  siMongodb,
  siPytest,
  siGithub,
  siVercel,
  siGooglecloud,
  siDocker,
  siUnity,
  siRedux,
  siFlutter,
  siAndroidstudio,
  siCursor,
  siClaude,
  siN8n,
  siSupabase,
  siFirebase,
} from "simple-icons";

// Playwright not yet in simple-icons@16.28.0 – inline SVG path from latest
const siPlaywright = {
  title: "Playwright",
  slug: "playwright",
  hex: "2EAD33",
  path: "M23.996 7.462c-.056.837-.257 2.135-.716 3.85-.995 3.715-4.27 10.874-10.42 9.227-6.15-1.65-5.407-9.487-4.412-13.201.46-1.716.934-2.94 1.305-3.694.42-.853.846-.289 1.815.523.684.573 2.41 1.791 5.011 2.488 2.601.697 4.706.506 5.583.352 1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61-.433 1.618-.827 4.055-.632 6.426-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z",
} as typeof siPython;

const SKILLS: { name: string; icon: typeof siPython; color: string; bg: string }[] = [
  { name: "Python", icon: siPython, color: "#3776AB", bg: "#0f172a" },
  { name: "JavaScript", icon: siJavascript, color: "#F7DF1E", bg: "#1a1a0a" },
  { name: "TypeScript", icon: siTypescript, color: "#3178C6", bg: "#0f1a2e" },
  { name: "SQL", icon: siMysql, color: "#4479A1", bg: "#0f1f2a" },
  { name: "PostgreSQL", icon: siPostgresql, color: "#4169E1", bg: "#0f1a2e" },
  { name: "C#", icon: siSharp, color: "#512BD4", bg: "#150f2a" },
  { name: "React Native", icon: siReact, color: "#61DAFB", bg: "#0f1e2a" },
  { name: "Next.js", icon: siNextdotjs, color: "#FFFFFF", bg: "#0a0a0a" },
  { name: "TailwindCSS", icon: siTailwindcss, color: "#06B6D4", bg: "#0a1e2a" },
  { name: "FastAPI", icon: siFastapi, color: "#009688", bg: "#0a1f1e" },
  { name: "Node.js", icon: siNodedotjs, color: "#339933", bg: "#0f1f0f" },
  { name: "MongoDB", icon: siMongodb, color: "#47A248", bg: "#0f1f0f" },
  { name: "PyTest", icon: siPytest, color: "#0A9EDC", bg: "#0f1e2a" },
  { name: "GitHub", icon: siGithub, color: "#FFFFFF", bg: "#0a0a0a" },
  { name: "Vercel", icon: siVercel, color: "#FFFFFF", bg: "#0a0a0a" },
  { name: "GCP", icon: siGooglecloud, color: "#4285F4", bg: "#0f1a2e" },
  { name: "Docker", icon: siDocker, color: "#2496ED", bg: "#0a1e2a" },
  { name: "Unity", icon: siUnity, color: "#FFFFFF", bg: "#0a0a0a" },
  { name: "Redux", icon: siRedux, color: "#764ABC", bg: "#150f2a" },
  { name: "Flutter", icon: siFlutter, color: "#02569B", bg: "#0a1e2a" },
  { name: "Android Studio", icon: siAndroidstudio, color: "#3DDC84", bg: "#0a1f0f" },
  { name: "Cursor", icon: siCursor, color: "#FFFFFF", bg: "#0a0a0a" },
  { name: "Claude", icon: siClaude, color: "#D97706", bg: "#1a140a" },
  { name: "n8n", icon: siN8n, color: "#EA4B71", bg: "#1a0f14" },
  { name: "Playwright", icon: siPlaywright, color: "#2EAD33", bg: "#0f1f12" },
  { name: "Supabase", icon: siSupabase, color: "#3FCF8E", bg: "#0a1f18" },
  { name: "Firebase", icon: siFirebase, color: "#FFCA28", bg: "#1a1500" },
];

export default function GravityGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { Engine, Bodies, World, Mouse, MouseConstraint } = Matter;

    // Mobile detection for perf tuning
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Respect reduced motion: lighter physics
    const engine = Engine.create({
      enableSleeping: true, // allow bodies to sleep when settled — major mobile perf win
    });
    engine.world.gravity.y = prefersReducedMotion ? 0.6 : isMobile ? 0.95 : 1.1;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.001;
    // Tune solver iterations for mobile (fewer iterations = less CPU)
    engine.positionIterations = isMobile ? 4 : 6;
    engine.velocityIterations = isMobile ? 4 : 4;
    engine.constraintIterations = isMobile ? 1 : 2;

    const W = container.clientWidth || (isMobile ? 340 : 260);
    const H = container.clientHeight || (isMobile ? 240 : 150);

    // Jar walls — transparent rectangular jar with OPEN TOP (no ceiling)
    const thickness = isMobile ? 16 : 14;
    const wallOpts: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      friction: 0.4,
      restitution: 0.35,
      render: { visible: false } as any,
    };
    // ground, left, right only — top open so icons drop in
    const walls = [
      Bodies.rectangle(W / 2, H + thickness / 2 - 0.5, W + 2, thickness, wallOpts), // bottom
      Bodies.rectangle(-thickness / 2 + 0.5, H / 2, thickness, H, wallOpts), // left
      Bodies.rectangle(W + thickness / 2 - 0.5, H / 2, thickness, H, wallOpts), // right
    ];
    World.add(engine.world, walls);

    const bodySize = isMobile ? 30 : 34;
    const iconSize = isMobile ? 16 : 18;
    const bodies: Matter.Body[] = [];
    const els: HTMLDivElement[] = [];

    SKILLS.forEach((skill, i) => {
      // drop from above the jar, staggered — fewer cols on mobile so tighter packing
      const cols = isMobile ? 5 : 6;
      const col = i % cols;
      const usableW = W - 24;
      const x =
        12 + col * (usableW / (cols - 1)) + (Math.random() * 8 - 4);
      const y = -40 - Math.floor(i / cols) * 20 - Math.random() * 40;

      const body = Bodies.rectangle(x, y, bodySize, bodySize, {
        chamfer: { radius: 7 },
        restitution: 0.38,
        friction: 0.28,
        frictionAir: isMobile ? 0.015 : 0.008, // slightly more damping on mobile = faster settle, less CPU
        frictionStatic: 0.15,
        density: 0.0016,
        sleepThreshold: 55,
        render: { visible: false } as any,
      } as any);
      // random initial spin / nudge so they tumble — softer on mobile to avoid large velocities
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4));
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * (isMobile ? 0.9 : 1.5),
        y: Math.random() * 0.5,
      });
      bodies.push(body);

      const el = document.createElement("div");
      el.setAttribute("data-skill", skill.name);
      el.title = skill.name;
      el.className =
        "absolute flex items-center justify-center rounded-[9px] border shadow-[0_2px_12px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.07)_inset] cursor-grab active:cursor-grabbing select-none will-change-transform";
      el.style.width = `${bodySize}px`;
      el.style.height = `${bodySize}px`;
      el.style.background = skill.bg;
      el.style.borderColor = "rgba(255,255,255,0.10)";
      el.style.left = "0";
      el.style.top = "0";
      el.style.willChange = "transform";
      el.style.touchAction = "none";
      // Use contain for perf isolation
      (el.style as any).contain = "layout paint";
      el.innerHTML = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="${skill.color}" aria-hidden="true"><path d="${skill.icon.path}"/></svg>`;
      container.appendChild(el);
      els.push(el);
    });

    World.add(engine.world, bodies);

    // mouse + touch drag — toss around inside jar
    const mouse = Mouse.create(container);
    // @ts-ignore
    mouse.element = container;
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: isMobile ? 0.18 : 0.22,
        damping: 0.12,
        render: { visible: false } as any,
      },
    });
    World.add(engine.world, mouseConstraint);

    // Pause when tab not visible — saves battery on mobile
    let isVisible = true;
    const onVis = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) last = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    let last = performance.now();
    // Throttle slightly on mobile if device is low-end (save CPU): cap at ~50fps via delta smoothing
    const maxDelta = isMobile ? 32 : 34;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!isVisible) {
        last = now;
        return;
      }
      // Skip frame if delta overly tiny (avoid wasted engine updates)
      const delta = Math.min(maxDelta, now - last);
      if (delta < 6) return;
      last = now;
      Matter.Engine.update(engine, delta);
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const el = els[i];
        // Bodies sleeping still update transform — but we can skip rendering tweak?
        const { x, y } = b.position;
        const a = b.angle;
        // Only update DOM if body is awake or visibly moving; sleeping bodies still need final pos but we always set
        el.style.transform = `translate3d(${x - bodySize / 2}px, ${y - bodySize / 2}px, 0) rotate(${a}rad)`;
        // hide if somehow far outside (shouldn't)
        const visible = y > -80 && y < H + 80 && x > -40 && x < W + 40;
        // Use opacity 0 vs display to avoid layout thrash; toggle only when needed
        if (el.style.opacity !== (visible ? "1" : "0")) el.style.opacity = visible ? "1" : "0";
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      try {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      } catch {}
      els.forEach((el) => el.remove());
      // @ts-ignore clean mouse
      try { (mouse as any).element = null; } catch {}
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[12px] bg-white/[0.04] backdrop-blur-[2px]"
      style={{ touchAction: "none", contain: "layout paint size" } as any}
      aria-hidden
    >
      {/* jar glass highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[12px] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_30px_rgba(255,255,255,0.03)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[12px] bg-gradient-to-b from-white/[0.07] to-transparent opacity-60" />
      {/* top open lip */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-white/20" />
    </div>
  );
}
