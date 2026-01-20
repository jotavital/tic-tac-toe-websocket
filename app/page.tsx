"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { Board } from "@/components/game/Board";
import { useGameSounds } from "@/hooks/useGameSounds";
import { GameSymbolsEnum } from "@/types/Player";
import { calculateWinner } from "@/utils/game-logic";

export default function Home() {
  const { playMove, playWin, playDraw } = useGameSounds();
  const [squares, setSquares] = useState(Array(9).fill(null));

  const movesMade = squares.filter(Boolean).length;
  const xIsNext = movesMade % 2 === 0;
  const { winner, victoryCombination, isDraw } = calculateWinner(squares);

  function handlePlay(i: number) {
    playMove();

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

      playWin();
    } else if (isDraw) {
      playDraw();
    }
  }, [winner, isDraw, playDraw, playWin]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {winner && (
        <ReactConfetti recycle={false} numberOfPieces={800} gravity={0.2} />
      )}

      <main className="flex min-h-screen w-3xl flex-col items-center justify-center ">
        <Board
          squares={squares}
          onPlay={handlePlay}
          disabled={false}
          victoryCombination={victoryCombination}
        />
      </main>
    </div>
  );
}
