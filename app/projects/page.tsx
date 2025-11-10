"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "AI Assisted Rapid Prototyper",
    role: "Capstone / Tooling",
    summary: "LLM-driven scaffolding tool for rapid prototyping of full-stack applications.",
    tags: ["LLM", "Full Stack", "Tooling"],
    status: "Prototype available"
  },
  {
    title: "Advanced Music Recommendation using Deep Learning",
    role: "Research / Project",
    summary: "Multi-modal deep learning recommender combining audio signal features and user data.",
    tags: ["PyTorch", "Recommenders", "DSP"],
    status: "Write-up coming"
  },
  {
    title: "Boundary Integral Equation ODE/PDE Solver",
    role: "Applied Math",
    summary: "Numerical quadrature and boundary integral methods for ODE/PDE problems.",
    tags: ["Numerical", "PDE", "Python"],
    status: "Code in progress"
  },
  {
    title: "Airfoil Fluid Simulation",
    role: "Simulation / CFD",
    summary: "Computational fluid dynamics simulations for airfoil design and analysis.",
    tags: ["CFD", "Simulation", "Fortran/Python"],
    status: "Demo available"
  },
  {
    title: "Signal Noise Reducer",
    role: "Signal Processing",
    summary: "Algorithms to denoise structured signals using spectral and ML-based filters.",
    tags: ["DSP", "Filtering", "ML"],
    status: "Examples available"
  },
  {
    title: "Travel Planning Guide",
    role: "Utility / Web App",
    summary: "A travel itinerary planner with route optimization and recommendations.",
    tags: ["React", "APIs", "Optimization"],
    status: "Prototype"
  },
  {
    title: "Image Compressor",
    role: "Tooling / Research",
    summary: "Perceptual image compression experiments combining signal transforms and learned codecs.",
    tags: ["Compression", "Perceptual", "Autoencoders"],
    status: "Research notes"
  },
  {
    title: "Minigit File Version Control",
    role: "Systems / Tools",
    summary: "Small-scale version control implementation demonstrating core VCS primitives.",
    tags: ["Git", "Systems", "Rust/Python"],
    status: "Educational"
  }
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tiltRaf = useRef<Record<string, number>>({});
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (active) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  function close() {
    if (!overlayRef.current) {
      setActive(null);
      return;
    }
    const card = cardRefs.current[active as string];
    if (!card) {
      setActive(null);
      return;
    }
    const cardRect = card.getBoundingClientRect();

    // animate overlay back to card position (viewport coordinates)
    overlayRef.current.style.transition = 'all 400ms cubic-bezier(.2,.9,.2,1)';
    overlayRef.current.style.left = `${cardRect.left}px`;
    overlayRef.current.style.top = `${cardRect.top}px`;
    overlayRef.current.style.width = `${cardRect.width}px`;
    overlayRef.current.style.height = `${cardRect.height}px`;
    overlayRef.current.style.borderRadius = window.getComputedStyle(card).borderRadius || '0.75rem';

    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setActive(null);
    }, 420);
  }

  function open(title: string) {
    const card = cardRefs.current[title];
    const container = containerRef.current;
    if (!card || !container) return;
    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const left = cardRect.left - containerRect.left;
    const top = cardRect.top - containerRect.top;

    setActive(title);

    // wait for overlay to be in DOM
    requestAnimationFrame(() => {
      if (!overlayRef.current) return;
      // initial position over the card (viewport coordinates)
      overlayRef.current.style.left = `${cardRect.left}px`;
      overlayRef.current.style.top = `${cardRect.top}px`;
      overlayRef.current.style.width = `${cardRect.width}px`;
      overlayRef.current.style.height = `${cardRect.height}px`;
      overlayRef.current.style.borderRadius = window.getComputedStyle(card).borderRadius || '0.75rem';

      // force layout then expand to a centered panel in the viewport
      requestAnimationFrame(() => {
        const maxWidth = Math.min(1000, window.innerWidth - 48);
        const maxHeight = Math.min(window.innerHeight - 120, window.innerHeight - 48);
        // center in the viewport (fixed overlay uses viewport coordinates)
        const targetLeft = (window.innerWidth - maxWidth) / 2;
        const targetTop = Math.max(24, (window.innerHeight - maxHeight) / 2);

        overlayRef.current!.style.transition = 'all 480ms cubic-bezier(.2,.9,.2,1)';
        overlayRef.current!.style.left = `${targetLeft}px`;
        overlayRef.current!.style.top = `${targetTop}px`;
        overlayRef.current!.style.width = `${maxWidth}px`;
        overlayRef.current!.style.height = `${maxHeight}px`;
        overlayRef.current!.style.borderRadius = '0.75rem';
      });
    });
  }

  // Pointer-based tilt: lightweight rAF updates to the card's transform
  function handlePointerMove(e: any, title: string) {
    // ignore touch
    if (e.pointerType === 'touch') return;
    const el = cardRefs.current[title];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    const rotateY = (px - 0.5) * 10; // ±5deg
    const rotateX = (0.5 - py) * 8; // ±4deg

    // schedule rAF per-card
    const prev = tiltRaf.current[title];
    if (prev) cancelAnimationFrame(prev);
    tiltRaf.current[title] = requestAnimationFrame(() => {
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  function handlePointerLeave(title: string) {
    const el = cardRefs.current[title];
    if (!el) return;
    const prev = tiltRaf.current[title];
    if (prev) cancelAnimationFrame(prev);
    tiltRaf.current[title] = requestAnimationFrame(() => {
      el.style.transform = '';
    });
  }

  // cleanup rAFs on unmount
  useEffect(() => {
    return () => {
      Object.values(tiltRaf.current).forEach((id) => { if (id) cancelAnimationFrame(id); });
    };
  }, []);

  return (
    <div className="section" ref={containerRef}>
      <h1 className="section-title">Projects</h1>
      <p className="section-subtitle">
        A small selection of technical and research projects. Click any card to
        expand it and see more details (the card will grow to cover the
        content).
      </p>

  <div className={`grid gap-4 md:grid-cols-2 ${active ? 'projects-faded' : ''}`}>
        {projects.map((project) => (
          <article
            key={project.title}
            ref={(el) => { cardRefs.current[project.title] = el as HTMLDivElement | null; }}
            className={`card flex flex-col cursor-pointer ${active ? 'card-dim' : ''}`}
            onClick={() => open(project.title)}
            onPointerMove={(e) => handlePointerMove(e, project.title)}
            onPointerLeave={() => handlePointerLeave(project.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') open(project.title);
            }}
          >
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{project.role}</p>
            <p className="mt-3 text-sm text-slate-700">{project.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">{project.status}</p>
          </article>
        ))}
      </div>

      {/* expanding overlay element that animates from card to full content area */}
      {active && (
        <div
          className="projects-overlay-container"
          aria-hidden={false}
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            // if click is outside the expanding overlay element, close it
            if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
              close();
            }
          }}
        >
          <div
            ref={overlayRef}
            className="expanding-overlay"
            style={{ left: 0, top: 0, width: 0, height: 0 }}
          >
            <div className="overlay-inner p-6 flex flex-col">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold">{active}</h2>
                <button
                  onClick={() => close()}
                  className="ml-4 rounded bg-slate-100 px-3 py-1 text-sm"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 overflow-auto">
                <p className="text-sm text-slate-700">
                  Expanded details for <strong>{active}</strong>. Add posters,
                  papers, images, code links, and extended descriptions here.
                </p>
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="font-semibold">Overview</h3>
                    <p className="text-sm text-slate-700">
                      Placeholder overview text describing the project, goals,
                      approaches, and results.
                    </p>
                  </div>

                  {/* visible divider between sections */}
                  <div role="separator" aria-orientation="horizontal" className="h-px w-full bg-slate-200" />

                  <div>
                    <h3 className="font-semibold">Artifacts</h3>
                    <ul className="list-disc list-inside text-sm text-slate-700">
                      <li>Poster (placeholder)</li>
                      <li>Code repository (placeholder)</li>
                      <li>Write-up / report (placeholder)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//1, 2, 4, 5, 7, 8, 9, 11, 12, 14