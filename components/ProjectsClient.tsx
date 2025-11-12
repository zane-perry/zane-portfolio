"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projectDetailsMap } from "@/data/projects";
import FilePreview from "@/components/FilePreview";

const projects = [
  {
    title: "AI Assisted Rapid Prototyper",
    role: "Senior Capstone Project",
    summary:
      "LLM-driven scaffolding tool for rapid prototyping of full-stack applications.",
    tags: ["LLM", "Full Stack", "Group Project", "API", "Agile/Scrum"],
    status: "Poster, Presentation, Documentation available"
  },
  {
    title: "Advanced Music Recommendation using Deep Learning",
    role: "Research / Project",
    summary:
      "Multi-modal deep learning recommender combining audio signal features and user data.",
    tags: ["PyTorch", "Digital Signal Processing", "ML Design"],
    status: "Poster, Presentation, Report, Code available"
  },
  {
    title: "Boundary Integral Equation ODE/PDE Solver",
    role: "Applied Math",
    summary:
      "Numerical quadrature and boundary integral methods for ODE/PDE problems.",
    tags: ["Numerical", "PDE", "Python", "NumPy"],
    status: "Presentation, Report, Code available"
  },
  {
    title: "Signal Noise Reducer",
    role: "Signal Processing",
    summary:
      "Algorithms to denoise audio signals using rank-revealing linear algebra techniques.",
    tags: ["Digital Signal Processing", "Filtering", "Linear Algebra"],
    status: "Presentation, Report, Code available"
  },
  {
    title: "Airfoil Fluid Simulation",
    role: "Simulation / Real Data",
    summary:
      "Computational fluid dynamics simulations for airfoil design and analysis.",
    tags: ["CFD", "Simulation", "Matlab"],
    status: "Presentation, Report available"
  },
  {
    title: "Image Compressor",
    role: "Tooling / Research",
    summary:
      "Compression of images using discrete wavelet transforms and SVD techniques.",
    tags: ["Signal Processing", "Linear Algebra"],
    status: "Report available"
  },
  {
    title: "Travel Planning Guide",
    role: "Utility / Web App",
    summary:
      "A travel itinerary planner with ticket booking functionality, weather information, and an interactive calendar.",
    tags: ["Express", "APIs", "Group Project"],
    status: "Code available"
  },
  {
    title: "Minigit File Version Control",
    role: "Systems / Tools",
    summary:
      "Small-scale version control implementation demonstrating core VCS primitives.",
    tags: ["Git", "Data Structures", "C/C++"],
    status: "Code available"
  }
];

