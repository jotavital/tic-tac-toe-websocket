import { MainMenuScreen } from "@/components/screens/MainMenu";
import { MatchScreen } from "@/components/screens/Match";
import { WaitingRoomScreen } from "@/components/screens/WaitingRoom";
import { useGameScreensNavigation } from "@/contexts/NavigationContext";
import { GAME_SCREENS } from "@/types/Game";

export function ScreensManager() {
  const { currentGameScreen } = useGameScreensNavigation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {currentGameScreen === GAME_SCREENS.MAIN_MENU && <MainMenuScreen />}
      {currentGameScreen === GAME_SCREENS.WAITING_ROOM && <WaitingRoomScreen />}
      {currentGameScreen === GAME_SCREENS.GAME && <MatchScreen />}
    </div>
  );
}
