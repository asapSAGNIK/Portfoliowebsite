"use client";

import { Pause, Play } from "lucide-react";
import { DECK_TRACKS, useAudio } from "@/contexts/AudioContext";

export default function SoundDeck() {
  const {
    isPlaying,
    trackId,
    toggleAudio,
    selectTrack,
  } = useAudio();

  const currentTrack = DECK_TRACKS.find((t) => t.id === trackId) ?? DECK_TRACKS[0];

  return (
    <section
      aria-label="Desk Sound Deck"
      className="rounded-lg border px-4 py-3.5 sm:px-5 sm:py-4"
      style={{
        borderColor: "var(--rule-hair)",
        backgroundColor: "var(--surface-raised)",
      }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left: Single unmistakable play/pause vinyl trigger + inline metadata */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => toggleAudio()}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
            className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-md border transition-colors duration-150"
            style={{
              borderColor: isPlaying ? "var(--accent)" : "var(--rule-strong)",
              backgroundColor: "var(--surface-subtle)",
            }}
          >
            {/* Matte grooved vinyl disc */}
            <span
              aria-hidden="true"
              className={`relative block h-11 w-11 rounded-full ${isPlaying ? "vinyl-spinning" : ""}`}
              style={{
                background:
                  "repeating-radial-gradient(circle at center, var(--surface-vinyl) 0px, var(--surface-vinyl) 2px, var(--surface-vinyl-groove) 2.5px, var(--surface-vinyl) 4px)",
                border: "1px solid var(--rule-strong)",
              }}
            >
              {/* Warm amber center pressing label with play/pause glyph */}
              <span
                className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-ink)" }}
              >
                {isPlaying ? (
                  <Pause className="h-2.5 w-2.5 fill-current" />
                ) : (
                  <Play className="h-2.5 w-2.5 translate-x-[0.5px] fill-current" />
                )}
              </span>
            </span>

            {/* Pivoting tonearm */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[5px] top-[5px] h-[26px] w-[2px] origin-top rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isPlaying ? "var(--accent)" : "var(--ink-muted)",
                transform: isPlaying ? "rotate(24deg)" : "rotate(4deg)",
              }}
            >
              <span
                className="absolute -left-[2px] -top-[2px] block h-[6px] w-[6px] rounded-full"
                style={{ backgroundColor: "var(--ink-secondary)" }}
              />
            </span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="truncate text-[14px] font-semibold"
                style={{ color: "var(--ink-primary)" }}
              >
                {currentTrack.title}
              </span>
            </div>

            <p
              className="mt-1 text-[12px] tabular-nums"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
            >
              {isPlaying
                ? `Playing / ${currentTrack.bpm} / Click vinyl to pause`
                : `${currentTrack.bpm} / Click vinyl to play`}
            </p>
          </div>
        </div>

        {/* Right: Track switcher + Studio VU bars */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Select desk audio track"
            className="inline-flex rounded-md border p-0.5"
            style={{
              borderColor: "var(--rule-hair)",
              backgroundColor: "var(--surface-ground)",
            }}
          >
            {DECK_TRACKS.map((track) => {
              const selected = track.id === trackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectTrack(track.id)}
                  aria-pressed={selected}
                  className="rounded px-2.5 py-1 text-[12px] transition-colors duration-150"
                  style={{
                    backgroundColor: selected ? "var(--surface-subtle)" : "transparent",
                    color: selected ? "var(--ink-primary)" : "var(--ink-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {track.id === "house" ? "House" : "GTA"}
                </button>
              );
            })}
          </div>

          {/* 4-bar studio VU meter (animates only when audio is playing) */}
          <div
            aria-hidden="true"
            className="ml-1 flex h-4 items-end gap-[3px]"
          >
            {[0, 140, 280, 90].map((delay, idx) => (
              <span
                key={idx}
                className={`block w-[2px] rounded-full ${isPlaying ? "vu-bar-active" : ""}`}
                style={{
                  height: isPlaying ? "15px" : "4px",
                  backgroundColor: isPlaying ? "var(--accent)" : "var(--rule-strong)",
                  animationDelay: `${delay}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
