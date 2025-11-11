import { useEffect, useRef } from "react";

// Tracks mouse position (pageX/pageY) in refs without triggering re-renders.
export function useMouseRef() {
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          xRef.current = e.pageX;
          yRef.current = e.pageY;
          ticking.current = false;
        });
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return { xRef, yRef };
}
