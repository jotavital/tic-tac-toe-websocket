"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGameSounds } from "@/hooks/useGameSounds";
import type { VictoryCombination } from "@/types/Game";
import { GameSymbolsEnum } from "@/types/Player";
import { calculateWinner } from "@/utils/game-logic";

interface GameContextData {
  winner: GameSymbolsEnum | null;
  squares: (string | null)[];
  handlePlay: (index: number) => void;
  isGameOver: boolean;
  isDraw: boolean;
  victoryCombination: VictoryCombination | null;
  handleRestartGame: () => void;
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const { playMoveSound, playWinSound, playDrawSound } = useGameSounds();

  const [squares, setSquares] = useState(Array(9).fill(null));
  const movesMade = squares.filter(Boolean).length;
  const xIsNext = movesMade % 2 === 0;

  const { winner, victoryCombination, isDraw } = calculateWinner(squares);

  const isGameOver = !!winner || isDraw;

  function handleRestartGame() {
    setSquares(Array(9).fill(null));
  }

  function handlePlay(i: number) {
    playMoveSound();

    if (squares[i] || winner) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? GameSymbolsEnum.X : GameSymbolsEnum.O;

    setSquares(nextSquares);
  }

  useEffect(() => {
    if (winner) {
      playWinSound();
    } else if (isDraw) {
      playDrawSound();
    }
  }, [winner, isDraw, playDrawSound, playWinSound]);

  return (
    <GameContext.Provider
      value={{
        winner,
        squares,
        handlePlay,
        isGameOver,
        isDraw,
        victoryCombination,
        handleRestartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
