"use client";

import { useEffect, type RefObject } from "react";

export interface CanvasEngine {
  start(): void;
  stop(): void;
  resize(): void;
  renderStatic(): void;
  destroy(): void;
}

/**
 * Shared lifecycle for every canvas effect on the site.
 *
 * A rAF loop that keeps running while its canvas is scrolled away, or while the
 * tab is in the background, is pure battery burn — so the loop is gated on
 * visibility from both directions, and on the user's motion preference.
 *
 * `create` is called once on mount. It returns the engine, or null if the
 * effect cannot run (no context, unsupported browser), in which case nothing
 * else happens and the host element is simply left empty.
 */
export function useEngineLifecycle(
  ref: RefObject<HTMLElement | null>,
  create: () => CanvasEngine | null,
  ready: boolean,
) {
  useEffect(() => {
    if (!ready) return;
    const host = ref.current;
    if (!host) return;

    let engine: CanvasEngine | null = null;
    try {
      engine = create();
    } catch {
      engine = null;
    }
    if (!engine) return;
    const live = engine;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let onScreen = true;
    let hidden = document.hidden;

    // Under reduced motion the effect still renders — it just holds one frame,
    // so the page keeps its composition instead of showing a hole.
    //
    // The preference is watched rather than read once: a visitor who turns
    // motion off while the page is open should have the loop stop there and
    // then, not on the next navigation.
    const sync = () => {
      if (reduced.matches) {
        live.stop();
        live.renderStatic();
        return;
      }
      if (onScreen && !hidden) live.start();
      else live.stop();
    };

    const ro = new ResizeObserver(() => live.resize());
    ro.observe(host);

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0]?.isIntersecting ?? true;
      sync();
    });
    io.observe(host);

    const onVisibility = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", sync);

    sync();

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", sync);
      live.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
}
