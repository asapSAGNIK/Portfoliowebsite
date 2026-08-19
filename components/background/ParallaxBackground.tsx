"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import BackgroundComposition, {
  BG_HEIGHT,
  BG_WIDTH,
  DURATION,
  type Mode,
} from "./BackgroundComposition";

const SCROLL_FRAMES = DURATION;

const getMode = (w: number): Mode => (w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");

const ParallaxBackground: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const lastFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [mode, setMode] = useState<Mode>("desktop");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coverScale, setCoverScale] = useState(1);

  // Responsive mode + prefers-reduced-motion
  useEffect(() => {
    const updateMode = () => setMode(getMode(window.innerWidth));
    updateMode();
    window.addEventListener("resize", updateMode);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);

    // Cover-scale the 16:9 composition to fill any viewport aspect (no bezels)
    const updateCover = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const fit = Math.min(w / BG_WIDTH, h / BG_HEIGHT);
      setCoverScale(Math.max(w / (fit * BG_WIDTH), h / (fit * BG_HEIGHT)));
    };
    updateCover();
    window.addEventListener("resize", updateCover);

    return () => {
      window.removeEventListener("resize", updateMode);
      window.removeEventListener("resize", updateCover);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  // Bridge page scroll position into Remotion frames (rAF-throttled,
  // quantized to every 2 frames so seeks/re-renders stay cheap)
  useEffect(() => {
    if (reducedMotion) return;
    const el = document.getElementById("scroll-container");
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
      const frame = Math.round((p * (SCROLL_FRAMES - 1)) / 2) * 2;
      if (frame !== lastFrameRef.current) {
        lastFrameRef.current = frame;
        playerRef.current?.seekTo(frame);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  // Belt-and-braces: make sure the Player never renders frames on its own
  useEffect(() => {
    playerRef.current?.pause();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-[5] overflow-hidden pointer-events-none select-none"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${coverScale})`,
          transformOrigin: "center center",
        }}
      >
        <Player
          ref={playerRef}
          component={BackgroundComposition}
          inputProps={{ mode }}
          durationInFrames={SCROLL_FRAMES}
          fps={30}
          compositionWidth={BG_WIDTH}
          compositionHeight={BG_HEIGHT}
          style={{ width: "100%", height: "100%" }}
          controls={false}
          loop
          autoPlay={false}
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;