import type { ProjectDetail } from "./types.ts";

export const signalNoiseReducer: ProjectDetail = {
  overview: `Experiments with spectral thresholding, wavelet transforms, and learned
autoencoder baselines to denoise structured signals under mixed noise models. Evaluated by SNR
gain and perceptual quality.`,
  sections: [
    {
      title: "Techniques",
      bullets: [
        "Wavelet multi‑resolution filtering",
        "Low‑rank subspace projection",
        "Small convolutional autoencoder baseline"
      ]
    }
  ],
  artifacts: [
    "Poster with comparative plots",
    "Python scripts for transforms",
    "Report analyzing failure modes"
  ]
};
