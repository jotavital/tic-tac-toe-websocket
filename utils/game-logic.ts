import type { VictoryCombination } from "@/types/Game";
import type { GameSymbols } from "@/types/Player";

export const VICTORY_COMBINATIONS: VictoryCombination[] = [
  { indices: [0, 1, 2], svgLineCoords: { x1: 15, y1: 50, x2: 285, y2: 50 } },
  { indices: [3, 4, 5], svgLineCoords: { x1: 15, y1: 150, x2: 285, y2: 150 } },
  { indices: [6, 7, 8], svgLineCoords: { x1: 15, y1: 250, x2: 285, y2: 250 } },

  { indices: [0, 3, 6], svgLineCoords: { x1: 50, y1: 15, x2: 50, y2: 285 } },
  { indices: [1, 4, 7], svgLineCoords: { x1: 150, y1: 15, x2: 150, y2: 285 } },
  { indices: [2, 5, 8], svgLineCoords: { x1: 250, y1: 15, x2: 250, y2: 285 } },

  { indices: [0, 4, 8], svgLineCoords: { x1: 20, y1: 20, x2: 280, y2: 280 } },
  { indices: [2, 4, 6], svgLineCoords: { x1: 280, y1: 20, x2: 20, y2: 280 } },
];

export function calculateWinner(boardState: GameSymbols[]) {
  for (const victoryCombination of VICTORY_COMBINATIONS) {
    const [a, b, c] = victoryCombination.indices;

    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return {
        winnerSymbol: boardState[a],
        victoryCombination: victoryCombination,
        isDraw: false,
      };
    }
  }

  const isDraw = !boardState.includes(null);

  return { winnerSymbol: null, victoryCombination: null, isDraw };
}
