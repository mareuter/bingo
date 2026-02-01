import { GameObjects, Scene } from 'phaser'

import { NUMBER_PANEL_FILL_COLOR } from '../common'
import { CARD_COLUMN_FONT, CARD_FREE_FONT, CARD_NUMBER_FONT } from '../font-configs'
import { COLUMNS } from '@repo/core/src/constants'

class NumberPanel extends GameObjects.Rectangle {
  buttonText: GameObjects.Text
  static side: number = 50

  constructor(scene: Scene, x: number, y: number, value: string) {
    super(scene, x, y, NumberPanel.side, NumberPanel.side)
    this.scene.add.existing(this)
    let fontConfig: object
    let offsetY = 0
    if (value === 'FREE') {
      fontConfig = CARD_FREE_FONT.toPhaserFontConfig()
    } else if (COLUMNS.find((u) => u === value) !== undefined) {
      fontConfig = CARD_COLUMN_FONT.toPhaserFontConfig()
      offsetY = 4
    } else {
      fontConfig = CARD_NUMBER_FONT.toPhaserFontConfig()
    }

    this.setStrokeStyle(2, CARD_NUMBER_FONT.color.stringToNumber())
    this.setFillStyle(NUMBER_PANEL_FILL_COLOR)

    this.buttonText = this.scene.add.text(this.x, this.y - offsetY, value, fontConfig).setOrigin(0.5)
  }
}

export default NumberPanel
