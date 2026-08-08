"use client";

import { useEffect, useRef, useState } from "react";
import { useThemeTokens } from "@/components/fx/useThemeTokens";
import styles from "@/components/fx/BadgeTrail.module.css";

/**
 * Tiny mono badges dropped along the cursor's path.
 *
 * The two rules that make it read as a trail rather than a smear: a badge
 * drops only after BOTH a time gap and a minimum travel distance, so a still
 * cursor cannot stack badges in place; and a candidate is AABB-tested against
 * every live badge before it spawns, so density self-limits near clusters and
 * badges never touch.
 *
 * This is the core of the vault effect. Its idle ghost-cursor wander, glyph
 * scramble and pointer-repel are deliberately left out — they add a lot of
 * surface for very little on a page that is primarily a list to read.
 */

const FONT_PX = 11;
const CHAR_W = 6.7;
const PAD_X = 4;
const PAD_Y = 1;
const GAP = 4;

const DROP_MS = 90;
const MIN_TRAVEL = 26;
const APPEAR_MS = 140;
const HOLD_MS = 620;
const FADE_MS = 260;
const LIFE_MS = APPEAR_MS + HOLD_MS + FADE_MS;
const MAX_LIVE = 18;

const TOKENS = ["--accent", "--ok", "--warn", "--fail", "--ink-dim", "--surface", "--ink"] as const;

interface Badge {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  bg: string;
  fg: string;
  born: number;
}

const badgeH = FONT_PX + PAD_Y * 2 + 2;
const badgeW = (text: string) => Math.round(text.length * CHAR_W) + PAD_X * 2;

function overlaps(x: number, y: number, w: number, h: number, b: Badge) {
  return x < b.x + b.w + GAP && x + w + GAP > b.x && y < b.y + b.h + GAP && y + h + GAP > b.y;
}

/** Relative luminance, so text on a mid-tone chip stays readable. */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  if (h.length !== 6) return 0;
  const v = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}

export function BadgeTrail({ words }: { words: string[] }) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const tokens = useThemeTokens(TOKENS);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    if (!tokens || words.length === 0) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chips = ["--accent", "--ok", "--warn", "--fail", "--ink-dim"]
      .map((t) => tokens[t as (typeof TOKENS)[number]])
      .filter(Boolean);
    if (!chips.length) return;

    const light = tokens["--surface"];
    const dark = tokens["--ink"];

    const live: Badge[] = [];
    let seq = 0;
    let colourAt = 0;
    let bag: number[] = [];
    let lastWord = -1;
    let raf = 0;
    let hidden = document.hidden;

    let lastDropAt = 0;
    let lastX = 0;
    let lastY = 0;
    let seeded = false;

    // A shuffled bag rather than random picks, so every word appears before any
    // repeats — and never twice in a row across a bag boundary.
    const nextWord = () => {
      if (!bag.length) {
        bag = wordsRef.current.map((_, i) => i);
        for (let i = bag.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [bag[i], bag[j]] = [bag[j], bag[i]];
        }
        if (bag.length > 1 && bag[0] === lastWord) [bag[0], bag[1]] = [bag[1], bag[0]];
      }
      const i = bag.pop()!;
      lastWord = i;
      return wordsRef.current[i];
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || hidden) return;
      const now = performance.now();
      const { clientX: x, clientY: y } = e;

      if (!seeded) {
        seeded = true;
        lastX = x;
        lastY = y;
        return;
      }

      const travelled = Math.hypot(x - lastX, y - lastY);
      if (now - lastDropAt < DROP_MS || travelled < MIN_TRAVEL) return;

      const text = nextWord();
      const w = badgeW(text);
      const h = badgeH;
      const bx = x - w / 2;
      const by = y - h / 2;

      // Hard non-overlap: skip the drop entirely rather than nudging it, so
      // the trail thins out where it doubles back on itself.
      if (live.some((b) => overlaps(bx, by, w, h, b))) return;
      if (bx < 0 || by < 0 || bx + w > window.innerWidth || by + h > window.innerHeight) return;

      const bg = chips[colourAt % chips.length];
      colourAt += 1;

      live.push({
        id: seq++,
        x: bx,
        y: by,
        w,
        h,
        text,
        bg,
        fg: luminance(bg) > 0.45 ? dark : light,
        born: now,
      });
      if (live.length > MAX_LIVE) live.shift();

      lastDropAt = now;
      lastX = x;
      lastY = y;
    };

    const tick = () => {
      const now = performance.now();
      for (let i = live.length - 1; i >= 0; i--) {
        if (now - live[i].born > LIFE_MS) live.splice(i, 1);
      }
      setBadges(live.slice());
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      hidden = document.hidden;
      if (hidden) {
        live.length = 0;
        setBadges([]);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [tokens, words.length]);

  if (!badges.length) return null;

  const now = performance.now();

  return (
    <div className={styles.layer} aria-hidden="true">
      {badges.map((b) => {
        const age = now - b.born;
        const appearing = Math.min(1, age / APPEAR_MS);
        const fading = age > APPEAR_MS + HOLD_MS ? (age - APPEAR_MS - HOLD_MS) / FADE_MS : 0;
        const opacity = Math.max(0, appearing - fading);
        const scale = 0.86 + 0.14 * appearing;

        return (
          <span
            key={b.id}
            className={styles.badge}
            style={{
              left: b.x,
              top: b.y,
              background: b.bg,
              color: b.fg,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            {b.text}
          </span>
        );
      })}
    </div>
  );
}
