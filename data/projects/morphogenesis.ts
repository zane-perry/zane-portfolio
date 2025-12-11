import { ProjectDetail } from "./types";

export const morphogenesis: ProjectDetail = {
  overview:
    "This project compares two paradigms of biological pattern formation: reaction–diffusion systems (Brusselator) and phase-separation models (Ohta–Kawasaki extension of Cahn–Hilliard). Despite distinct physical origins—chemical reactions vs. free-energy-driven segregation—both exhibit structurally similar early-time dynamics. We derive each model, analyze linear stability and dispersion relations, implement numerical simulations, and reduce dynamics near onset to reveal a shared universal amplitude equation.",
  sections: [
    {
      title: "Collaborators & Context",
      paragraphs: [
        "Collaborators: Zane Perry & Ethan Coleman",
        "University of Colorado Boulder — Applied Mathematics & Chemical/Biological Engineering",
      ],
    },
    {
      title: "Motivation",
      paragraphs: [
        "Biological morphogenesis produces repeating structures such as stripes, spots, and labyrinths. Both reaction–diffusion and phase-separation models generate visually similar patterns, raising the question: Are these systems fundamentally connected or only superficially similar? We address this by deriving each from first principles, comparing linearized behavior, and analyzing reduced dynamics near instability onset.",
      ],
    },
    {
      title: "Model Development",
      bullets: [
        "Reaction–Diffusion (Brusselator): Derived from conservation laws, flux expressions, and mass-action kinetics; two interacting morphogens destabilize via diffusion.",
        "Phase Separation (Ohta–Kawasaki): From a free-energy functional with local double-well, interfacial energy, and nonlocal repulsion; yields conserved phase separation and stable microstructures.",
      ],
    },
    {
      title: "Linear Stability & Dispersion",
      paragraphs: [
        "We expand perturbations into Fourier modes to study dispersion relations and identify unstable bands of spatial frequencies.",
      ],
      bullets: [
        "Both systems possess a finite band of unstable spatial frequencies, selecting characteristic wavelengths at onset.",
        "Brusselator: temporal and spatial instabilities; Ohta–Kawasaki: purely spatial with globally stable well-mixed limit.",
        "With parameter mapping, unstable wavelength ranges coincide, matching characteristic scales at onset.",
      ],
    },
    {
      title: "Numerical Simulations",
      paragraphs: [
        "We implemented both systems and ran grid searches across parameter ranges to generate pattern families.",
      ],
      bullets: [
        "Mapped systems share similar length scales, verifying theoretical wavelength matching.",
        "Brusselator: stripes, labyrinths, spot mixtures.",
        "Ohta–Kawasaki: predominantly hexagonal/spot-like structures under the same mapped parameters.",
        "Nonlinear mechanisms shape final pattern selection beyond linear instability.",
      ],
    },
    {
      title: "Amplitude Equation Analysis",
      paragraphs: [
        "Near instability onset, both reduce to the Newell–Whitehead–Segel amplitude equation, undergoing a supercritical pitchfork bifurcation from uniform to periodic structures.",
        "Despite different physical origins, early-time envelope dynamics are mathematically identical, explaining similar initial stripe patterns and divergent long-term behavior.",
      ],
    },
    {
      title: "Key Contributions",
      bullets: [
        "Derived both models from first principles, linking conservation laws, free energy, and nonlinear kinetics.",
        "Performed full linear stability analysis and matched wavelength selection across frameworks.",
        "Developed parameter mapping tying dispersion relations together.",
        "Validated predictions via large-scale numerical simulations.",
        "Demonstrated equivalence near onset through amplitude-equation reduction.",
        "Explained divergence in pattern types via nonlinear effects.",
      ],
    },
    {
      title: "Outcome & Significance",
      paragraphs: [
        "Different mechanisms can produce indistinguishable early patterns; matching pattern length scales does not uniquely identify the underlying mechanism.",
        "Reaction–diffusion and phase separation belong to a broader family of universal pattern-forming instabilities, suggesting nature may leverage overlapping mechanisms to generate similar visual outcomes.",
      ],
    },
  ],
  links: [
    { label: "Dynamics of Morphogenesis (PDF)", href: "/Morphogenesis/Dynamics%20of%20Morphogensis.pdf" },
    { label: "Project Slides (PDF)", href: "/Morphogenesis/MorphogenesisProject.pdf" },
  ],
};
