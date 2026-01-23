"use client";

import type { ReactNode } from "react";
import { GameProvider } from "@/contexts/GameContext";
import { GameScreensNavigationProvider } from "@/contexts/NavigationContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SocketProvider>
        <GameProvider>
          <GameScreensNavigationProvider>
            {children}
          </GameScreensNavigationProvider>
        </GameProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}
