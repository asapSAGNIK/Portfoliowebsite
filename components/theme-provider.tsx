'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { useEffect } from "react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { tsParticles } from "@tsparticles/engine";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    loadLinksPreset(tsParticles);
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
