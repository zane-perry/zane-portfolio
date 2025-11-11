export * from "./types";
import { aiAssistedRapidPrototyper } from "./ai-assisted-rapid-prototyper";
import { musicRecs } from "./music-recs";
import { boundarySolver } from "./boundary-solver";
import { airfoilSim } from "./airfoil-sim";
import { signalNoiseReducer } from "./signal-noise-reducer";
import { travelGuide } from "./travel-guide";
import { imageCompressor } from "./image-compressor";
import { minigit } from "./minigit";

export const projectDetailsMap: Record<string, import("./types").ProjectDetail> = {
  "AI Assisted Rapid Prototyper": aiAssistedRapidPrototyper,
  "Advanced Music Recommendation using Deep Learning": musicRecs,
  "Boundary Integral Equation ODE/PDE Solver": boundarySolver,
  "Airfoil Fluid Simulation": airfoilSim,
  "Signal Noise Reducer": signalNoiseReducer,
  "Travel Planning Guide": travelGuide,
  "Image Compressor": imageCompressor,
  "Minigit File Version Control": minigit,
};

export {
  aiAssistedRapidPrototyper,
  musicRecs,
  boundarySolver,
  airfoilSim,
  signalNoiseReducer,
  travelGuide,
  imageCompressor,
  minigit,
};
