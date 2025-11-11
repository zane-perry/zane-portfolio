/*
  StepWaveRenderer: draws a subtle, step-like digital waveform across the canvas.
  - Multiple vertical bands and layered parallax waves
  - Horizontal drift animation (phase advance)
  - Soft reactions to scroll (vertical offset, amplitude/opacity modulation)
  - Subtle mouse influence (localized amplitude bump)
  - GPU-friendly: one canvas, requestAnimationFrame-driven, no React re-renders
*/

export type WaveRendererOptions = {
  bands: number; // number of horizontal bands (fallback if bandSpacing not provided)
  bandSpacing?: number; // if provided, number of bands is derived from viewport height / spacing
  bandTopOffset?: number; // space before the first band (px)
  bandBottomOffset?: number; // space after the last band (px)
  layers: number; // number of layered waves for parallax
  baseSpeed: number; // px per second drift (converted to phase)
  amplitude: number; // base amplitude (px) for the primary layer
  frequency: number; // cycles per viewport width
  opacity: number; // base opacity (0..1)
  quantLevels: number; // number of vertical quantization steps
  lineWidth: number; // base line width in CSS pixels
  colorA: string; // primary stroke color
  colorB?: string; // secondary/alternate stroke color (for layers)
  mouseStrength?: number; // scales mouse influence (default 1)
  scrollStrength?: number; // scales scroll influence (default 1)
  mouseRadius?: number; // radius (px) for local mouse bump influence along X
  mouseBump?: number; // additive bump amount before quantization (0..1 typical)
  reducedMotion?: boolean;
};

export type WaveDynamicInputs = {
  scrollY: number; // window scrollY in px
  mouseX: number; // pageX
  mouseY: number; // pageY
  viewportW: number;
  viewportH: number;
};

