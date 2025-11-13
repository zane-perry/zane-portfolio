"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type FadeContextType = {
  navigate: (href: string) => void;
  isFadingOut: boolean;
  isNavigating: boolean;
};

const FadeContext = createContext<FadeContextType | undefined>(undefined);

export function useFade() {
  const ctx = useContext(FadeContext);
  if (!ctx) throw new Error('useFade must be used within FadeProvider');
  return ctx;
}

export default function FadeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // duration should match the CSS animation we add in globals.css (200ms)
  const FADE_OUT_MS = 200;

  const navigate = useCallback(async (href: string) => {
    // If already fading, ignore repeated requests
    if (isFadingOut) return;
    // Mark that a navigation cycle is in progress. This persists across
    // the route change so newly mounted pages can start hidden.
    setIsNavigating(true);
    // Scroll to top first (we want the fade to happen after scrolling).
    const canSmooth = typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const smoothScrollToTop = (timeoutMs = 900) => new Promise<void>((resolve) => {
      if (typeof window === 'undefined') { resolve(); return; }
      const start = performance.now();
      const check = () => {
        if (window.scrollY <= 2) { resolve(); return; }
        if (performance.now() - start > timeoutMs) { resolve(); return; }
        requestAnimationFrame(check);
      };
      try {
        window.scrollTo({ top: 0, left: 0, behavior: canSmooth ? 'smooth' : 'auto' });
      } catch (e) {
        // ignore scroll errors
        resolve();
        return;
      }
      requestAnimationFrame(check);
    });

    try {
      await smoothScrollToTop();
    } catch (e) {
      // continue even if scroll monitoring failed
    }

    // Insert a couple of animation frames to let layout & observers settle
    // after the scroll completes. This avoids a race where IntersectionObservers
    // or inline style updates applied during scrolling prevent the fade-out
    // CSS class from being applied visibly.
    if (typeof window !== 'undefined') {
      await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    }

    // Now start the fade-out and wait the configured duration before navigating.
    setIsFadingOut(true);
    setTimeout(() => {
      router.push(href);
      // End the fade-out state immediately after triggering navigation.
      setIsFadingOut(false);
      // Give the new route a tiny window to mount while kept hidden, then
      // release the navigation hold so it can animate in.
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsNavigating(false);
          });
        });
      } else {
        setIsNavigating(false);
      }
    }, FADE_OUT_MS);
  }, [isFadingOut, router]);

  return (
    <FadeContext.Provider value={{ navigate, isFadingOut, isNavigating }}>
      {children}
    </FadeContext.Provider>
  );
}
