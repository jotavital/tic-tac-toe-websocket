export type VictoryCombination = {
  indices: [number, number, number];
  svgLineCoords: { x1: number; y1: number; x2: number; y2: number };
};

export const GAME_SCREENS = {
  MAIN_MENU: "MAIN_MENU",
  GAME: "GAME",
} as const;

export type GameScreen = (typeof GAME_SCREENS)[keyof typeof GAME_SCREENS];

export type ButtonSoundType = "tap" | "other_sounds_here_later";