export class StepWaveRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private dpr = 1;
  private opts: WaveRendererOptions;
  private phase = 0; // radians
  private lastT = 0; // ms

  constructor(canvas: HTMLCanvasElement, opts: WaveRendererOptions) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D context not available");
    this.canvas = canvas;
    this.ctx = ctx;
    this.opts = opts;
    this.configure();
  }

  configure(next?: Partial<WaveRendererOptions>) {
    if (next) this.opts = { ...this.opts, ...next };
    // apply DPR-aware sizing each configure
    this.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
  }

  resize() {
    this.configure();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw one animation frame.
   * now: DOMHighResTimeStamp (ms)
   */
  drawFrame(now: number, dyn: WaveDynamicInputs) {
    const { width: W, height: H } = this.canvas;
    const {
      bands,
      bandSpacing,
      bandTopOffset = 0,
  bandBottomOffset = 0,
      layers,
      baseSpeed,
      amplitude,
      frequency,
      opacity,
      quantLevels,
      lineWidth,
      colorA,
      colorB,
      mouseStrength = 1,
      scrollStrength = 1,
      mouseRadius = 140,
      mouseBump = 0.25,
      reducedMotion
    } = this.opts;

    const dt = this.lastT ? Math.min(64, now - this.lastT) : 16; // clamp delta to avoid big jumps
    this.lastT = now;

    // Update phase; convert baseSpeed px/sec into phase delta. One cycle == viewport width.
    // frequency is cycles per viewport width; moving one full width at baseSpeed triggers 2π advance.
    if (!reducedMotion) {
      const pxPerMs = baseSpeed / 1000; // px/ms
      const cyclesPerPx = frequency / (dyn.viewportW || 1);
      const phaseAdvance = 2 * Math.PI * cyclesPerPx * (pxPerMs * dt);
      this.phase += phaseAdvance;
    }

    this.clear();
    const ctx = this.ctx;
    ctx.save();
    ctx.scale(this.dpr, this.dpr); // draw in CSS pixel units

    // Scroll influence (very subtle)
  const scrollAmpMod = 1 + 0.2 * scrollStrength * Math.sin(dyn.scrollY * 0.002);
  const scrollYOffset = (dyn.scrollY * (0.06 * scrollStrength)) % (dyn.viewportH * 0.5); // gentle downward drift tied to scroll

  const usableH = Math.max(40, dyn.viewportH - bandTopOffset - bandBottomOffset);
  const effectiveBands = Math.max(1, bandSpacing ? Math.floor(usableH / Math.max(40, bandSpacing)) : bands);
  const bandsGap = bandSpacing ? bandSpacing : (usableH / effectiveBands);

    // Mouse influence: small localized amplitude bump near the cursor
    const mx = dyn.mouseX;
    const my = dyn.mouseY - (window.scrollY || 0); // convert to viewport Y
  const sigmaXGlobal = Math.max(20, mouseRadius);
  const sigmaYGlobal = Math.max(12, mouseRadius * 0.6);

    for (let layer = 0; layer < Math.max(1, layers); layer++) {
      const layerT = layer / Math.max(1, layers - 1);
      // Interpolate color between colorA and colorB (if provided) for layers
      const stroke = colorB
        ? mixColors(colorA, colorB, layerT)
        : colorA;

      ctx.strokeStyle = withAlpha(stroke, opacity * (0.9 - layerT * 0.5));
      ctx.lineWidth = Math.max(1, lineWidth * (1 - layerT * 0.2));

      // Slight parallax: different phase and speed per layer
      const layerPhase = this.phase * (0.6 + layerT * 0.8);
      const layerAmp = amplitude * (0.9 - layerT * 0.35) * scrollAmpMod;
      const layerFreq = frequency * (1 + layerT * 0.1);

      for (let b = 0; b < effectiveBands; b++) {
  const bandCenterY = bandTopOffset + (b + 0.5) * bandsGap + (reducedMotion ? 0 : scrollYOffset * (0.2 + b * 0.06));
        const dy = my - bandCenterY;
        const bandProx = Math.exp(-(dy * dy) / (2 * sigmaYGlobal * sigmaYGlobal));
        const amp = layerAmp * (1 + 0.25 * mouseStrength * bandProx);

        // subtle band-local glow responding to mouse proximity (vertical proximity based)
        ctx.shadowColor = stroke;
        ctx.shadowBlur = 8 * mouseStrength * bandProx;

        this.drawSteppedWave(ctx, {
          width: dyn.viewportW,
          height: dyn.viewportH,
          yCenter: bandCenterY,
          phase: layerPhase + b * 0.3,
          amplitude: amp,
          frequency: layerFreq,
          quantLevels,
          mouseX: mx,
          mouseY: my,
          mouseStrength,
          mouseRadius: sigmaXGlobal,
          mouseBump,
        });

        // reset per-band shadow to avoid leaking to next bands if influence small
        ctx.shadowBlur = 0;
      }
    }

    ctx.restore();
  }

  private drawSteppedWave(
    ctx: CanvasRenderingContext2D,
    args: {
      width: number;
      height: number;
      yCenter: number;
      phase: number; // radians
      amplitude: number; // px
      frequency: number; // cycles per viewport width
      quantLevels: number;
      mouseX: number;
      mouseY: number;
      mouseStrength: number;
      mouseRadius: number; // sigmaX
      mouseBump: number;
    }
  ) {
    const { width: W, yCenter, phase, amplitude, frequency, quantLevels, mouseX, mouseY, mouseStrength, mouseRadius, mouseBump } = args;

    // Choose a sample step that balances performance and fidelity
    const sampleStep = 8; // px between sample points in CSS pixels
    const samples = Math.max(4, Math.floor(W / sampleStep));

    // define quantization helper
    const q = (v: number) => Math.round(v * quantLevels) / quantLevels;

    // build path with horizontal segments and vertical steps
    ctx.beginPath();
    let prevY: number | null = null;
    let prevX = 0;
    const sigmaX = Math.max(16, mouseRadius);
    const sigmaY = Math.max(10, mouseRadius * 0.6);
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * W;
      const t = 2 * Math.PI * frequency * (x / W) + phase;
      // local bump based on proximity to mouse in canvas coordinates
      const dx = x - mouseX;
      const dy = yCenter - (mouseY - (window.scrollY || 0));
      const localInfluence = Math.exp(-(dx * dx) / (2 * sigmaX * sigmaX)) * Math.exp(-(dy * dy) / (2 * sigmaY * sigmaY));
      const base = Math.sin(t) + mouseBump * mouseStrength * localInfluence; // add before quantization
      const y = yCenter + q(base) * amplitude;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // draw horizontal segment from prevX to x at prevY
        if (prevY !== null) {
          ctx.lineTo(x, prevY);
          // if step to new y, draw vertical line
          if (y !== prevY) {
            ctx.lineTo(x, y);
          }
        }
      }
      prevY = y;
      prevX = x;
    }
    ctx.stroke();
  }
}

// Utilities
function withAlpha(hexOrRgb: string, alpha: number): string {
  // accept rgb(a) or hex; if rgb(a) provided, replace alpha; for hex, convert to rgba
  const a = Math.max(0, Math.min(1, alpha));
  if (hexOrRgb.startsWith("rgb")) {
    // parse existing rgb values
    const parts = hexOrRgb.replace(/rgba?\(/, "").replace(/\)/, "").split(",").map(s => s.trim());
    const [r, g, b] = parts;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  // hex like #rrggbb
  const { r, g, b } = hexToRgb(hexOrRgb);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function mixColors(c1: string, c2: string, t: number): string {
  const a = clamp01(t);
  const rgb1 = hexOrRgbToRgb(c1);
  const rgb2 = hexOrRgbToRgb(c2);
  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * a);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * a);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * a);
  return `rgb(${r}, ${g}, ${b})`;
}

function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.replace('#', '').trim();
  const value = m.length === 3
    ? m.split('').map(ch => ch + ch).join('')
    : m;
  const int = parseInt(value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return { r, g, b };
}

function hexOrRgbToRgb(input: string): { r: number; g: number; b: number } {
  if (input.startsWith('rgb')) {
    const parts = input.replace(/rgba?\(/, '').replace(/\)/, '').split(',').map(s => parseInt(s.trim(), 10));
    return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0 };
  }
  return hexToRgb(input);
}
