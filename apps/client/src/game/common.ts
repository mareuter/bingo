export const BALL_COLOR: number = 0xedd45b
export const BALL_PANEL_BACKGROUND: number = 0x858585
export const NUMBER_PANEL_COLOR: number = 0x663300
export const NUMBER_PANEL_FILL_COLOR: number = 0xffffe6
export const NUMBER_PANEL_HIGHLIGHT_COLOR: number = 0xff8000
export const MAX_WOLF_CRIES = 3

export function hexNumToString(hex: number): string {
  return `#${hex.toString(16)}`
}
