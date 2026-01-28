import { motion } from "motion/react";
import { GameResultOverlay } from "@/components/screens/Match/GameResultOverlay";
import { Square } from "@/components/screens/Match/Square";
import { WinningLine } from "@/components/screens/Match/WinningLine";
import {
  BOARD_MOTION_VARIANTS,
  LINE_MOTION_VARIANTS,
} from "@/constants/motion-variants";
import { useGame } from "@/contexts/GameContext";
import { GameSymbolsEnum } from "@/types/Player";

export function Board() {
  const {
    boardState,
    isGameOver,
    victoryCombination,
    handlePlay,
    winnerSymbol,
    isMyTurn,
  } = useGame();

  const winningLineColorClass =
    winnerSymbol === GameSymbolsEnum.X ? "text-game-x" : "text-game-o";

  return (
    <div className="relative h-72 w-72 sm:h-96 sm:w-96">
      {isGameOver && <GameResultOverlay />}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-slate-300 transition-colors dark:text-slate-700"
        viewBox="0 0 300 300"
        aria-hidden="true"
      >
        <motion.g
          variants={BOARD_MOTION_VARIANTS}
          initial="hidden"
          animate="visible"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        >
          <motion.line
            variants={LINE_MOTION_VARIANTS}
            x1="100"
            y1="10"
            x2="100"
            y2="290"
          />
          <motion.line
            variants={LINE_MOTION_VARIANTS}
            x1="200"
            y1="10"
            x2="200"
            y2="290"
          />

          <motion.line
            variants={LINE_MOTION_VARIANTS}
            x1="10"
            y1="100"
            x2="290"
            y2="100"
          />
          <motion.line
            variants={LINE_MOTION_VARIANTS}
            x1="10"
            y1="200"
            x2="290"
            y2="200"
          />
        </motion.g>
      </svg>

      {victoryCombination?.svgLineCoords && (
        <WinningLine
          x1={victoryCombination?.svgLineCoords.x1}
          y1={victoryCombination?.svgLineCoords.y1}
          x2={victoryCombination?.svgLineCoords.x2}
          y2={victoryCombination?.svgLineCoords.y2}
          colorClass={winningLineColorClass}
        />
      )}

      <div className="relative z-10 grid h-full w-full grid-cols-3 grid-rows-3">
        {boardState?.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handlePlay(i)}
            disabled={isGameOver || !isMyTurn}
          />
        ))}
      </div>
    </div>
  );
}
