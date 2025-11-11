"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type FadeContextType = {
  navigate: (href: string) => void;
  isFadingOut: boolean;
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

  // duration should match the CSS animation we add in globals.css (200ms)
  const FADE_OUT_MS = 200;

  const navigate = useCallback((href: string) => {
    // If already fading, ignore repeated requests
    if (isFadingOut) return;
    setIsFadingOut(true);
    // allow the fade-out to run, then perform navigation
    setTimeout(() => {
      // push the route (client navigation)
      router.push(href);
      // Clear fading flag immediately after navigation so the incoming
      // page doesn't briefly render with the `.fade-out` class and flicker.
      setIsFadingOut(false);
    }, FADE_OUT_MS);
  }, [isFadingOut, router]);

  return (
    <FadeContext.Provider value={{ navigate, isFadingOut }}>
      {children}
    </FadeContext.Provider>
  );
}
