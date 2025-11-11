import type { ProjectDetail } from "./types.ts";

export const imageCompressor: ProjectDetail = {
  overview: `Explores discrete wavelet decomposition and singular value decomposition to
achieve compact image representations while preserving perceptual fidelity. Benchmarked vs JPEG
for PSNR and compression ratio.`,
  sections: [
    {
      title: "Pipeline",
      bullets: [
        "Wavelet multi‑level decomposition",
        "Energy thresholding + rank selection",
        "Reconstruction quality evaluation"
      ]
    }
  ],
  artifacts: [
    "Experimental notebooks",
    "Report with compression ratios",
    "Sample reconstructed image set"
  ]
};
