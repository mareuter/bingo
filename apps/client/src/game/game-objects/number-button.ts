import type { Scene } from 'phaser'
import NumberPanel from './number-panel'
import { NUMBER_PANEL_FILL_COLOR, NUMBER_PANEL_HIGHLIGHT_COLOR } from '../common'

class NumberButton extends NumberPanel {
  isToggled: boolean = false

  constructor(scene: Scene, x: number, y: number, value: string) {
    super(scene, x, y, value)
    this.setInteractive()
    this.on('pointerdown', this.handleClick, this)
  }

  handleClick() {
    if (this.isToggled) {
      this.setFillStyle(NUMBER_PANEL_FILL_COLOR)
      this.isToggled = false
    } else {
      this.setFillStyle(NUMBER_PANEL_HIGHLIGHT_COLOR)
      this.isToggled = true
    }
  }
}

export default NumberButton
