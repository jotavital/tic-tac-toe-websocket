import { Button } from "@/components/game/ui/Button";
import { GameTitle } from "@/components/game/ui/game-title/GameTitle";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function MainMenu() {
  const { navigateToScreen } = useGameScreensNavigation();

  return (
    <div className="flex flex-col items-center gap-12 text-center">
      <GameTitle />

      <Button
        size="lg"
        onClick={() => navigateToScreen(GAME_SCREENS.GAME)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
        icon={
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        }
      >
        Jogar Agora
      </Button>
    </div>
  );
}
