import ReactConfetti from "react-confetti";
import { Board } from "@/components/game/ui/Board";
import { BackToMainMenuButton } from "@/components/game/ui/buttons/BackToMainMenuButton";
import { RestartGameButton } from "@/components/game/ui/buttons/RestartGameButton";
import { useGame } from "@/contexts/GameContext";

export function Game() {
  const { winner } = useGame();

  return (
    <main className="flex min-h-screen w-3xl flex-col justify-center ">
      {winner && (
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
