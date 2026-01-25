import { Button } from "@/components/game/ui/Button";
import { GameTitle } from "@/components/game/ui/game-title/GameTitle";
import { EnterIcon } from "@/components/ui/icons/EnterIcon";
import { PlayIcon } from "@/components/ui/icons/PlayIcon";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function MainMenu() {
  const { navigateToScreen } = useGameScreensNavigation();

  return (
    <div className="flex flex-col items-center gap-12 text-center w-full">
      <GameTitle />

      <div className="flex flex-row items-center gap-4">
        <Button
          size="lg"
          onClick={() => navigateToScreen(GAME_SCREENS.WAITING_ROOM)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          icon={<PlayIcon className="h-5 w-5" />}
        >
          Criar Sala
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          icon={<EnterIcon className="h-5 w-5" />}
        >
          Entrar em sala
        </Button>
      </div>
    </div>
  );
}
