import { useEffect, useRef } from "react";

// Provides a stable requestAnimationFrame loop calling the provided callback with high-resolution time.
export function useRaf(callback: (t: number) => void, enabled = true) {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const loop = (t: number) => {
      cbRef.current(t);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);
}
