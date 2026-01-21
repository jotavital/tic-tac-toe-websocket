import { motion } from "motion/react";
import { Square } from "@/components/game/ui/Square";
import type { VictoryCombination } from "@/types/Game";
import { GameSymbolsEnum } from "@/types/Player";

interface BoardProps {
  squares: (string | null)[];
  onPlay: (index: number) => void;
  disabled?: boolean;
  victoryCombination?: VictoryCombination | null;
}

export function Board({
  squares,
  onPlay,
  disabled,
  victoryCombination,
}: BoardProps) {
  const winningSvgLineCoords = victoryCombination?.svgLineCoords;

  const winnerSymbol = victoryCombination
    ? squares[victoryCombination.indices[0]]
    : null;

  const lineColor =
    winnerSymbol === GameSymbolsEnum.X ? "text-game-x" : "text-game-o";

  return (
    <div className="relative h-72 w-72 sm:h-96 sm:w-96">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 300 300"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="10" strokeLinecap="round">
          {/* vertical lines */}
          <line x1="100" y1="10" x2="100" y2="290" />
          <line x1="200" y1="10" x2="200" y2="290" />

          {/* horizontal lines */}
          <line x1="10" y1="100" x2="290" y2="100" />
          <line x1="10" y1="200" x2="290" y2="200" />
        </g>
      </svg>

      {winningSvgLineCoords && (
        <svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          viewBox="0 0 300 300"
        >
          <motion.line
            x1={winningSvgLineCoords.x1}
            y1={winningSvgLineCoords.y1}
            x2={winningSvgLineCoords.x2}
            y2={winningSvgLineCoords.y2}
            className={lineColor}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
      )}

      <div className="relative z-10 grid h-full w-full grid-cols-3 grid-rows-3">
        {squares?.map((square, i) => (
          <div key={i} className="flex items-center justify-center p-2">
            <Square
              value={square}
              onClick={() => onPlay(i)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
