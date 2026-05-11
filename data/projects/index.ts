export * from "./types";
import { aiAssistedRapidPrototyper } from "./ai-assisted-rapid-prototyper";
import { musicRecs } from "./music-recs";
import { boundarySolver } from "./boundary-solver";
import { airfoilSim } from "./airfoil-sim";
import { signalNoiseReducer } from "./signal-noise-reducer";
import { travelGuide } from "./travel-guide";
import { imageCompressor } from "./image-compressor";
import { minigit } from "./minigit";
import { morphogenesis } from "./morphogenesis";
import { bayesianBlastAnalysis } from "./bayesian-blast-analysis";
import { spiralWaveDefibrillation } from "./spiral-wave-defibrillation";
import { pinnConstraintEncoding } from "./pinn-constraint-encoding";

export const projectDetailsMap: Record<string, import("./types").ProjectDetail> = {
  "AI Assisted Rapid Prototyper": aiAssistedRapidPrototyper,
  "Advanced Music Recommendation using Deep Learning": musicRecs,
  "Boundary Integral Equation ODE/PDE Solver": boundarySolver,
  "Airfoil Fluid Simulation": airfoilSim,
  "Signal Noise Reducer": signalNoiseReducer,
  "Constraint Encoding in Physics-Informed Neural Networks for PDE Solvers": pinnConstraintEncoding,
  "Bayesian Interpretation of BLAST Evidence for Biological Sequence Matching": bayesianBlastAnalysis,
  "Spiral Wave Dynamics and Low-Energy Defibrillation in Excitable Media": spiralWaveDefibrillation,
  "Travel Planning Guide": travelGuide,
  "Image Compressor": imageCompressor,
  "Minigit File Version Control": minigit,
  "Turing Instabilities and Ohta–Kawasaki Phase Separation": morphogenesis,
};

export {
  aiAssistedRapidPrototyper,
  musicRecs,
  boundarySolver,
  airfoilSim,
  signalNoiseReducer,
  pinnConstraintEncoding,
  bayesianBlastAnalysis,
  spiralWaveDefibrillation,
  travelGuide,
  imageCompressor,
  minigit,
  morphogenesis,
};
