"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  setTheme: (next: ThemeMode, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "sagnik-theme";

function applyDomTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.classList.toggle("dark", mode === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("theme");
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const initial: ThemeMode =
        param === "light" || param === "dark"
          ? param
          : saved === "light"
            ? "light"
            : "dark";
      setThemeState(initial);
      applyDomTheme(initial);
    } catch {
      applyDomTheme("dark");
    }
  }, []);

  const setTheme = useCallback((next: ThemeMode, origin?: { x: number; y: number }) => {
    const commit = () => {
      setThemeState(next);
      applyDomTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore storage errors
      }
    };

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };

    if (!reducedMotion && typeof docWithVT.startViewTransition === "function") {
      if (origin) {
        document.documentElement.style.setProperty("--cord-x", `${Math.round(origin.x)}px`);
        document.documentElement.style.setProperty("--cord-y", `${Math.round(origin.y)}px`);
      }
      docWithVT.startViewTransition(commit);
    } else {
      commit();
    }
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      setTheme(theme === "dark" ? "light" : "dark", origin);
    },
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
