import { Button } from "@/components/game/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { useGame } from "@/contexts/GameContext";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function BackToMainMenuButton() {
  const { navigateToScreen } = useGameScreensNavigation();
  const { handleRestartGame } = useGame();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        handleRestartGame();

        navigateToScreen(GAME_SCREENS.MAIN_MENU);
      }}
      icon={<ArrowLeftIcon className="h-5 w-5" />}
    >
      Voltar ao menu
    </Button>
  );
}
