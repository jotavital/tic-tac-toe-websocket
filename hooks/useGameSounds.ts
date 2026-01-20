// hooks/useGameSounds.ts
"use client";

import { Howl } from "howler";
import { useCallback } from "react";

const sounds = {
  move: new Howl({
    src: ["/sounds/move.wav"],
    preload: true,
  }),
  win: new Howl({
    src: ["/sounds/win.wav"],
    preload: true,
  }),
  draw: new Howl({
    src: ["/sounds/draw.wav"],
    preload: true,
  }),
};

export function useGameSounds() {
  return {
    playMove: useCallback(() => sounds.move.play(), []),
    playWin: useCallback(() => sounds.win.play(), []),
    playDraw: useCallback(() => sounds.draw.play(), []),
  };
}
