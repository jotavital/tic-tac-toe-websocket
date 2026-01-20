"use client";

import { ScreensManager } from "@/components/game/ScreensManager";
import { Providers } from "@/components/Providers";

export default function Home() {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <ScreensManager />
      </div>
    </Providers>
  );
}
