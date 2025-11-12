import type { ProjectDetail } from "./types.ts";

export const airfoilSim: ProjectDetail = {
  overview: `This project applies complex analysis and potential flow theory to model air flow over airfoils using conformal mappings and the Joukowsky transformation. By combining analytic functions with computational visualization, the work demonstrates how harmonic and potential functions can represent aerodynamic behavior and produce lift estimates without resorting to full CFD simulations.`,
  sections: [
    {
      title: "Motivation & Background",
      paragraphs: [
        `Accurate modeling of flow around wings is central to aerodynamics, yet solving the
governing fluid equations for complex geometries is analytically intractable. This project
uses conformal mappings to transform simple analytic flows into airfoil-shaped geometries,
preserving essential physical properties (circulation, potential, and pressure distribution)
while avoiding mesh-based CFD. The work was completed as part of APPM4360 (Complex Analysis
Project).`
      ]
    },
    {
      title: "Project Focus",
      paragraphs: [
        `Under ideal fluid assumptions (steady, incompressible, irrotational, inviscid), the
governing equations reduce to Laplace's equation. We modeled elementary flows—uniform
flow, source/sink, doublet, and vortex—and combined them to represent flow around a
circular cylinder. Circulation was added to simulate lift, and the Joukowsky transform
mapped the cylinder flow to an airfoil shape. The Kutta condition was enforced to obtain a
physically consistent circulation and lift.`
      ],
      bullets: [
        `Ideal fluid assumptions → Laplace's equation`,
        `Elementary flows: uniform, source/sink, doublet, vortex`,
        `Superposition to form cylinder flow; add circulation to model lift`,
        `Joukowsky conformal mapping to transform cylinder → airfoil`,
        `Kutta condition to determine circulation and lift coefficient`
      ]
    },
    {
      title: "Computational Implementation",
      paragraphs: [
        `Implemented in MATLAB with scripts to compute complex potentials, apply conformal
mappings, and plot streamlines and pressure distributions. Simulations explored multiple
angles of attack, tracked stagnation points, and compared modeled lift coefficients with
experimental NACA airfoil data (e.g., 0012, 2215, 4412) to assess the approximation's
validity.`
      ]
    },
    {
      title: "Results",
      paragraphs: [
        `The Joukowsky transform reproduced the expected flow structure and lift behavior at
small angles of attack. At larger angles, discrepancies with experimental NACA data
appeared due to neglected viscous effects and flow separation—limitations inherent to the
inviscid model. Overall, conformal mapping provides an effective small-angle approximation
for lift and flow prediction while greatly simplifying computational effort.`
      ]
    },
    {
      title: "Key Contributions",
      bullets: [
        `Demonstrated how complex analytic methods (conformal mapping + circulation) model lift`,
        `Provided computational visualization linking theory to engineering phenomena`,
        `Compared analytical predictions to empirical NACA data to validate scope and limits`
      ]
    },
    {
      title: "Outcome",
      paragraphs: [
        `The project highlights the power of mathematical modeling: conformal mapping and the
Joukowsky transform can capture essential aerodynamic behavior and provide accurate
predictions for small-angle flows, forming a bridge between pure complex analysis and
applied fluid mechanics.`
      ]
    }
  ],
  artifacts: [
    "Presentation (public/Airfoil)",
    "Technical report (public/Airfoil)",
    "MATLAB scripts and visualization plots"
  ],
  links: [
    { label: "Presentation — Complex Analysis Project (View / Download)", href: "/Airfoil/Complex%20Analysis%20Project.pdf" },
    { label: "Report — Airfoil Report (View / Download)", href: "/Airfoil/Airfoil%20Report.pdf" }
  ]
};

