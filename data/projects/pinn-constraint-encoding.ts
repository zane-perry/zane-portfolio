import type { ProjectDetail } from "./types.ts";

export const pinnConstraintEncoding: ProjectDetail = {
  overview: `This independent research project studied how analytical PDE structure can be encoded directly into Physics-Informed Neural Networks (PINNs). Instead of treating PDE solving as generic regression, the work incorporated admissible traces, variational principles, entropy admissibility, and comparison-principle constraints into architectures and loss design. The result is a structure-aware neural PDE framework that improves both quantitative accuracy and qualitative consistency with PDE theory.`,
  sections: [
    {
      title: "Project Context",
      paragraphs: [
        `Independent Research Project — Applied Mathematics / Scientific Machine Learning`,
        `Author: Zane Perry`
      ]
    },
    {
      title: "Project Motivation",
      paragraphs: [
        `Many ML PDE surrogates depend on expensive simulation datasets and can violate governing equations, admissibility constraints, boundary conditions, or physically meaningful weak-solution structure. This project explored whether neural solvers can be built around analytical PDE structure rather than residual minimization alone.`
      ],
      bullets: [
        `Targeted correctness criteria: traces, entropy, variational consistency, comparison/max principles`,
        `Goal: mathematically meaningful neural function spaces, not only low residual error`
      ]
    },
    {
      title: "Core Research Questions",
      bullets: [
        `Parabolic PDEs: how to encode initial/boundary traces and comparison-principle behavior`,
        `Hyperbolic PDEs: how to enforce entropy admissibility and select physical weak solutions after shocks`,
        `Elliptic PDEs: how to enforce variational structure, admissible Sobolev constraints, and maximum-principle behavior`
      ]
    },
    {
      title: "Baseline PINN Framework",
      paragraphs: [
        `Implemented fully connected feedforward PINNs as differentiable trial functions, using automatic differentiation for strong-form residuals and soft-penalty constraints under standard collocation training.`
      ],
      bullets: [
        `Strong-form residual minimization baseline`,
        `Soft penalties for initial and boundary conditions`,
        `Weak-solution approximation and variational objectives in informed variants`
      ]
    },
    {
      title: "Parabolic PDE Experiments",
      paragraphs: [
        `Studied an advection-diffusion benchmark with known solution structure.`
      ],
      bullets: [
        `Constructed neural ansatzes enforcing traces exactly via architecture design`,
        `Added comparison-principle-inspired barrier constraints using sub/supersolution bounds`,
        `Reduced optimizer tradeoffs between residual and boundary objectives`,
        `Observed approximately two-order-of-magnitude error reduction vs. uninformed baseline`,
        `Achieved near machine-precision boundary enforcement and tiny barrier violations`
      ]
    },
    {
      title: "Hyperbolic PDE Experiments",
      paragraphs: [
        `Studied shock-forming Burgers' equation to analyze entropy-aware weak-solution selection.`
      ],
      bullets: [
        `Implemented entropy-informed admissibility losses`,
        `Penalized entropy violations to suppress nonphysical weak solutions`,
        `Localized error near shock trajectory and improved shock tracking`,
        `Eliminated spurious oscillatory overshoot and improved entropy consistency`
      ]
    },
    {
      title: "Elliptic PDE Experiments",
      paragraphs: [
        `Studied variable-coefficient coercive elliptic boundary-value problems with nontrivial Dirichlet data.`
      ],
      bullets: [
        `Built admissible trial spaces satisfying boundary traces identically`,
        `Used Ritz-type variational energy minimization instead of pure strong residuals`,
        `Added maximum/comparison-principle-inspired barrier constraints`,
        `Connected optimization to Sobolev-space and Euler-Lagrange structure`,
        `Achieved near-zero trace error and lower interior approximation error`
      ]
    },
    {
      title: "Broader Contributions",
      paragraphs: [
        `Beyond numerical gains, the project examined how PDE analysis should shape admissible neural function spaces in scientific ML. It unified deep learning with Sobolev-space theory, weak formulations, entropy conditions, variational methods, and computational PDE principles.`
      ],
      bullets: [
        `Computational investigation of constraint-aware PINN architectures`,
        `Theoretical study of equation-class-dependent correctness in neural PDE solving`
      ]
    },
    {
      title: "Technologies and Methods",
      bullets: [
        `Python, PyTorch, NumPy, SciPy, Matplotlib, LaTeX`,
        `Automatic differentiation, PINNs, variational neural methods`,
        `Weak formulations, Sobolev spaces, entropy conditions, Ritz methods`,
        `Scientific machine learning, computational PDEs, scientific computing`
      ]
    }
  ],
  links: [
    { label: "Presentation — PINN Presentation (View / Download)", href: "/PINN/PINN%20Presentation.pdf" },
    { label: "Report — PINN Report (View / Download)", href: "/PINN/PINN%20Report.pdf" },
    { label: "GitHub — pde-pinns", href: "https://github.com/zane-perry/pde-pinns" }
  ]
};
