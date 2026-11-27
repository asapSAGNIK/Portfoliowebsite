"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type DeckTrackId = "house" | "gta";

export interface DeckTrack {
  id: DeckTrackId;
  title: string;
  subtitle: string;
  bpm: string;
}

export const DECK_TRACKS: DeckTrack[] = [
  {
    id: "house",
    title: "House Loop",
    subtitle: "Warm Rhodes chords synthesized in Web Audio",
    bpm: "122 BPM",
  },
  {
    id: "gta",
    title: "GTA Theme",
    subtitle: "Classic console loop from Sagnik's desk",
    bpm: "94 BPM",
  },
];

interface AudioContextType {
  isPlaying: boolean;
  trackId: DeckTrackId;
  activePadId: string | null;
  toggleAudio: () => void;
  selectTrack: (id: DeckTrackId) => void;
  playSwitchClick: () => void;
  triggerPad: (padId: string, src: string, startAt?: number, durationMs?: number) => void;
  stopPad: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const HOUSE_CHORDS = [
  [220.0, 261.63, 329.63, 392.0], // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [196.0, 246.94, 293.66, 349.23], // G7sus
  [164.81, 196.0, 246.94, 293.66], // Em7
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // Always muted by default — never autoplays on page load
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackId, setTrackId] = useState<DeckTrackId>("house");
  const [activePadId, setActivePadId] = useState<string | null>(null);

  const webAudioRef = useRef<AudioContext | null>(null);
  const loopIntervalRef = useRef<number | null>(null);
  const chordStepRef = useRef(0);
  const gtaAudioRef = useRef<HTMLAudioElement | null>(null);

  const padAudioRef = useRef<HTMLAudioElement | null>(null);
  const padTimerRef = useRef<number | null>(null);

  const ensureWebAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!webAudioRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctor) {
        webAudioRef.current = new Ctor();
      }
    }
    if (webAudioRef.current && webAudioRef.current.state === "suspended") {
      webAudioRef.current.resume().catch(() => {});
    }
    return webAudioRef.current;
  }, []);

  const stopHouseLoop = useCallback(() => {
    if (loopIntervalRef.current !== null) {
      window.clearInterval(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }
  }, []);

  const playHouseChord = useCallback(() => {
    const ctx = ensureWebAudio();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = HOUSE_CHORDS[chordStepRef.current % HOUSE_CHORDS.length];
    chordStepRef.current += 1;

    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(780, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 1.65);

    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(0.055, now + 0.08);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.88);

    filter.connect(master);
    master.connect(ctx.destination);

    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + 1.92);
    });
  }, [ensureWebAudio]);

  const stopGtaTrack = useCallback(() => {
    if (gtaAudioRef.current) {
      gtaAudioRef.current.pause();
      gtaAudioRef.current.currentTime = 0;
    }
  }, []);

  const startPlayback = useCallback(
    (targetTrack: DeckTrackId) => {
      stopHouseLoop();
      stopGtaTrack();

      if (targetTrack === "house") {
        playHouseChord();
        loopIntervalRef.current = window.setInterval(playHouseChord, 1967);
      } else {
        if (!gtaAudioRef.current) {
          const audio = new Audio("/audio/gtatheme.m4a");
          audio.loop = true;
          audio.volume = 0.35;
          audio.preload = "none";
          gtaAudioRef.current = audio;
        }
        gtaAudioRef.current.currentTime = 0;
        gtaAudioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    },
    [playHouseChord, stopGtaTrack, stopHouseLoop]
  );

  const stopPlayback = useCallback(() => {
    stopHouseLoop();
    stopGtaTrack();
    setIsPlaying(false);
  }, [stopGtaTrack, stopHouseLoop]);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback(trackId);
    }
  }, [isPlaying, startPlayback, stopPlayback, trackId]);

  const selectTrack = useCallback(
    (id: DeckTrackId) => {
      setTrackId(id);
      if (isPlaying) {
        startPlayback(id);
      }
    },
    [isPlaying, startPlayback]
  );

  const playSwitchClick = useCallback(() => {
    const ctx = ensureWebAudio();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(190, now + 0.032);
    gain.gain.setValueAtTime(0.055, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.042);
  }, [ensureWebAudio]);

  const stopPad = useCallback(() => {
    if (padTimerRef.current !== null) {
      window.clearTimeout(padTimerRef.current);
      padTimerRef.current = null;
    }
    if (padAudioRef.current) {
      padAudioRef.current.pause();
      padAudioRef.current.currentTime = 0;
      padAudioRef.current = null;
    }
    setActivePadId(null);
  }, []);

  const triggerPad = useCallback(
    (padId: string, src: string, startAt = 0, durationMs = 2200) => {
      const wasSame = activePadId === padId;
      stopPad();
      if (wasSame) return;

      const audio = new Audio(src);
      audio.volume = 0.38;
      padAudioRef.current = audio;
      setActivePadId(padId);

      const beginPlay = () => {
        if (startAt > 0) {
          try {
            audio.currentTime = startAt;
          } catch {
            // ignore seek error before metadata
          }
        }
        audio.play().catch(() => {
          setActivePadId(null);
        });
      };

      if (startAt > 0) {
        audio.addEventListener("loadedmetadata", beginPlay, { once: true });
        audio.load();
      } else {
        beginPlay();
      }

      audio.addEventListener("ended", () => {
        setActivePadId((curr) => (curr === padId ? null : curr));
      });

      padTimerRef.current = window.setTimeout(() => {
        stopPad();
      }, durationMs);
    },
    [activePadId, stopPad]
  );

  useEffect(() => {
    return () => {
      stopHouseLoop();
      stopGtaTrack();
      stopPad();
    };
  }, [stopGtaTrack, stopHouseLoop, stopPad]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        trackId,
        activePadId,
        toggleAudio,
        selectTrack,
        playSwitchClick,
        triggerPad,
        stopPad,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
