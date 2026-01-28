import { Button } from "@/components/ui/Button";
import { RestartIcon } from "@/components/ui/icons/RestartIcon";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/utils/cn";

export function PlayAgainButton() {
  const { isGameOver, handlePlayAgain, isWaitingToPlayAgain } = useGame();

  if (!isGameOver) {
    return null;
  }

  return (
    <Button
      variant={isWaitingToPlayAgain ? "secondary" : "primary"}
      disabled={isWaitingToPlayAgain}
      animate={
        isWaitingToPlayAgain
          ? { scale: 1, opacity: 0.8 }
          : {
              scale: [1, 1.05, 1],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 10px 20px rgba(251, 191, 36, 0.4)",
                "0px 0px 0px rgba(0,0,0,0)",
              ],
            }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={handlePlayAgain}
      icon={
        <RestartIcon
          className={cn(
            "w-5 h-5 transition-transform duration-500",
            isWaitingToPlayAgain ? "animate-spin" : "group-hover:-rotate-180",
          )}
        />
      }
    >
      {isWaitingToPlayAgain ? "Aguardando oponente..." : "Jogar Novamente"}
    </Button>
  );
}
