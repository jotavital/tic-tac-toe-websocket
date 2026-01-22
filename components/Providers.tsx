"use client";

import type { ReactNode } from "react";
import { GameProvider } from "@/contexts/GameContext";
import { GameScreensNavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <GameProvider>
        <GameScreensNavigationProvider>
          {children}
        </GameScreensNavigationProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
