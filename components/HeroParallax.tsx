"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);

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

    // If we're on the homepage, after the hero text animations finish,
    // smoothly scroll the page down by the hero height so the content covers
    // the hero. Don't run if the user has already scrolled.
    const runAutoCover = () => {
      try {
        if (pathname !== "/") return;
        if (hasScrolledRef.current) return;
        if (!containerRef.current) return;
        // find fade-in children and compute their computed animation time
        const fades = Array.from(containerRef.current.querySelectorAll('.fade-in')) as HTMLElement[];
        let maxMs = 0;
        for (const f of fades) {
          const cs = window.getComputedStyle(f);
          const delay = parseFloat(cs.animationDelay || '0') || 0;
          const dur = parseFloat(cs.animationDuration || '0') || 0;
          // animationDelay/Duration may be in s; getComputedStyle returns '0.8s'
          const toMs = (s: string) => {
            if (s.endsWith('ms')) return parseFloat(s);
            if (s.endsWith('s')) return parseFloat(s) * 1000;
            return parseFloat(s) * 1000;
          };
          const dMs = toMs(cs.animationDelay || '0s') + toMs(cs.animationDuration || '0s');
          if (dMs > maxMs) maxMs = dMs;
        }
        // fallback if no fades found
        if (maxMs === 0) maxMs = 1200;

        // trigger earlier: start auto-scroll at ~40% of the longest animation
        // (but keep a small minimum so very-short animations still wait a bit)
        const earlyDelay = Math.max(80, Math.round(maxMs * 0.8));
        const timeout = window.setTimeout(() => {
          if (window.scrollY > 8) return; // user already scrolled
          const banner = document.querySelector('.hero-banner') as HTMLElement | null;
          const target = banner ? Math.round(banner.getBoundingClientRect().height) : window.innerHeight * 0.6;
          // perform smooth scroll to move the content up over the hero
          window.scrollTo({ top: target, behavior: 'smooth' });
          hasScrolledRef.current = true;
        }, earlyDelay);

        return () => clearTimeout(timeout);
      } catch (e) {
        // ignore errors
      }
    };

    const cleanupAuto = runAutoCover();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (cleanupAuto && typeof cleanupAuto === 'function') cleanupAuto();
    };
  }, [pathname]);

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
