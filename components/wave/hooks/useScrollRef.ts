import { useEffect, useRef } from "react";

// Tracks window.scrollY in a ref to avoid re-renders. Returns the ref.
export function useScrollRef() {
  const ref = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          ref.current = window.scrollY || 0;
          ticking.current = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return ref;
}
