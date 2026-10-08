export const GAMESTATE = {
  IDLE: 'IDLE',
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  GAMEOVER: 'GAMEOVER',
} as const
export type GameState = keyof typeof GAMESTATE
