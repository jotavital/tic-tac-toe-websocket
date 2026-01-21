import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { Board } from "@/components/game/ui/Board";
import { Button } from "@/components/game/ui/Button";
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
    <main className="flex min-h-screen w-3xl flex-col justify-center ">
      {winner && (
        <ReactConfetti recycle={false} numberOfPieces={800} gravity={0.2} />
      )}

      <div className="flex flex-col items-center gap-10 w-full">
        <Board
          squares={squares}
          onPlay={handlePlay}
          disabled={false}
          victoryCombination={victoryCombination}
        />

        <Button
          variant="secondary"
          onClick={() => navigateToScreen(GAME_SCREENS.MAIN_MENU)}
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          }
        >
          Voltar ao menu
        </Button>
      </div>
    </main>
  );
}
