"use client";
import React, { useEffect, useState } from "react";
import BackgroundEffectsProvider, { useBackgroundEffects } from "./BackgroundEffectsProvider";
import DigitalWaveBackground from "./DigitalWaveBackground";
import BackgroundToggle from "./BackgroundToggle";

function Inner() {
  const { enabled } = useBackgroundEffects();
  return (
    <>
      {enabled ? <DigitalWaveBackground className="z-0" /> : null}
      <BackgroundToggle />
    </>
  );
}

export default function BackgroundEffectsRoot() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Match Tailwind's md breakpoint (min-width: 768px)
    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(min-width: 768px)') : null;
    const update = () => setIsDesktop(mq ? mq.matches : true);
    update();
    if (mq && typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    return undefined;
  }, []);

  // Avoid rendering on mobile to disable effects entirely
  if (isDesktop === false) return null;

  // During SSR or before first paint, don't render to prevent mismatch flicker
  if (isDesktop === null) return null;

  return (
    <BackgroundEffectsProvider>
      <Inner />
    </BackgroundEffectsProvider>
  );
}
