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
} from "simple-icons";

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
];

export default function GravityGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { Engine, Bodies, World, Mouse, MouseConstraint, Common } = Matter;

    const engine = Engine.create({
      enableSleeping: false,
    });
    // stronger gravity so drop is obvious, jar-like
    engine.world.gravity.y = 1.1;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.001;

    const W = container.clientWidth || 260;
    const H = container.clientHeight || 150;

    // Jar walls — transparent rectangular jar with OPEN TOP (no ceiling)
    const thickness = 14;
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

    const bodySize = 34;
    const bodies: Matter.Body[] = [];
    const els: HTMLDivElement[] = [];

    SKILLS.forEach((skill, i) => {
      // drop from above the jar, staggered
      const cols = 6;
      const col = i % cols;
      const x = 18 + col * ((W - 36) / (cols - 1)) + (Math.random() * 10 - 5);
      const y = -40 - Math.floor(i / cols) * 22 - Math.random() * 60;

      const body = Bodies.rectangle(x, y, bodySize, bodySize, {
        chamfer: { radius: 8 },
        restitution: 0.45,
        friction: 0.28,
        frictionAir: 0.008,
        frictionStatic: 0.15,
        density: 0.0016,
        render: { visible: false } as any,
      } as any);
      // random initial spin / nudge so they tumble
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.5, y: Math.random() * 0.6 });
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
      el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="${skill.color}" aria-hidden="true"><path d="${skill.icon.path}"/></svg>`;
      container.appendChild(el);
      els.push(el);
    });

    World.add(engine.world, bodies);

    // mouse drag — toss around inside jar
    const mouse = Mouse.create(container);
    // @ts-ignore
    mouse.element = container;
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.22,
        damping: 0.1,
        render: { visible: false } as any,
      },
    });
    World.add(engine.world, mouseConstraint);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const delta = Math.min(34, now - last);
      last = now;
      // manual update keeps motion continuous even if Runner would stall
      Matter.Engine.update(engine, delta);
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const el = els[i];
        const { x, y } = b.position;
        const a = b.angle;
        el.style.transform = `translate3d(${x - bodySize / 2}px, ${y - bodySize / 2}px, 0) rotate(${a}rad)`;
        // hide if somehow far outside (shouldn't)
        const visible = y > -80 && y < H + 80 && x > -40 && x < W + 40;
        el.style.opacity = visible ? "1" : "0";
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      try {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      } catch {}
      els.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[12px] bg-white/[0.04] backdrop-blur-[2px]"
      style={{ touchAction: "none" }}
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
