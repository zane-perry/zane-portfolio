"use client";

import { useEffect, useRef } from "react";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = mq ? mq.matches : false;
    if (prefersReduced) {
      el.style.transform = "none";
      return;
    }

    let rafId = 0;
    let ticking = false;
    // factor < 1 -> moves slower than the page scroll (gives depth)
    const factor = 0.25;

    const update = () => {
      const scrollY = window.scrollY || 0;
      const y = -scrollY * factor; // move upward as user scrolls down
      if (el) el.style.transform = `translateY(${y}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once to seed initial position
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="parallax-container">
      <div className="hero-text">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          <span className="inline-block fade-in" style={{ animationDelay: "0.2s" }}>
            Zane
          </span>
          <span className="inline-block ml-3 fade-in" style={{ animationDelay: "0.8s" }}>
            Perry
          </span>
        </h1>

        <p className="mt-3 text-base sm:text-lg md:text-xl text-white/90 fade-in" style={{ animationDelay: "1.4s" }}>
          Applied Math · Machine Learning · Software
        </p>
      </div>
    </div>
  );
}
