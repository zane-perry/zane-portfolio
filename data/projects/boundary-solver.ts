import type { ProjectDetail } from "./types.ts";

export const boundarySolver: ProjectDetail = {
  overview: `An implementation of boundary integral methods to solve elliptic boundary value
problems. Focus on quadrature accuracy, conditioning, and efficient evaluation of near‑singular
integrals.`,
  sections: [
    {
      title: "Techniques",
      bullets: [
        "Adaptive panel quadrature",
        "Near‑singular integral regularization",
        "Conditioning analysis and solver choices"
      ]
    }
  ],
  artifacts: [
    "Report with derivations",
    "NumPy prototype and benchmark plots"
  ]
};
