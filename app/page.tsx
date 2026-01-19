"use client";

import { useState } from "react";
import { Board } from "@/components/game/Board";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const movesMade = squares.filter(Boolean).length;
  const xIsNext = movesMade % 2 === 0;

  function handlePlay(i: number) {
    if (squares[i]) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-3xl flex-col items-center justify-center ">
        <Board squares={squares} onPlay={handlePlay} disabled={false} />
      </main>
    </div>
  );
}