export default function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tiltRaf = useRef<Record<string, number>>({});
  const bodyOverflowRef = useRef<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (active) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    let root = document.getElementById("projects-portal") as HTMLDivElement | null;
    if (!root) {
      root = document.createElement("div");
      root.id = "projects-portal";
      document.body.appendChild(root);
    }
    setPortalRoot(root);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (active) {
      bodyOverflowRef.current = document.body.style.overflow || null;
      document.body.style.overflow = "hidden";
    } else {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    };
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

    overlayRef.current.style.transition = "all 400ms cubic-bezier(.2,.9,.2,1)";
    overlayRef.current.style.left = `${cardRect.left}px`;
    overlayRef.current.style.top = `${cardRect.top}px`;
    overlayRef.current.style.width = `${cardRect.width}px`;
    overlayRef.current.style.height = `${cardRect.height}px`;
    overlayRef.current.style.borderRadius = window.getComputedStyle(card).borderRadius || "0.75rem";

    setTimeout(() => {
      setActive(null);
    }, 420);
  }

  function open(title: string) {
    const card = cardRefs.current[title];
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    setActive(title);

    let tries = 0;
    function waitForOverlay() {
      tries += 1;
      if (overlayRef.current) {
        placeAndAnimate();
        return;
      }
      if (tries < 8) requestAnimationFrame(waitForOverlay);
    }
    requestAnimationFrame(waitForOverlay);

    function placeAndAnimate() {
      if (!overlayRef.current) return;
      overlayRef.current.style.transition = "none";
      overlayRef.current.style.left = `${cardRect.left}px`;
      overlayRef.current.style.top = `${cardRect.top}px`;
      overlayRef.current.style.width = `${cardRect.width}px`;
      overlayRef.current.style.height = `${cardRect.height}px`;
      overlayRef.current.style.borderRadius = window.getComputedStyle(card as Element).borderRadius || "0.75rem";
      overlayRef.current.style.opacity = "1";
      overlayRef.current.offsetWidth; // force layout
      requestAnimationFrame(() => {
        const maxWidth = Math.min(1000, window.innerWidth - 48);
        const maxHeight = Math.min(window.innerHeight - 120, window.innerHeight - 48);
        const targetLeft = (window.innerWidth - maxWidth) / 2;
        const targetTop = Math.max(24, (window.innerHeight - maxHeight) / 2);
        overlayRef.current!.style.transition = "";
        overlayRef.current!.style.left = `${targetLeft}px`;
        overlayRef.current!.style.top = `${targetTop}px`;
        overlayRef.current!.style.width = `${maxWidth}px`;
        overlayRef.current!.style.height = `${maxHeight}px`;
        overlayRef.current!.style.borderRadius = "0.75rem";
      });
    }
  }

  function handlePointerMove(e: any, title: string) {
    if (e.pointerType === "touch") return;
    const el = cardRefs.current[title];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 8;
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
      el.style.transform = "";
    });
  }

  useEffect(() => {
    return () => {
      Object.values(tiltRaf.current).forEach((id) => id && cancelAnimationFrame(id));
    };
  }, []);

  return (
    <div className="section" ref={containerRef}>
      <h1 className="section-title">Projects</h1>
      <p className="section-subtitle">
        A small selection of technical and research projects. Click any card to
        expand it and see more details.
      </p>
      <div className={`grid gap-4 md:grid-cols-2 ${active ? "projects-faded" : ""}`}>
        {projects.map((project) => (
          <article
            key={project.title}
            ref={(el) => {
              cardRefs.current[project.title] = el as HTMLDivElement | null;
            }}
            className={`card flex flex-col cursor-pointer ${active ? "card-dim" : ""}`}
            onClick={() => open(project.title)}
            onPointerMove={(e) => handlePointerMove(e, project.title)}
            onPointerLeave={() => handlePointerLeave(project.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") open(project.title);
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

      {active && portalRoot &&
        createPortal(
          <div
            className="projects-overlay-container"
            aria-hidden={false}
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => {
              if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
                close();
              }
            }}
          >
            <div ref={overlayRef} className="expanding-overlay">
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
                  {(() => {
                    const details = active ? projectDetailsMap[active] : undefined;
                    if (!details) {
                      return (
                        <div className="space-y-4">
                          <p className="text-sm text-slate-700">
                            Expanded details for <strong>{active}</strong>.
                          </p>
                          <div
                            role="separator"
                            aria-orientation="horizontal"
                            className="h-px w-full bg-slate-200"
                          />
                          <p className="text-sm text-slate-700">Content coming soon.</p>
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-6">
                        <section>
                          <h3 className="font-semibold">Overview</h3>
                          <p className="text-sm text-slate-700 whitespace-pre-line">{details.overview}</p>
                        </section>
                        {details.sections && details.sections.length > 0 && (
                          <>
                            <div
                              role="separator"
                              aria-orientation="horizontal"
                              className="h-px w-full bg-slate-200"
                            />
                            {details.sections.map((s, i) => (
                              <section key={i} className="space-y-2">
                                <h3 className="font-semibold">{s.title}</h3>
                                {s.paragraphs &&
                                  s.paragraphs.map((p, j) => (
                                    <p key={j} className="text-sm text-slate-700">
                                      {p}
                                    </p>
                                  ))}
                                {s.bullets && (
                                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                    {s.bullets.map((b, j) => (
                                      <li key={j}>{b}</li>
                                    ))}
                                  </ul>
                                )}
                              </section>
                            ))}
                          </>
                        )}
                        {details.links && details.links.length > 0 ? (
                          <>
                            <div
                              role="separator"
                              aria-orientation="horizontal"
                              className="h-px w-full bg-slate-200"
                            />
                            <section>
                              <h3 className="font-semibold">Artifacts</h3>
                              <div className="mt-3 flex flex-col gap-4">
                                {details.links.map((l, i) => (
                                  <FilePreview key={i} label={l.label} href={l.href} />
                                ))}
                              </div>
                            </section>
                          </>
                        ) : (
                          details.artifacts &&
                          details.artifacts.length > 0 && (
                            <>
                              <div
                                role="separator"
                                aria-orientation="horizontal"
                                className="h-px w-full bg-slate-200"
                              />
                              <section>
                                <h3 className="font-semibold">Artifacts</h3>
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                  {details.artifacts.map((a, i) => (
                                    <li key={i}>{a}</li>
                                  ))}
                                </ul>
                              </section>
                            </>
                          )
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>,
          portalRoot || document.body
        )}
    </div>
  );
}
