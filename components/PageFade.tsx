"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFade } from "@/components/FadeProvider";
import { usePathname } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

type Props = {
  children: React.ReactNode;
};

// Module-level flag that persists across component remounts in the client.
// It indicates whether the app has already hydrated once in this session.
let hasHydrated = false;

// PageFade keys the wrapper by pathname so it remounts on client-side
// navigations and retriggers CSS entry animations (like `.fade-in`). We only
// apply the shorter inline nav animation when the app has already hydrated
// once (i.e., on client navigations). On the very first page load/hydration
// we allow the global CSS `.fade-in` (longer duration) to run.
export default function PageFade({ children }: Props) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);

  // shorter delay/duration for route changes vs initial load
  const navDelay = "100ms";
  const navDuration = "800ms";

  // Determine at render time whether this is the very first client hydration
  // in this session. If `hasHydrated` is false, this is the initial load and
  // we should NOT override the global CSS animation. After mount we set the
  // flag so future remounts (navigations) will use the shorter animation.
  const isInitialSessionMount = !hasHydrated;

  useEffect(() => {
    hasHydrated = true;
    mountedRef.current = true;
  }, []);

  // On a full page load / first client hydration, ensure the viewport is at
  // the top of the page. This prevents browser scroll-restoration from
  // restoring to a previous position on hard reloads — user requested full
  // loads always start at the top.
  useEffect(() => {
    if (!isInitialSessionMount) return;
    if (typeof window === 'undefined') return;

    try {
      if ('scrollRestoration' in history) {
        // take manual control so the browser doesn't restore previous scroll
        // position on a full reload
        history.scrollRestoration = 'manual';
      }
    } catch (e) {
      // ignore in environments where history is restricted
    }

    // Immediately jump to top for a clean full-load start
    window.scrollTo({ top: 0, left: 0 });
  }, [isInitialSessionMount]);

  // If a fade provider is present, use its fade-out state to apply the
  // `.fade-out` class when navigating away. Provider may be absent during
  // server-side previews; guard against missing context.
  let fadeCtx: { isFadingOut: boolean; isNavigating: boolean } | null = null;
  try {
    fadeCtx = useFade();
  } catch (e) {
    fadeCtx = null;
  }

  // Only apply fade-out to components that were already mounted (leaving page).
  const isLeaving = !!(fadeCtx && fadeCtx.isFadingOut && mountedRef.current);

  // During client navigations, start with shorter fade-in timings.
  const inlineStyles: React.CSSProperties | undefined =
    isInitialSessionMount || isLeaving
      ? undefined
      : { animationDelay: navDelay, animationDuration: navDuration, animationPlayState: fadeCtx?.isNavigating ? 'paused' as const : undefined };

  // New pages should never render with fade-out; guard with isLeaving.
  const wrapperClass = `section ${isLeaving ? 'fade-out' : 'fade-in'}`;

  // Prevent parent collapse during fade-out to keep sibling absolute layers (e.g., background)
  // from flickering due to height going to zero.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const parent = el.parentElement; // this is the `.relative` container in layout
    if (!parent) return;
    if (fadeCtx && fadeCtx.isFadingOut) {
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        parent.style.minHeight = `${Math.floor(h)}px`;
      }
    } else {
      parent.style.minHeight = '';
    }
    return () => {
      // clear on unmount just in case
      if (parent) parent.style.minHeight = '';
    };
  }, [fadeCtx && fadeCtx.isFadingOut]);

  return (
    // key the element by pathname so it remounts on route change
    <div key={pathname} ref={wrapperRef} className={wrapperClass} style={inlineStyles}>
      {/* ScrollReveal will only affect content outside initial viewport and
          will use the same behavior on reloads and navigations */}
      <ScrollReveal containerRef={wrapperRef} />
      {children}
    </div>
  );
}
