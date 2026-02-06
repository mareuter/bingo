export const GAMETYPES = {
  CLASSIC: 'Classic',
  BLACKOUT: 'Blackout',
  CRAZY8: 'Crazy 8',
  HAPPYH: 'Happy H',
  FIVESPOT: 'Five Spot',
  XMARKS: 'X Marks',
} as const
export type GameTypes = keyof typeof GAMETYPES
