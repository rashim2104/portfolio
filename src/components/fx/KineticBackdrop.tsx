"use client";

import { useEffect, useRef } from "react";
import { KineticEngine, type KineticParams } from "@/components/fx/kinetic/engine";
import { useEngineLifecycle } from "@/components/fx/useEngineLifecycle";
import { useThemeTokens } from "@/components/fx/useThemeTokens";
import styles from "@/components/fx/KineticBackdrop.module.css";

const TOKENS = ["--ink", "--accent", "--fx-backdrop-alpha"] as const;

/**
 * The site's signature: a single oversized 'r' rippling behind every page.
 *
 * It is the nav monogram off its leash — same letter, no frame, no allocated
 * space. Sized to 80% of the viewport height and vertically centred, so it
 * reads as the surface the site sits on rather than a picture of a letter.
 *
 * Kept faint deliberately: everything on the site renders on top of it, so the
 * letter has to lose every contrast argument it has with the body copy.
 */
const TUNING = {
  paper: null,
  // The grid has to be fine relative to the glyph, not to the viewport. At a
  // fit of 0.8 the letter is one large mass of thick strokes, so a coarse grid
  // gives only a few dozen cells across the whole shape and a displacement of
  // half a cell reads as sliding slabs rather than a ripple. Smaller cells and
  // a smaller shove keep it a texture. The tile loop is clipped to the glyph's
  // bounding box, so the extra columns cost nothing outside the letter.
  tiles: 64,
  offset: 15,
  speed: 0.014,
  spread: 0.03,
  chroma: 0.55,
  shade: 0.4,
  grain: 0,
  fit: 0.8, // glyph ink height = 80% of the viewport
  anchorX: 0.78,
  anchorY: 0.5, // vertically centred

  // A full-viewport canvas is the largest surface on the site; a DPR of 2 on a
  // large display buys nothing visible on a shape this soft and costs real
  // fill rate every frame.
  maxDpr: 1.5,
} satisfies Omit<KineticParams, "text" | "ink" | "accent" | "opacity">;

export function KineticBackdrop({ letter = "r" }: { letter?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<KineticEngine | null>(null);
  const tokens = useThemeTokens(TOKENS);

  const params = (): KineticParams => ({
    ...TUNING,
    text: letter,
    ink: tokens?.["--ink"] ?? "#000000",
    accent: tokens?.["--accent"] ?? "#000000",
    opacity: Number.parseFloat(tokens?.["--fx-backdrop-alpha"] ?? "") || 0.08,
  });

  useEngineLifecycle(
    hostRef,
    () => {
      if (!hostRef.current || !tokens) return null;
      const engine = new KineticEngine(hostRef.current, params());
      engineRef.current = engine;
      return engine;
    },
    Boolean(tokens),
  );

  useEffect(() => {
    if (tokens) engineRef.current?.setParams(params());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, letter]);

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

  return <div className={styles.backdrop} ref={hostRef} aria-hidden="true" />;
}
