import type { ProjectDetail } from "./types.ts";

export const signalNoiseReducer: ProjectDetail = {
  overview: `Investigation and implementation of rank-revealing factorizations (RRFs) — specifically rank-revealing QR (RRQRF) — as an efficient method to detect numerical rank and build low-rank approximations for signal denoising and reduced-order modeling. The project focuses on QR with column pivoting as a faster alternative to SVD for large matrices, and demonstrates an applied signal separation use-case inspired by music and speech enhancement.`,
  sections: [
    {
      title: "Motivation",
      paragraphs: [
        `Low-rank approximations are central to compressing data, removing noise, and
identifying dominant patterns. While the SVD is the gold standard for rank estimation, it
can be expensive on large datasets. Rank-revealing QR factorizations (RRQRF) approximate
rank structure with lower computation and good numerical stability, making them attractive
for large-scale signal processing tasks.`
      ]
    },
    {
      title: "Core Methodology",
      paragraphs: [
        `The project developed the theoretical and algorithmic foundations of RRQRF. We used QR
decomposition with column pivoting to prioritize informative columns and reveal numerical
rank through the structure of the R factor. The approach included variants of QR (Modified
Gram-Schmidt, Householder, Givens) and a pivoting strategy that orders columns by
conditioning and magnitude to expose a clear rank separation.`
      ],
      bullets: [
        `Theoretical analysis of rank-revealing properties of QR with column pivoting`,
        `Implementation of Modified Gram-Schmidt, Householder, and Givens QR variants`,
        `Column-pivoting heuristics to prioritize informative columns and enable truncation`
      ]
    },
    {
      title: "Signal Processing Application",
      paragraphs: [
        `As an applied extension, RRQRF was used to denoise signals by constructing Hankel
matrices from time-series windows, estimating the numerical rank of the Hankel matrix,
and performing a low-rank approximation. The clean signal estimate was reconstructed from
the rank-k Hankel approximation by anti-diagonal averaging. This pipeline follows subspace
denoising techniques but replaces the SVD with RRQRF to reduce computational cost.`
      ]
    },
    {
      title: "Experiments & Results",
      paragraphs: [
        `Synthetic experiments on sine waves corrupted with Gaussian noise showed that the
RRQRF-based pipeline recovered dominant frequencies and suppressed spurious components
effectively. On real speech recordings with added white noise, segment-wise RRQRF
reconstruction produced signals with significantly reduced high-frequency noise while
preserving vocal structure. Among QR variants, Householder QR with column pivoting
offered the best balance of stability and speed.`
      ]
    },
    {
      title: "Contributions",
      bullets: [
        `A full numerical framework for rank-revealing QR factorizations with pivoting`,
        `Empirical comparison of QR variants and pivoting strategies`,
        `Applied demonstration of RRQRF for signal denoising using Hankel-matrix reconstruction`,
        `Evidence that RRQRF can replace SVD in subspace-denoising tasks with lower cost`
      ]
    },
    {
      title: "Outcome & Future Work",
      paragraphs: [
        `The project showed RRQRF is a practical and scalable alternative to SVD for rank
estimation and low-rank reconstruction in many signal processing workflows. Future
extensions include adaptive rank selection, fast randomized QR variants, integration with
streaming data pipelines, and combining RRQRF with modern ML denoisers for hybrid systems.`
      ]
    }
  ],
  artifacts: [
    "Presentation (public/RankRevealing)",
    "Technical report (public/RankRevealing)",
    "Python scripts for Hankel construction and RRQRF"
  ],
  links: [
    { label: "Presentation — Rank Presentation (View / Download)", href: "/RankRevealing/Rank%20Presentation.pdf" },
    { label: "Report — Rank Report (View / Download)", href: "/RankRevealing/Rank%20Report.pdf" },
    { label: "GitHub — Rank-Revealing-Signal-Reducer", href: "https://github.com/zane-perry/Rank-Revealing-Signal-Reducer" }
  ]
};

