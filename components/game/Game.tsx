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
          isGameOver={isGameOver}
          isDraw={isDraw}
        />

        <div className="gap-5 flex sm:flex-row flex-col">
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

          <Button
            variant={isGameOver ? "primary" : "secondary"}
            key={isGameOver ? "game-over" : "playing"}
            animate={
              isGameOver
                ? {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0px 0px 0px rgba(0,0,0,0)",
                      "0px 10px 20px rgba(251, 191, 36, 0.4)",
                      "0px 0px 0px rgba(0,0,0,0)",
                    ],
                  }
                : {}
            }
            transition={
              isGameOver
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {}
            }
            onClick={handleRestartGame}
            icon={
              <svg
                className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            }
          >
            {isGameOver ? "Jogar Novamente" : "Reiniciar"}
          </Button>
        </div>
      </div>
    </main>
  );
}
