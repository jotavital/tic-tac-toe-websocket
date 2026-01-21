"use client";

import { Howl } from "howler";
import { useCallback } from "react";

const sounds = {
  move: new Howl({
    src: ["/sounds/move.wav"],
    preload: true,
    volume: 0.5,
  }),
  win: new Howl({
    src: ["/sounds/win.wav"],
    preload: true,
    volume: 0.5,
  }),
  draw: new Howl({
    src: ["/sounds/draw.wav"],
    preload: true,
    volume: 0.5,
  }),
  tap: new Howl({
    src: ["/sounds/tap.wav"],
    preload: true,
    volume: 0.5,
  }),
};

export function useGameSounds() {
  return {
    playMoveSound: useCallback(() => sounds.move.play(), []),
    playWinSound: useCallback(() => sounds.win.play(), []),
    playDrawSound: useCallback(() => sounds.draw.play(), []),
    playTapSound: useCallback(() => sounds.tap.play(), []),
  };
}
