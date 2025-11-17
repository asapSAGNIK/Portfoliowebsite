"use client";
import { useEffect } from "react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { tsParticles } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

type BackgroundParticlesProps = {
  number?: number;
  color?: string;
  linkColor?: string;
  linkDistance?: number;
  linkOpacity?: number;
  linkWidth?: number;
  interactiveMode?: "repulse" | "connect";
  backgroundColor?: string;
  darkMode?: boolean;
};

export default function BackgroundParticles({
  number = 80,
  color,
  linkColor,
  linkDistance = 150,
  linkOpacity = 0.4,
  linkWidth = 1,
  interactiveMode = "repulse",
  backgroundColor,
  darkMode,
}: BackgroundParticlesProps) {
  // Load the links preset globally
  useEffect(() => {
    loadLinksPreset(tsParticles);
  }, []);

  // Detect dark mode if not explicitly set
  const isDark =
    darkMode ??
    (typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false);

  // Default colors
  const particleColor = color || (isDark ? "#ffffff" : "#222831");
  const particleLinkColor = linkColor || (isDark ? "#ffffff" : "#222831");
  const bgColor = backgroundColor || "transparent";

  const options: ISourceOptions = {
    preset: "links",
    fullScreen: { enable: false },
    background: { color: { value: bgColor } },
    particles: {
      number: { value: number, density: { enable: true, height: 800, width: 800 } },
      color: { value: particleColor },
      shape: { type: "circle" },
      opacity: { value: 0.7 },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
        attract: { enable: false },
      },
      links: {
        enable: true,
        distance: linkDistance,
        color: particleLinkColor,
        opacity: linkOpacity,
        width: linkWidth,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: interactiveMode },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        connect: {},
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none blur-sm">
      <Particles id="tsparticles" options={options} />
    </div>
  );
} 