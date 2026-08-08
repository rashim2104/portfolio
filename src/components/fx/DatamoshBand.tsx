"use client";

import { useEffect, useRef } from "react";
import { DatamoshEngine } from "@/components/fx/datamosh/engine";
import { useEngineLifecycle } from "@/components/fx/useEngineLifecycle";
import { useThemeTokens } from "@/components/fx/useThemeTokens";
import styles from "@/components/fx/DatamoshBand.module.css";

// A corrupted-video field built from the site's own palette. The status colours
// earn their place here — this is the one page where something has genuinely
// gone wrong, so red and amber are reporting rather than decorating.
const TOKENS = [
  "--ink",
  "--surface",
  "--surface-inset",
  "--accent",
  "--fail",
  "--warn",
  "--ok",
] as const;

export function DatamoshBand() {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<DatamoshEngine | null>(null);
  const tokens = useThemeTokens(TOKENS);

  const palette = () => (tokens ? TOKENS.map((t) => tokens[t]).filter(Boolean) : []);

  useEngineLifecycle(
    hostRef,
    () => {
      if (!hostRef.current || !tokens) return null;
      const engine = new DatamoshEngine(hostRef.current, palette());
      if (!engine.ok) return null;
      engineRef.current = engine;
      return engine;
    },
    Boolean(tokens),
  );

  useEffect(() => {
    if (tokens) engineRef.current?.setPalette(palette());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  return (
    <div className={styles.band} ref={hostRef} role="img" aria-label="Corrupted signal">
      <span className={`${styles.caption} label`}>Signal lost</span>
    </div>
  );
}
