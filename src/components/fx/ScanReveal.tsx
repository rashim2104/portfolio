"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { ScanEngine } from "@/components/fx/scan/engine";
import { useThemeTokens } from "@/components/fx/useThemeTokens";

const TOKENS = ["--ink", "--accent", "--ink-dim", "--surface-inset"] as const;

/**
 * Wraps card artwork and plays a block-scan reveal over it on hover or focus.
 *
 * The engine is built lazily on the first interaction rather than on mount, so
 * a page of cards costs nothing until one is actually pointed at, and it never
 * runs at all for touch or reduced-motion visitors.
 */
export function ScanReveal({ children, className }: { children: ReactNode; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ScanEngine | null>(null);
  const tokens = useThemeTokens(TOKENS);

  const palette = useCallback(
    () => (tokens ? TOKENS.map((t) => tokens[t]).filter(Boolean) : []),
    [tokens],
  );

  const enabled = useCallback(() => {
    if (typeof window === "undefined") return false;
    // Pointer-fine only: on a touch screen "hover" fires on tap, which would
    // put a curtain of blocks between the tap and the link it opened.
    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const play = useCallback(() => {
    if (!enabled() || !hostRef.current || !tokens) return;
    if (!engineRef.current) {
      const engine = new ScanEngine(hostRef.current, palette());
      if (!engine.ok) return;
      engineRef.current = engine;
    } else {
      engineRef.current.setPalette(palette());
    }
    engineRef.current.play();
  }, [enabled, palette, tokens]);

  const settle = useCallback(() => engineRef.current?.clear(), []);

  useEffect(
    () => () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    },
    [],
  );

  return (
    <div
      ref={hostRef}
      className={className}
      onPointerEnter={play}
      onPointerLeave={settle}
      onFocusCapture={play}
      onBlurCapture={settle}
    >
      {children}
    </div>
  );
}
