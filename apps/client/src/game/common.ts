export const BALL_COLOR: number = 0xedd45b
export const BALL_PANEL_BACKGROUND: number = 0x858585
export const NUMBER_PANEL_HIGHLIGHT_COLOR: number = 0xff8000
export const NUMBER_PANEL_FILL_COLOR: number = 0xffffe6
export const MAX_WOLF_CRIES = 3

export const TOOLBAR_BUTTON_HOVER_TINT = 0x777777
export const TOOLBAR_BUTTON_DISABLE_ALPHA = 0.6
export const TOOLBAR_BUTTON_DISABLE_TINT = 0xffffff

export function hexNumToString(hex: number): string {
  return `#${hex.toString(16)}`
}

export const GAME_KEYS = {
  BOOTLOADER: 'BootLoader',
  SPLASH: 'Splash',
  // MAINMENU: 'MainMenu',
  MAINMENU: 'SoloBingo',
  SOLOBINGO: 'SoloBingo',
}
