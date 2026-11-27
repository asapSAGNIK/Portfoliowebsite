"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import PullCordToggle from "@/components/PullCordToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <header
      className="no-print sticky top-0 z-30 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--rule-hair)",
        backgroundColor: "color-mix(in srgb, var(--surface-ground) 88%, transparent)",
      }}
    >
      <div className="relative mx-auto flex h-16 max-w-[1000px] items-center justify-between gap-3 px-4 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-[14px] font-semibold tracking-[-0.02em] no-underline transition-colors duration-150 sm:text-[15px]"
          style={{ color: "var(--ink-primary)" }}
        >
          Sagnik Chowdhury
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary navigation" className="flex items-center gap-4 sm:gap-6">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative py-1 text-[14px] no-underline transition-colors duration-150"
                  style={{
                    color: active ? "var(--ink-primary)" : "var(--ink-muted)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[2px] h-[2px] rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Subtle live audio indicator shown only while music is actively playing */}
          {isPlaying ? (
            <button
              type="button"
              onClick={() => toggleAudio()}
              aria-pressed={true}
              aria-label="Pause desk sound loop"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[12px] transition-colors duration-150"
              style={{
                borderColor: "var(--accent)",
                backgroundColor: "var(--accent-soft)",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Live</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Hanging physics pull cord anchored in the outer right gutter on xl+, neatly tucked top-right on smaller widths */}
      <div className="pointer-events-none fixed right-1 top-16 z-40 sm:right-4 xl:right-8">
        <PullCordToggle />
      </div>
    </header>
  );
}
