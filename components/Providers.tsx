"use client";

import type { ReactNode } from "react";
import { GameProvider } from "@/contexts/GameContext";
import { GameScreensNavigationProvider } from "@/contexts/NavigationContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <GameScreensNavigationProvider>
          <GameProvider>
            <SocketProvider>{children}</SocketProvider>
          </GameProvider>
        </GameScreensNavigationProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
