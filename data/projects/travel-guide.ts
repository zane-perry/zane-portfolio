import type { ProjectDetail } from "./types.ts";

export const travelGuide: ProjectDetail = {
  overview: `A collaborative travel itinerary planner that aggregates points of interest,
optimizes day routes with simple heuristics, and produces shareable schedules.`,
  sections: [
    {
      title: "Features",
      bullets: [
        "Day planner with drag‑and‑drop ordering",
        "Distance/time estimation heuristics",
        "Export and collaborative editing"
      ]
    }
  ],
  artifacts: [
    "Source repository",
    "API collection",
    "Short demo walkthrough"
  ]
};
