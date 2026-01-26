import ReactConfetti from "react-confetti";
import { Board } from "@/components/screens/Match/Board";
import { BackToMainMenuButton } from "@/components/screens/Match/buttons/BackToMainMenuButton";
import { RestartGameButton } from "@/components/screens/Match/buttons/RestartGameButton";
import { useGame } from "@/contexts/GameContext";

export function MatchScreen() {
  const { winnerSymbol } = useGame();

  return (
    <main className="flex min-h-screen w-3xl flex-col justify-center ">
      {winnerSymbol && (
        <ReactConfetti recycle={false} numberOfPieces={800} gravity={0.2} />
      )}

      <div className="flex flex-col items-center gap-10 w-full">
        <Board />

        <div className="gap-5 flex sm:flex-row flex-col">
          <BackToMainMenuButton />

          <RestartGameButton />
        </div>
      </div>
    </main>
  );
}
