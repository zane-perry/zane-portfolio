"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type BackgroundEffectsContextType = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
};

const BackgroundEffectsContext = createContext<BackgroundEffectsContextType | undefined>(undefined);

export function useBackgroundEffects() {
  const ctx = useContext(BackgroundEffectsContext);
  if (!ctx) throw new Error('useBackgroundEffects must be used within BackgroundEffectsProvider');
  return ctx;
}

const STORAGE_KEY = 'bgEffectsEnabled';

export default function BackgroundEffectsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) setEnabled(raw === '1');
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    } catch (e) {
      // ignore
    }
  }, [enabled]);

  const toggle = () => setEnabled((s) => !s);

  return (
    <BackgroundEffectsContext.Provider value={{ enabled, setEnabled, toggle }}>
      {children}
    </BackgroundEffectsContext.Provider>
  );
}
