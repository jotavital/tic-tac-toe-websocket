"use client";

import type { ReactNode } from "react";
import { GameScreensNavigationProvider } from "@/contexts/NavigationContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GameScreensNavigationProvider>{children}</GameScreensNavigationProvider>
  );
}
