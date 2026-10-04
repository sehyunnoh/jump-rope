import type { Move } from "../types";
import level1 from "./moves/level-1.json";
import level2 from "./moves/level-2.json";
import level3 from "./moves/level-3.json";
import level4 from "./moves/level-4.json";
import level5 from "./moves/level-5.json";

const ALL_MOVES: Move[] = [
  ...(level1 as Move[]),
  ...(level2 as Move[]),
  ...(level3 as Move[]),
  ...(level4 as Move[]),
  ...(level5 as Move[]),
];

export function getAllMoves(): Move[] {
  return ALL_MOVES;
}

export function getMovesByLevel(level: number): Move[] {
  return ALL_MOVES.filter((m) => m.level === level);
}

export function getMoveById(id: string): Move | undefined {
  return ALL_MOVES.find((m) => m.id === id);
}

export function getMoveName(id: string): string {
  return getMoveById(id)?.name ?? id;
}

/** Previous/next move within the same level, in list order. */
export function getAdjacentMoves(id: string): { prev?: Move; next?: Move } {
  const move = getMoveById(id);
  if (!move) return {};
  const siblings = getMovesByLevel(move.level);
  const index = siblings.findIndex((m) => m.id === id);
  return {
    prev: index > 0 ? siblings[index - 1] : undefined,
    next: index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
}
