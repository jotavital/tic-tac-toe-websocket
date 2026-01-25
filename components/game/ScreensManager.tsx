import { Game } from "@/components/game/Game";
import { MainMenu } from "@/components/game/MainMenu";
import { WaitingRoom } from "@/components/game/WaitingRoom";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function ScreensManager() {
  const { currentGameScreen } = useGameScreensNavigation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {currentGameScreen === GAME_SCREENS.MAIN_MENU && <MainMenu />}
      {currentGameScreen === GAME_SCREENS.WAITING_ROOM && <WaitingRoom />}
      {currentGameScreen === GAME_SCREENS.GAME && <Game />}
    </div>
  );
}
