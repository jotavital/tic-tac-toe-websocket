import { Button } from "@/components/game/ui/Button";
import { RestartIcon } from "@/components/ui/icons/RestartIcon";
import { useGame } from "@/contexts/GameContext";

export function RestartGameButton() {
  const { isGameOver, handleRestartGame } = useGame();

  return (
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
        <RestartIcon className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-180" />
      }
    >
      {isGameOver ? "Jogar Novamente" : "Reiniciar"}
    </Button>
  );
}
