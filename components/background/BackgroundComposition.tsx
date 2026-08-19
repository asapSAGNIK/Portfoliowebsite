"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  drawGridPlane,
  drawParticles,
  drawPolyWireframe,
  drawRing,
  drawWireframeSphere,
  edgeFade,
  makeParticles,
  type PolyKind,
} from "./shapes";

export const BG_WIDTH = 1920;
export const BG_HEIGHT = 1080;
export const DURATION = 720;

export type Mode = "desktop" | "tablet" | "mobile";

type Props = {
  mode?: Mode;
};

const LIME = "167,209,41";
const GRAY_GREEN = "150,160,130";
const DARK_GRAY = "110,115,100";

const TAU = Math.PI * 2;

// depth parallax multipliers
const DEPTH = {
  bg: 0.5,
  mid: 1.0,
  fore: 1.7,
};

type LayerProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  frame: number;
  progress: number;
};

const getCtx = (canvasRef: React.RefObject<HTMLCanvasElement | null>) =>
  canvasRef.current?.getContext("2d") ?? null;

const GridPlane = ({ canvasRef, progress }: LayerProps) => {
  useEffect(() => {
    const ctx = getCtx(canvasRef);
    if (ctx) drawGridPlane(ctx, BG_WIDTH, BG_HEIGHT, progress);
  }, [canvasRef, progress]);
  return null;
};

const ParticleField = ({
  canvasRef,
  frame,
  progress,
  count,
}: LayerProps & { count: number }) => {
  const particles = useMemo(
    () => makeParticles(count, BG_WIDTH, BG_HEIGHT),
    [count]
  );
  useEffect(() => {
    const ctx = getCtx(canvasRef);
    if (ctx) drawParticles(ctx, particles, frame, progress, BG_WIDTH, BG_HEIGHT);
  }, [canvasRef, frame, progress, particles]);
  return null;
};

const WireframeSphere = ({
  canvasRef,
  progress,
  cx,
  cy,
  r,
  travel,
  dir,
  spin,
  tilt,
  color,
  alpha,
  lineWidth,
}: LayerProps & {
  cx: number;
  cy: number;
  r: number;
  travel: number;
  dir: 1 | -1;
  spin: number;
  tilt: number;
  color: string;
  alpha: number;
  lineWidth?: number;
}) => {
  useEffect(() => {
    const ctx = getCtx(canvasRef);
    if (!ctx) return;
    const y = cy + dir * (progress - 0.5) * travel;
    const x = cx + dir * (progress - 0.5) * travel * 0.25;
    const rx = tilt + progress * TAU * spin;
    const ry = tilt * 0.5 + progress * TAU * spin * 0.6;
    drawWireframeSphere(ctx, x, y, r, rx, ry, color, alpha * edgeFade(x, BG_WIDTH), lineWidth);
  }, [canvasRef, progress, cx, cy, r, travel, dir, spin, tilt, color, alpha, lineWidth]);
  return null;
};

const OrbitalRing = ({
  canvasRef,
  progress,
  cx,
  cy,
  r,
  tiltX,
  tiltY,
  travel,
  dir,
  spin,
  color,
  alpha,
  lineWidth,
}: LayerProps & {
  cx: number;
  cy: number;
  r: number;
  tiltX: number;
  tiltY: number;
  travel: number;
  dir: 1 | -1;
  spin: number;
  color: string;
  alpha: number;
  lineWidth?: number;
}) => {
  useEffect(() => {
    const ctx = getCtx(canvasRef);
    if (!ctx) return;
    const y = cy + dir * (progress - 0.5) * travel;
    const x = cx + dir * (progress - 0.5) * travel * 0.25;
    const tx = tiltX + progress * TAU * spin * 0.5;
    const ty = tiltY + progress * TAU * spin * 0.35;
    drawRing(ctx, x, y, r, tx, ty, color, alpha * edgeFade(x, BG_WIDTH), lineWidth);
  }, [canvasRef, progress, cx, cy, r, tiltX, tiltY, travel, dir, spin, color, alpha, lineWidth]);
  return null;
};

const FloatingGeometry = ({
  canvasRef,
  progress,
  kind,
  cx,
  cy,
  size,
  travel,
  dir,
  spinX,
  spinY,
  spinZ,
  color,
  alpha,
  lineWidth,
}: LayerProps & {
  kind: PolyKind;
  cx: number;
  cy: number;
  size: number;
  travel: number;
  dir: 1 | -1;
  spinX: number;
  spinY: number;
  spinZ: number;
  color: string;
  alpha: number;
  lineWidth?: number;
}) => {
  useEffect(() => {
    const ctx = getCtx(canvasRef);
    if (!ctx) return;
    const y = cy + dir * (progress - 0.5) * travel;
    const x = cx + dir * (progress - 0.5) * travel * 0.3;
    drawPolyWireframe(
      ctx,
      kind,
      x,
      y,
      size,
      progress * TAU * spinX,
      progress * TAU * spinY,
      progress * TAU * spinZ,
      color,
      alpha * edgeFade(x, BG_WIDTH),
      lineWidth
    );
  }, [canvasRef, progress, kind, cx, cy, size, travel, dir, spinX, spinY, spinZ, color, alpha, lineWidth]);
  return null;
};

