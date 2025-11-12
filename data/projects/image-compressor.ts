import type { ProjectDetail } from "./types.ts";

export const imageCompressor: ProjectDetail = {
  overview: `A MATLAB-based investigation comparing wavelet (Haar) compression with Singular Value Decomposition (SVD) based low-rank approximations for image compression and reconstruction. The project evaluates sparsity, storage efficiency, and perceptual fidelity to understand how orthogonal transforms and matrix factorizations translate into practical image compression techniques.`,
  sections: [
    {
      title: "Motivation & Background",
      paragraphs: [
        `Image compression aims to minimize file size while preserving visual quality. Fourier-based
methods (e.g., JPEG) work well for smooth, periodic content but can blur edges. Wavelet
transforms provide localized, hierarchical representations that preserve edges and structure,
making them well-suited for image compression. This project compares the Haar wavelet to SVD
based low-rank approximations to quantify trade-offs in sparsity and reconstruction quality.`
      ]
    },
    {
      title: "Core Methodology",
      paragraphs: [
        `Two complementary compression strategies were implemented and compared:`
      ],
      bullets: [
        `Wavelet (Haar) compression: multi-level decomposition (rows/columns), coefficient thresholding, and sparse reconstruction`,
        `SVD compression: compute low-rank approximation by truncating small singular values and reconstructing from factor matrices`
      ]
    },
    {
      title: "Implementation",
      paragraphs: [
        `All algorithms were implemented in MATLAB. The Haar basis and forward/inverse wavelet
transforms were coded as reusable functions; thresholding strategies were applied to produce
highly sparse coefficient matrices. For SVD, images were factorized and reconstructed using
rank-k approximations across color channels. Experiments tested grayscale and RGB images
and evaluated PSNR, visual fidelity, and sparsity (fraction of near-zero entries).`
      ]
    },
    {
      title: "Results",
      paragraphs: [
        `Wavelet compression produced dramatically higher sparsity (up to ~99% zeros) while
preserving perceptual quality, particularly for images with edges and localized features.
SVD-based compression required storing three factor matrices and generally produced far fewer
zero entries for comparable visual quality, making it less storage-efficient for natural
images. The Haar wavelet preserved edges better, while very aggressive thresholding introduced
blocky artifacts.`
      ]
    },
    {
      title: "Key Contributions",
      bullets: [
        `Implemented a complete image-compression framework comparing Haar wavelets and SVD`,
        `Quantified sparsity, PSNR, and storage trade-offs between wavelet and low-rank methods`,
        `Demonstrated that wavelet sparsity yields superior storage efficiency for image data`
      ]
    },
    {
      title: "Outcome",
      paragraphs: [
        `The study shows wavelet-based compression outperforms SVD for images in storage
efficiency and edge preservation, confirming that localized orthogonal transforms are more
appropriate for images than global low-rank decompositions. The project ties linear algebra
theory to practical image processing workflows and provides reusable MATLAB code for further
experimentation.`
      ]
    }
  ],
  artifacts: [
    "MATLAB code and helper functions",
    "Experimental notebooks and reconstructed images",
    "Analysis report"
  ],
  links: [
    { label: "Report — Linear Algebra Image Compression (View / Download)", href: "/LinAlg/Linear_Algebra_Final_Project.pdf" }
  ]
};

