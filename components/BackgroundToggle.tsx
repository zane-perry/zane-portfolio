"use client";
import React from "react";
import { useBackgroundEffects } from "./BackgroundEffectsProvider";

export default function BackgroundToggle() {
  const { enabled, toggle } = useBackgroundEffects();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        aria-pressed={!enabled}
        onClick={toggle}
        className="flex items-center gap-3 bg-white/6 backdrop-blur-sm rounded-full px-3 py-2 shadow-md hover:bg-white/8 transition-colors"
        title={enabled ? 'Disable background effects' : 'Enable background effects'}
      >
        <span className="sr-only">Toggle background effects</span>
        <div className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors ${enabled ? 'bg-teal-500' : 'bg-gray-400'}`}>
          <div
            className={`bg-white rounded-full w-4 h-4 transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </div>
        <span className="text-xs text-black">Effects</span>
      </button>
    </div>
  );
}
