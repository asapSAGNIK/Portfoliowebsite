"use client";

import {
  siDotnet,
  siNextdotjs,
  siPython,
  siReact,
  siSqlite,
  siSpotify,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUnity,
  type SimpleIcon,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  python: siPython,
  sqlite: siSqlite,
  nextjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  tailwind: siTailwindcss,
  supabase: siSupabase,
  spotify: siSpotify,
  unity: siUnity,
  csharp: siDotnet,
};

// Brand colors that are invisible on a black background get an override
const COLOR_OVERRIDES: Record<string, string> = {
  nextjs: "#FFFFFF",
  unity: "#FFFFFF",
  csharp: "#512BD4",
};

const normalize = (name: string): string => {
  const lower = name.toLowerCase().trim();
  if (lower === "c#") return "csharp";
  return lower.replace(/[.\s-]+/g, "").replace(/\d+$/, "");
};

const TechIcon = ({ name, size = 10 }: { name: string; size?: number }) => {
  const key = normalize(name);
  const icon = ICONS[key];
  if (!icon) return null;
  const color = COLOR_OVERRIDES[key] ?? `#${icon.hex}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
};

export default TechIcon;