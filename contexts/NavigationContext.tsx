"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { GAME_SCREENS, type GameScreen } from "@/types/Game";

interface NavigationContextType {
  currentGameScreen: GameScreen;
  navigateToScreen: (screen: GameScreen) => void;
}

const GameScreensNavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export function GameScreensNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentGameScreen, setCurrentGameScreen] = useState<GameScreen>(
    GAME_SCREENS.MAIN_MENU,
  );

  const navigateToScreen = useCallback((screen: GameScreen) => {
    setCurrentGameScreen(screen);
  }, []);

  return (
    <GameScreensNavigationContext.Provider
      value={{ currentGameScreen, navigateToScreen }}
    >
      {children}
    </GameScreensNavigationContext.Provider>
  );
}

export function useGameScreensNavigation() {
  const context = useContext(GameScreensNavigationContext);

  if (!context) {
    throw new Error(
      "useGameScreensNavigation must be used within a GameScreensNavigationProvider",
    );
  }

  return context;
}
