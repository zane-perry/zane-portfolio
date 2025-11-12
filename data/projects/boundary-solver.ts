import type { ProjectDetail } from "./types.ts";

export const boundarySolver: ProjectDetail = {
  overview: `A numerically stable and highly accurate framework for solving boundary value problems by reformulating them as boundary integral equations rather than relying on mesh-based finite difference or finite element discretizations. By converting differential operators into integral operators using Green's functions and fundamental solutions, the method confines numerical error to integration and obtains superior conditioning and accuracy, even on irregular geometries.`,
  sections: [
    {
      title: "Motivation & Background",
      paragraphs: [
        `Conventional solvers discretize the domain which introduces global error propagation and
can lead to poorly conditioned linear systems. The boundary integral formulation reduces
problem dimensionality, confines numerical error to the integration step, and leverages
analytical Green's functions to convert derivatives into convolution-like integrals. This
approach yields greater numerical stability and handles complex boundaries without mesh
generation.`
      ]
    },
    {
      title: "Core Methodology",
      paragraphs: [
        `The project implements integral-based solvers in one and two dimensions. For 1D boundary
value problems we derive integral operator representations and evaluate them numerically
using trapezoidal and Gaussian–Legendre quadrature. For 2D problems (e.g., Laplace's
equation) we employ fundamental solutions and double-layer potentials to reduce PDEs to
boundary integrals. The discretization focuses on accurate quadrature, regularization of
near-singular kernels, and careful assembly of dense linear systems.`
      ],
      bullets: [
        `1D boundary integral formulations with trapezoidal and Gaussian–Legendre quadrature`,
        `2D extensions using fundamental solutions and double-layer potentials`,
        `Strategies for near-singular integrals and adaptive panel quadrature`,
        `Dense-system assembly with attention to conditioning and numerical stability`
      ]
    },
    {
      title: "Implementation",
      paragraphs: [
        `A Python codebase was developed using NumPy, SciPy, and Matplotlib. Modules include
Green's function computation, quadrature node and weight management, boundary
parameterizations (circles, clover-like shapes, asymmetric blobs), dense linear system
assembly, and visualization tools for error distributions and convergence behavior. The
implementation is modular to permit swapping quadrature schemes or linear solvers.`
      ]
    },
    {
      title: "Results",
      paragraphs: [
        `One-dimensional tests produced near-machine precision under both homogeneous and
non-homogeneous boundary conditions. Two-dimensional experiments on irregular boundaries
demonstrated stable solutions where mesh-based methods struggle. Double-layer potential
formulations yielded well-conditioned systems and rapid convergence relative to naive
discretizations.`
      ]
    },
    {
      title: "Key Contributions",
      bullets: [
        `A general-purpose solver framework based on boundary integral equations for ODEs and PDEs`,
        `Demonstrated the numerical advantages of integration-based formulations over derivative-based methods`,
        `A modular Python implementation suitable for research and scientific computing`,
        `Empirical validation on complex geometries showing improved stability and accuracy`
      ]
    },
    {
      title: "Applications & Extensions",
      paragraphs: [
        `The framework naturally extends to Helmholtz and Poisson problems, Neumann or mixed
boundary conditions, adaptive quadrature, fast multipole acceleration, and iterative
solvers for larger systems. These extensions make the approach suitable for both research
and large-scale scientific computing applications.`
      ]
    },
    {
      title: "Outcome",
      paragraphs: [
        `By reformulating boundary value problems as integrals, this project achieves exceptional
accuracy and numerical stability. The results indicate boundary integral methods are a
robust alternative to mesh-based discretizations for many boundary-driven physical systems.`
      ]
    }
  ],
  artifacts: [
    "Presentation (public/Boundary)",
    "Technical report (public/Boundary)",
    "NumPy prototype and visualization scripts"
  ],
  links: [
    { label: "Presentation — Numerical Diff EQ Final Project (View / Download)", href: "/Boundary/Numerical%20Diff%20EQ%20Final%20Project.pdf" },
    { label: "Report — Boundary Report (View / Download)", href: "/Boundary/Boundary%20Report.pdf" },
    { label: "GitHub — Boundary-Value-ODE-PDE-Solver", href: "https://github.com/zane-perry/Boundary-Value-ODE-PDE-Solver" }
  ]
};

