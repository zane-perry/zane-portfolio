"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { StepWaveRenderer, type WaveRendererOptions } from "@/components/wave/StepWaveRenderer";
import { useRaf } from "@/components/wave/hooks/useRaf";
import { useScrollRef } from "@/components/wave/hooks/useScrollRef";
import { useMouseRef } from "@/components/wave/hooks/useMouseRef";
import { useFade } from "@/components/FadeProvider";
// pathname not required anymore; keep the component mounted across navigations

export type DigitalWaveBackgroundProps = Partial<Pick<
  WaveRendererOptions,
  "bands" | "bandSpacing" | "bandTopOffset" | "bandBottomOffset" | "layers" | "baseSpeed" | "amplitude" | "frequency" | "opacity" | "quantLevels" | "lineWidth" | "mouseStrength" | "scrollStrength" | "mouseRadius" | "mouseBump" | "renderMode"
>> & {
  className?: string;
  scrollFade?: boolean; // optional fade-out while scrolling
};

// A lightweight background overlay with a subtle digital waveform.
// Stacks using absolute positioning; pointer-events disabled.
export default function DigitalWaveBackground(props: DigitalWaveBackgroundProps) {
  const {
    bands = 5,
    bandSpacing = 300, // px between band centers; determines band count based on container height
    bandTopOffset = 115, // space from top before first band
    bandBottomOffset = 100, // space from bottom after last band
    layers = 3,
    baseSpeed = 20, // px/sec drift (subtle)
    amplitude = 12, // px
    frequency = 8.0, // cycles per viewport width
    opacity = 0.1,
    quantLevels = 12,
    lineWidth = 2,
    mouseStrength = 1.0,
    scrollStrength = 10.0,
    mouseRadius = 120,
    mouseBump = 0.05,
    scrollFade = false,
    className = "",
    renderMode = "smooth"
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<StepWaveRenderer | null>(null);
  const lastSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const lastStableRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const scrollRef = useScrollRef();
  const { xRef: mouseX, yRef: mouseY } = useMouseRef();
  // read fade state if provider is present; guard if not
  let fadeCtx: { isFadingOut: boolean; isNavigating?: boolean } | null = null;
  try { fadeCtx = useFade(); } catch { fadeCtx = null; }
  const isFadingOut = !!(fadeCtx && fadeCtx.isFadingOut);
  // keep component mounted across navigations to avoid fade reset

  // Control background fade to match content: fade-out on navigate, fade-in after.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const restartWaveFadeIn = () => {
      el.classList.remove('fade-out');
      // Restart wave fade-in animation by toggling the class
      el.classList.remove('wave-fade');
      // force reflow so the animation restarts
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      void el.offsetHeight;
      el.classList.add('wave-fade');
    };
    if (isFadingOut) {
      // fade out in sync with content
      el.classList.remove('wave-fade');
      el.classList.add('fade-out');
    } else {
      // navigation finished: fade back in like initial load
      // re-randomize band tilt so the pattern feels fresh each navigation
      if (rendererRef.current && typeof (rendererRef.current as any).reseedTilt === 'function') {
        (rendererRef.current as any).reseedTilt();
      }
      restartWaveFadeIn();
    }
  }, [isFadingOut]);

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Resolve theme colors from CSS variables set in globals.css
  const colors = useMemo(() => {
    if (typeof window === 'undefined') {
      return { a: '#14b8a6', b: '#8b5cf6' }; // fallback to site defaults (still within site palette)
    }
    const root = getComputedStyle(document.documentElement);
    const g1 = root.getPropertyValue('--g1').trim() || '#14b8a6';
    const g2 = root.getPropertyValue('--g2').trim() || '#8b5cf6';
    return { a: g1, b: g2 };
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current) return;
      // During fade-out, ignore resizes to keep waves static
      if (isFadingOut) return;
      // sync cached size on explicit resizes
      const el = containerRef.current || canvasRef.current;
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      lastStableRef.current = { w, h };
      lastSizeRef.current = { w, h };
      rendererRef.current.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFadingOut]);

  // Initialize renderer once
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const opts: WaveRendererOptions = {
      bands,
      bandSpacing,
      bandTopOffset,
  bandBottomOffset,
      layers,
      baseSpeed,
      amplitude,
      frequency,
      opacity,
      quantLevels,
      lineWidth,
      colorA: colors.a,
      colorB: colors.b,
      mouseStrength,
      scrollStrength,
      mouseRadius,
      mouseBump,
      reducedMotion,
      renderMode
    };
    const renderer = new StepWaveRenderer(canvas, opts);
    rendererRef.current = renderer;
    return () => {
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bands, bandSpacing, bandTopOffset, bandBottomOffset, layers, baseSpeed, amplitude, frequency, opacity, quantLevels, lineWidth, colors.a, colors.b, mouseStrength, scrollStrength, mouseRadius, mouseBump, reducedMotion]);

  // Drive the draw loop
  useRaf((t) => {
    const r = rendererRef.current;
    const c = canvasRef.current;
    if (!r || !c) return;
    const rect = c.getBoundingClientRect();
    // Clamp to last known non-trivial size to avoid transient 0x0 during transitions
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    // Update last stable size only when not fading and the size hasn't collapsed dramatically
    const collapsed = h < 32 || w < 32;
    if (!isFadingOut && !collapsed) {
      lastSizeRef.current = { w, h };
      lastStableRef.current = { w, h };
    }
    const vw = (lastSizeRef.current.w || w);
    const vh = (lastSizeRef.current.h || h);
    r.drawFrame(t, {
      scrollY: scrollRef.current,
      mouseX: mouseX.current,
      mouseY: mouseY.current,
      viewportW: vw,
      viewportH: vh,
    });
    if (scrollFade && containerRef.current) {
      // subtle opacity drop with scroll (down to ~0.8)
      const y = scrollRef.current;
      const maxDrop = 0.2;
      const factor = Math.max(0, Math.min(1, y / 1200));
      const opacityMul = 1 - maxDrop * factor;
      containerRef.current.style.opacity = String(opacityMul);
    }
  }, true);

  // Ensure the canvas initially sizes correctly when mounting
  useEffect(() => {
    if (rendererRef.current) rendererRef.current.resize();
  }, []);

  // ResizeObserver: handle container size changes during client navigation
  useEffect(() => {
    const el = containerRef.current;
    const r = rendererRef.current;
    if (!el || !r || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      if (isFadingOut) return; // freeze during fade
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const collapsed = h < 32 || w < 32;
      if (!collapsed) {
        lastStableRef.current = { w, h };
        r.resize();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isFadingOut]);

  // After navigation completes / fade-out ends, force a re-measure and resize so band count matches the new page height
  useEffect(() => {
    if (isFadingOut) return;
    const el = containerRef.current || canvasRef.current;
    const r = rendererRef.current;
    if (!el || !r) return;
    const rect = el.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    lastStableRef.current = { w, h };
    lastSizeRef.current = { w, h };
    r.resize();
  }, [isFadingOut]);

  return (
    <div
      ref={containerRef}
      className={[
        "wave-fade",
        "pointer-events-none absolute inset-0 overflow-hidden",
        // z-0 by default; ensure parent provides stacking context
        className
      ].join(' ')}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
