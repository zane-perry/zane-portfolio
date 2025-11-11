import type { ProjectDetail } from "./types.ts";

export const airfoilSim: ProjectDetail = {
  overview: `Computational fluid dynamics simulations around airfoils to study lift, drag,
and separation. Emphasizes grid resolution, boundary conditions, and numerical stability.`,
  sections: [
    {
      title: "Methods",
      bullets: [
        "Mesh refinement and convergence checks",
        "Comparison with experimental coefficients",
        "Visualization of pressure and velocity fields"
      ]
    }
  ],
  artifacts: [
    "Presentation deck",
    "MATLAB scripts and result plots"
  ]
};
