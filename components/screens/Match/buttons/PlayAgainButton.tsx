import { Button } from "@/components/ui/Button";
import { RestartIcon } from "@/components/ui/icons/RestartIcon";
import { useGame } from "@/contexts/GameContext";

export function PlayAgainButton() {
  const { isGameOver, handleRestartGame } = useGame();

  if (!isGameOver) {
    return null;
  }

  return (
    <Button
      variant="primary"
      key="game-over"
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          "0px 0px 0px rgba(0,0,0,0)",
          "0px 10px 20px rgba(251, 191, 36, 0.4)",
          "0px 0px 0px rgba(0,0,0,0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={handleRestartGame}
      icon={
        <RestartIcon className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-180" />
      }
    >
      Jogar Novamente
    </Button>
  );
}
