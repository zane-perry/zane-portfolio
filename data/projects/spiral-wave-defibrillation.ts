import type { ProjectDetail } from "./types.ts";

export const spiralWaveDefibrillation: ProjectDetail = {
  overview: `This collaborative computational biology project investigated the formation, evolution, and control of spiral-wave dynamics in excitable media using a two-dimensional FitzHugh-Nagumo reaction-diffusion model. The work reproduced and extended low-energy topological defibrillation ideas, showing how contour-guided perturbations can eliminate spiral-wave-mediated arrhythmia with far lower shock burden than naive global stimulation. The project integrates numerical PDE simulation, reaction-diffusion modeling, computational topology, and parameter-space analysis in a biologically motivated framework.`,
  sections: [
    {
      title: "Project Context",
      paragraphs: [
        `Collaborative Computational Biology Research Project — University of Colorado Boulder`,
        `Collaborators: Anil Ambrosi, Zane Perry`
      ]
    },
    {
      title: "Motivation and Biological Background",
      paragraphs: [
        `Spiral waves in excitable tissue are strongly linked to dangerous cardiac arrhythmias such as fibrillation and tachycardia. Traditional defibrillation uses large global shocks that can be painful and tissue-damaging. This project explored a topological alternative where stimulation is applied along refractory-back contours to destabilize and remove the structures sustaining reentrant dynamics.`
      ]
    },
    {
      title: "Core Methodology",
      bullets: [
        `Implemented a modified FitzHugh-Nagumo reaction-diffusion model on a 2D domain for excitation and recovery dynamics`,
        `Developed an ADI solver: diffusion treated implicitly for stability, recovery terms treated explicitly to preserve fast-slow structure`,
        `Built reusable sparse/banded linear system components in SciPy for efficient long-time simulation`,
        `Applied zero-flux boundary conditions consistent with cardiac tissue modeling`,
        `Generated spirals via refractory-back stimulation and symmetry-breaking perturbations`,
        `Compared naive whole-domain shocks to targeted contour-based interventions using a normalized shock-burden metric`,
        `Implemented contour-guided topological teleportation to relocate/annihilate spiral singularities via boundary driving and opposite-chirality collisions`
      ]
    },
    {
      title: "Parameter-Space Exploration",
      paragraphs: [
        `We systematically varied tissue excitability, recovery dynamics, ion-channel feedback, diffusion speed, and recovery timescales.`
      ],
      bullets: [
        `Measured effects on spiral formation, wave thickness, propagation speed, and multispiral complexity`,
        `Tracked persistence of reentrant activity and success/failure of targeted defibrillation`
      ]
    },
    {
      title: "Results",
      bullets: [
        `Reproduced realistic spiral-wave dynamics and fibrillation-like multispiral states`,
        `Targeted contour stimulation removed reentrant patterns while directly stimulating less than 20% of tissue`,
        `Topological defibrillation achieved substantially lower normalized shock burden than naive global stimulation`,
        `Contour-guided interventions remained effective in irregular multispiral regimes`,
        `Identified parameter regimes where spirals form readily, collapse, transition to global oscillations, or resist control due to insufficient recovery`
      ]
    },
    {
      title: "Key Contributions",
      bullets: [
        `Built and optimized a full numerical reaction-diffusion simulation framework for excitable media`,
        `Reproduced and extended modern low-energy topological defibrillation mechanisms`,
        `Implemented contour-based spiral-wave teleportation and annihilation strategies`,
        `Linked tissue dynamical regime to controllability of reentrant activity via parameter studies`,
        `Bridged computational biology, nonlinear dynamics, topology, and numerical PDE analysis`
      ]
    },
    {
      title: "Technologies and Methods",
      bullets: [
        `Python, NumPy, SciPy, Matplotlib`,
        `Reaction-diffusion systems, FitzHugh-Nagumo models, ADI schemes`,
        `Finite-difference methods, sparse linear algebra, computational topology`,
        `Nonlinear dynamical systems, excitable-media modeling, scientific computing, LaTeX`
      ]
    }
  ],
  links: [
    { label: "Report — Spiral Waves Report (View / Download)", href: "/SpiralWaves/Spiral_Waves_Report.pdf" },
    { label: "GitHub — Spiral-Wave-Modeling", href: "https://github.com/zane-perry/Spiral-Wave-Modeling" }
  ]
};
