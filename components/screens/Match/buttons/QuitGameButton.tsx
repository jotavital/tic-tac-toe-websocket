import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { useGame } from "@/contexts/GameContext";

export function QuitGameButton() {
  const { handleQuitGame } = useGame();

  return (
    <Button
      variant="secondary"
      onClick={handleQuitGame}
      icon={<ArrowLeftIcon className="h-5 w-5" />}
    >
      Sair do jogo
    </Button>
  );
}
