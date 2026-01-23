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
  winnerSymbol: GameSymbolsEnum | null;
  boardState: (string | null)[];
  handlePlay: (index: number) => void;
  isGameOver: boolean;
  isDraw: boolean;
  victoryCombination: VictoryCombination | null;
  handleRestartGame: () => void;
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const { playMoveSound, playWinSound, playDrawSound } = useGameSounds();

  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const countOfMovesMade = boardState.filter(Boolean).length;
  const xIsNext = countOfMovesMade % 2 === 0;

  const { winnerSymbol, victoryCombination, isDraw } =
    calculateWinner(boardState);

  const isGameOver = !!winnerSymbol || isDraw;

  function handleRestartGame() {
    setBoardState(Array(9).fill(null));
  }

  function handlePlay(i: number) {
    playMoveSound();

    if (boardState[i] || winnerSymbol) {
      return;
    }

    const nextSquares = [...boardState];
    nextSquares[i] = xIsNext ? GameSymbolsEnum.X : GameSymbolsEnum.O;

    setBoardState(nextSquares);
  }

  useEffect(() => {
    if (winnerSymbol) {
      playWinSound();
    } else if (isDraw) {
      playDrawSound();
    }
  }, [winnerSymbol, isDraw, playDrawSound, playWinSound]);

  return (
    <GameContext.Provider
      value={{
        winnerSymbol,
        boardState,
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
