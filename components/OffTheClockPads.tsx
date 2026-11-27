"use client";

import React, { useEffect, useState } from "react";
import { Square } from "lucide-react";
import { OFF_CLOCK_PADS, type OffClockPad } from "@/lib/portfolio-data";
import { useAudio } from "@/contexts/AudioContext";

function PadEmblem({ pad }: { pad: OffClockPad }) {
  const isSquareLogo = pad.id === "rekordbox" || pad.id === "cs2" || pad.id === "fifa";
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border ${pad.id === "fifa" ? "bg-white" : ""}`}
      style={{
        borderColor: "var(--rule-hair)",
        backgroundColor: pad.id === "fifa" ? undefined : "var(--surface-vinyl)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pad.iconSrc}
        alt={`${pad.label} icon`}
        className={isSquareLogo ? "h-full w-full object-cover" : "h-6 w-6 object-contain"}
      />
    </span>
  );
}

export default function OffTheClockPads() {
  const { activePadId, triggerPad, stopPad } = useAudio();
  const [selectedPad, setSelectedPad] = useState<OffClockPad>(OFF_CLOCK_PADS[0]);

  const handleTrigger = (pad: OffClockPad) => {
    setSelectedPad(pad);
    triggerPad(pad.id, pad.audioSrc, pad.startAt ?? 0, pad.durationMs ?? 2200);
  };

  // Optional 1-5 hardware pad shortcuts when not typing in an input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const match = OFF_CLOCK_PADS.find((p) => p.keyHint === e.key);
      if (match) {
        setSelectedPad(match);
        triggerPad(match.id, match.audioSrc, match.startAt ?? 0, match.durationMs ?? 2200);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [triggerPad]);

  const activePad = OFF_CLOCK_PADS.find((p) => p.id === activePadId);
  const shownPad = activePad ?? selectedPad;

  return (
    <div className="space-y-4">
      <p className="max-w-[60ch] text-[15px] leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
        When I’m not coding, I’m mixing house tracks, playing CS2 or FIFA, or out on a pitch or
        court. Tap a pad or press keys 1 to 5.
      </p>

      {/* 5-pad tactile hardware controller strip */}
      <div
        role="group"
        aria-label="Off the clock audio sampler pads"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-5"
      >
        {OFF_CLOCK_PADS.map((pad) => {
          const isLit = activePadId === pad.id;
          return (
            <button
              key={pad.id}
              type="button"
              onClick={() => handleTrigger(pad)}
              aria-pressed={isLit}
              className="group relative flex flex-col items-start justify-between rounded-md border p-3 text-left transition-transform duration-150 active:translate-y-[1px] last:col-span-2 sm:last:col-span-1"
              style={{
                borderColor: isLit ? "var(--accent)" : "var(--rule-hair)",
                backgroundColor: isLit ? "var(--accent-soft)" : "var(--surface-raised)",
                color: "var(--ink-primary)",
                minHeight: "76px",
              }}
            >
              <div className="flex w-full items-start justify-between">
                <PadEmblem pad={pad} />
                {/* Tiny hardware pad key index & LED */}
                <span className="flex items-center gap-1.5">
                  <span
                    className="text-[11px] tabular-nums"
                    style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {pad.keyHint}
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-1.5 w-1.5 rounded-full transition-colors duration-150"
                    style={{
                      backgroundColor: isLit ? "var(--accent)" : "var(--rule-strong)",
                    }}
                  />
                </span>
              </div>

              <span className="mt-3 text-[13px] font-medium" style={{ color: "var(--ink-primary)" }}>
                {pad.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean status readout bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 rounded-md border px-3.5 py-2.5 text-[13px]"
        style={{
          borderColor: "var(--rule-hair)",
          backgroundColor: "var(--surface-raised)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="shrink-0 text-[12px]"
            style={{
              color: activePadId ? "var(--accent)" : "var(--ink-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {activePadId ? "Playing" : "Pad"} [{shownPad.keyHint}]
          </span>
          <span className="truncate" style={{ color: "var(--ink-secondary)" }}>
            {shownPad.caption}
          </span>
        </div>

        {activePadId ? (
          <button
            type="button"
            onClick={() => stopPad()}
            className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[12px]"
            style={{
              borderColor: "var(--rule-strong)",
              color: "var(--ink-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <Square className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
            <span>Stop</span>
          </button>
        ) : (
          <span
            className="text-[12px]"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
          >
            Click to audition
          </span>
        )}
      </div>
    </div>
  );
}
