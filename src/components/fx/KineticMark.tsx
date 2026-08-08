"use client";

import { useEffect, useRef } from "react";
import { KineticEngine, type KineticParams } from "@/components/fx/kinetic/engine";
import { useEngineLifecycle } from "@/components/fx/useEngineLifecycle";
import { useThemeTokens } from "@/components/fx/useThemeTokens";
import styles from "@/components/fx/KineticMark.module.css";

const TOKENS = ["--surface-sunken", "--ink", "--accent"] as const;

const TUNING = {
  tiles: 34,
  offset: 22,
  speed: 0.018,
  spread: 0.025,
  chroma: 0.3,
  shade: 0.35,
  grain: 0.55,
} satisfies Omit<KineticParams, "text" | "paper" | "ink" | "accent">;

/**
 * The site's signature visual: the same R as the nav monogram, cut into a tile
 * grid and rippled. Static mark in the chrome, kinetic mark on the page.
 *
 * Colours come from the design tokens rather than props, so the letter repaints
 * with the theme toggle instead of stranding one palette on a canvas.
 */
export function KineticMark({ letter = "R" }: { letter?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<KineticEngine | null>(null);
  const tokens = useThemeTokens(TOKENS);

  useEngineLifecycle(
    hostRef,
    () => {
      if (!hostRef.current || !tokens) return null;
      const engine = new KineticEngine(hostRef.current, {
        ...TUNING,
        text: letter,
        paper: tokens["--surface-sunken"],
        ink: tokens["--ink"],
        accent: tokens["--accent"],
      });
      engineRef.current = engine;
      return engine;
    },
    Boolean(tokens),
  );

  // Repaint on theme change without tearing the engine down.
  useEffect(() => {
    if (!tokens) return;
    engineRef.current?.setParams({
      ...TUNING,
      text: letter,
      paper: tokens["--surface-sunken"],
      ink: tokens["--ink"],
      accent: tokens["--accent"],
    });
  }, [tokens, letter]);

  // The letter is rasterised at mount, which may land before the webfont is
  // ready — redraw once it is, or the mark ripples a fallback letterform.
  useEffect(() => {
    if (!document.fonts) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) engineRef.current?.refreshLetter();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.band} ref={hostRef} role="img" aria-label={`${letter} monogram, animated`}>
      <span className={`${styles.caption} label`}>Kinetic type</span>
    </div>
  );
}
