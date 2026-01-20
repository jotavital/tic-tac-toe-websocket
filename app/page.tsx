"use client";

import { useEffect, useState } from "react";
import { Board } from "@/components/game/Board";
import { GameSymbolsEnum } from "@/types/Player";
import { calculateWinner } from "@/utils/game-logic";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const movesMade = squares.filter(Boolean).length;
  const xIsNext = movesMade % 2 === 0;
  const { winner, victoryCombination } = calculateWinner(squares);

  function handlePlay(i: number) {
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
    }
  }, [winner]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
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
