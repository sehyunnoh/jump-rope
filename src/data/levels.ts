import type { Level } from "../types";

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Foundations",
    subtitle: "Basic jumps",
    tabLabel: "FOUND.",
    colorVar: "var(--l1)",
    description: "The two feet, one rotation basics everything else builds on.",
  },
  {
    id: 2,
    name: "Core Footwork & Crossover",
    subtitle: "Footwork and crosses",
    tabLabel: "FOOT.",
    colorVar: "var(--l2)",
    description: "Weight shifts and arm crosses layered onto the basic jump.",
  },
  {
    id: 3,
    name: "Double Unders",
    subtitle: "Two spins per jump",
    tabLabel: "D.U.",
    colorVar: "var(--l3)",
    description: "The rope passes twice under one jump — rotation speed matters now.",
  },
  {
    id: 4,
    name: "Freestyle Basics",
    subtitle: "First freestyle tricks",
    tabLabel: "FREE.",
    colorVar: "var(--l4)",
    description: "Elbow crosses, swing transitions and under-the-leg reaches — the building blocks of freestyle.",
  },
  {
    id: 5,
    name: "Performance & Routines",
    subtitle: "Highest-difficulty single moves",
    tabLabel: "PERF.",
    colorVar: "var(--l5)",
    description: "The hardest individual moves in RopeBeat. Stringing these into music-synced routines is a later feature, not part of this reference yet.",
  },
];

export function getLevel(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}
