"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { GameProvider } from "@/contexts/GameContext";
import { GameScreensNavigationProvider } from "@/contexts/NavigationContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SocketProvider>
          <GameProvider>
            <GameScreensNavigationProvider>
              {children}
            </GameScreensNavigationProvider>
          </GameProvider>
        </SocketProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