export const BackgroundComposition: React.FC<Props> = ({ mode = "desktop" }) => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, frame / (DURATION - 1));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isTablet = mode === "tablet";
  const isMobile = mode === "mobile";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <canvas
        ref={canvasRef}
        width={BG_WIDTH}
        height={BG_HEIGHT}
        style={{ width: "100%", height: "100%" }}
      />

      {/* BACKGROUND depth â€” grid + particles */}
      <GridPlane canvasRef={canvasRef} frame={frame} progress={progress} />
      <ParticleField
        canvasRef={canvasRef}
        frame={frame}
        progress={progress}
        count={isMobile ? 18 : isTablet ? 36 : 60}
      />

      {!isMobile && (
        <>
          {/* MIDGROUND â€” left: primary globe + orbital rings */}
          <WireframeSphere
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={-40}
            cy={360}
            r={isTablet ? 260 : 340}
            travel={220}
            dir={1}
            spin={1.2}
            tilt={0.5}
            color={LIME}
            alpha={0.3}
          />
          <OrbitalRing
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={-40}
            cy={360}
            r={isTablet ? 360 : 470}
            tiltX={1.05}
            tiltY={0.3}
            travel={220}
            dir={1}
            spin={0.6}
            color={LIME}
            alpha={0.2}
          />
          <OrbitalRing
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={-40}
            cy={360}
            r={isTablet ? 420 : 550}
            tiltX={0.35}
            tiltY={0.9}
            travel={220}
            dir={-1}
            spin={-0.5}
            color={GRAY_GREEN}
            alpha={0.3}
          />

          {/* MIDGROUND â€” right: small globe + ring */}
          <WireframeSphere
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={1990}
            cy={250}
            r={isTablet ? 200 : 250}
            travel={200}
            dir={-1}
            spin={-1.5}
            tilt={0.3}
            color={GRAY_GREEN}
            alpha={0.24}
          />
          <OrbitalRing
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={1990}
            cy={250}
            r={isTablet ? 290 : 340}
            tiltX={-1.15}
            tiltY={0.4}
            travel={200}
            dir={-1}
            spin={-0.7}
            color={LIME}
            alpha={0.2}
          />
          <WireframeSphere
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={1960}
            cy={870}
            r={130}
            travel={240}
            dir={1}
            spin={0.8}
            tilt={-0.4}
            color={DARK_GRAY}
            alpha={0.22}
          />

          {/* FOREGROUND â€” geometric shapes */}
          <FloatingGeometry
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            kind="icosahedron"
            cx={1660}
            cy={640}
            size={isTablet ? 100 : 120}
            travel={320}
            dir={-1}
            spinX={0.9}
            spinY={1.4}
            spinZ={0.5}
            color={LIME}
            alpha={0.3}
          />
          <OrbitalRing
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={1660}
            cy={640}
            r={isTablet ? 160 : 190}
            tiltX={0.9}
            tiltY={0.2}
            travel={320}
            dir={-1}
            spin={0.8}
            color={GRAY_GREEN}
            alpha={0.24}
          />
          <FloatingGeometry
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            kind="cube"
            cx={160}
            cy={790}
            size={isTablet ? 60 : 80}
            travel={340}
            dir={1}
            spinX={1.1}
            spinY={1.6}
            spinZ={0.3}
            color={GRAY_GREEN}
            alpha={0.3}
          />
          <FloatingGeometry
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            kind="tetrahedron"
            cx={1770}
            cy={1010}
            size={isTablet ? 70 : 90}
            travel={360}
            dir={-1}
            spinX={1.6}
            spinY={0.8}
            spinZ={0.6}
            color={DARK_GRAY}
            alpha={0.24}
          />
          {!isTablet && (
            <>
              <FloatingGeometry
                canvasRef={canvasRef}
                frame={frame}
                progress={progress}
                kind="cube"
                cx={1710}
                cy={130}
                size={55}
                travel={260}
                dir={-1}
                spinX={1.3}
                spinY={0.9}
                spinZ={0.4}
                color={LIME}
                alpha={0.2}
              />
              <FloatingGeometry
                canvasRef={canvasRef}
                frame={frame}
                progress={progress}
                kind="tetrahedron"
                cx={140}
                cy={150}
                size={60}
                travel={280}
                dir={-1}
                spinX={0.7}
                spinY={1.2}
                spinZ={0.5}
                color={GRAY_GREEN}
                alpha={0.2}
              />
            </>
          )}
        </>
      )}

      {/* MOBILE â€” only a couple of subtle edge elements */}
      {isMobile && (
        <>
          <WireframeSphere
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={-50}
            cy={340}
            r={150}
            travel={140}
            dir={1}
            spin={0.9}
            tilt={0.5}
            color={LIME}
            alpha={0.24}
          />
          <OrbitalRing
            canvasRef={canvasRef}
            frame={frame}
            progress={progress}
            cx={1960}
            cy={720}
            r={200}
            tiltX={1.0}
            tiltY={0.3}
            travel={160}
            dir={-1}
            spin={-0.6}
            color={GRAY_GREEN}
            alpha={0.2}
          />
        </>
      )}
    </AbsoluteFill>
  );
};

export default BackgroundComposition;
