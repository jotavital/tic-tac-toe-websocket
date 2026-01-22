import { Button } from "@/components/game/ui/Button";
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
      icon={
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      }
    >
      Voltar ao menu
    </Button>
  );
}
