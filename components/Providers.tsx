"use client";

import type { ReactNode } from "react";
import { GameScreensNavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <GameScreensNavigationProvider>{children}</GameScreensNavigationProvider>
    </ThemeProvider>
  );
}
