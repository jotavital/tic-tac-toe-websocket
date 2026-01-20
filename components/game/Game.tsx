import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { Board } from "@/components/game/ui/Board";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { useGameSounds } from "@/hooks/useGameSounds";
import { GAME_SCREENS } from "@/types/Game";
import { GameSymbolsEnum } from "@/types/Player";
import { calculateWinner } from "@/utils/game-logic";

export function Game() {
  const { navigateToScreen } = useGameScreensNavigation();
  const { playMoveSound, playWinSound, playDrawSound } = useGameSounds();
  const [squares, setSquares] = useState(Array(9).fill(null));

  const movesMade = squares.filter(Boolean).length;
  const xIsNext = movesMade % 2 === 0;
  const { winner, victoryCombination, isDraw } = calculateWinner(squares);

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
      setSquares((previousState) =>
        previousState.map((square) => (square ? square : "")),
      );

      playWinSound();
    } else if (isDraw) {
      playDrawSound();
    }
  }, [winner, isDraw, playDrawSound, playWinSound]);

  return (
    <main className="flex min-h-screen w-3xl flex-col items-center justify-center ">
      <button
        type="button"
        onClick={() => navigateToScreen(GAME_SCREENS.MAIN_MENU)}
        className="cursor-pointer flex items-center gap-2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="text-sm font-medium">Voltar ao menu</span>
      </button>

      {winner && (
        <ReactConfetti recycle={false} numberOfPieces={800} gravity={0.2} />
      )}

      <Board
        squares={squares}
        onPlay={handlePlay}
        disabled={false}
        victoryCombination={victoryCombination}
      />
    </main>
  );
}
