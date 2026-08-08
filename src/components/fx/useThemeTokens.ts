"use client";

import { useEffect, useState } from "react";

/**
 * Resolves design tokens to concrete values and re-resolves them whenever the
 * theme flips.
 *
 * Canvas and WebGL cannot read CSS variables — they need real colours. Passing
 * hardcoded hex into an effect would leave it stuck in one theme while the rest
 * of the page repaints, so every effect pulls its palette through here instead.
 *
 * Returns `null` until mounted, which is also the signal that the effect must
 * not start yet: reading getComputedStyle during SSR is impossible, and starting
 * on fallback colours would flash the wrong palette on first paint.
 */
export function useThemeTokens<T extends string>(names: readonly T[]): Record<T, string> | null {
  const [tokens, setTokens] = useState<Record<T, string> | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const read = () => {
      const style = getComputedStyle(root);
      const next = {} as Record<T, string>;
      for (const name of names) next[name] = style.getPropertyValue(name).trim();
      setTokens((prev) => {
        if (prev && names.every((n) => prev[n] === next[n])) return prev;
        return next;
      });
    };

    read();

    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
    // `names` is a static literal at every call site; spreading it keeps the
    // dependency list stable without forcing callers to memoise.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...names]);

  return tokens;
}
