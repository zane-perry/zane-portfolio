"use client";
import React from "react";
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
  return (
    <BackgroundEffectsProvider>
      <Inner />
    </BackgroundEffectsProvider>
  );
}
