"use client";

import { ScreensManager } from "@/components/screens/ScreensManager";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans ">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <ScreensManager />
    </div>
  );
}
