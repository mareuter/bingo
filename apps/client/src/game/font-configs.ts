import FontHelper from '@repo/core/src/font-helper'
import ToggleFont from '@repo/core/src/toggle-font'

const statusPanelFont = 'Roboto Regular'

export const MESSAGE_PANEL_FONT = new FontHelper('Roboto Regular', 30, '#ffffff', '#ffffff', 2, 'center', 2)

export const GAME_TYPE_FONT = new FontHelper('Roboto Regular', 20, '#ffffff', '#ffffff', 2, 'center', 2)

export const BALL_COLUMN_FONT = new FontHelper(statusPanelFont, 30, '#3e3e3d3d', '#000000', 2, 'center', 5)

export const BALL_RANGE_FONT = new ToggleFont(statusPanelFont, 30, '#d8a479', '#edd45b', '#000000', 2, 'center', 5)

export const BALL_FONT = new FontHelper(statusPanelFont, 50, '#edd45b', '#000000', 2, 'center', 5)

export const CARD_COLUMN_FONT = new FontHelper('Ewert Regular', 40, '#663300', '#000000', 2, 'center', 2)

export const CARD_NUMBER_FONT = new FontHelper('Arial Black', 30, '#663300', '#000000', 2, 'center', 2)

export const CARD_FREE_FONT = new FontHelper('Arial Black', 18, '#663300', '#000000', 2, 'center', 2)

export const SCORE_PANEL_FONT = new FontHelper('Roboto Regular', 40, '#ffffff', '#ffffff', 2, 'center', 2)
