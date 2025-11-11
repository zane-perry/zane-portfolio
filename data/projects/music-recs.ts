import type { ProjectDetail } from "./types.ts";

export const musicRecs: ProjectDetail = {
  overview: `A multi‑modal recommender that fuses audio features and user context to rank
tracks. The PyTorch pipeline improves precision@K on hold‑out sessions and explores trade‑offs
between content‑based and collaborative signals.`,
  sections: [
    {
      title: "Approach",
      bullets: [
        "Mel‑spectrogram CNN for audio embeddings",
        "Sequence model to capture short‑term user intent",
        "Pairwise ranking objective with offline A/B evaluation"
      ]
    }
  ],
  artifacts: [
    "Poster and technical report",
    "Training notebooks and preprocessing scripts",
    "Dataset preparation notes"
  ]
};
