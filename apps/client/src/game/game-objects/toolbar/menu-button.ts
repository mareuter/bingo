import { Scene } from 'phaser'
import Button from '../../button'
import { TOOLBAR_BUTTON_DISABLE_ALPHA, TOOLBAR_BUTTON_DISABLE_TINT, TOOLBAR_BUTTON_HOVER_TINT } from '../../common'

class MenuButton extends Button {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
    this.disableTint = TOOLBAR_BUTTON_DISABLE_TINT
    this.disableAlpha = TOOLBAR_BUTTON_DISABLE_ALPHA
    this.hoverTint = TOOLBAR_BUTTON_HOVER_TINT
  }

  onClick(): void {
    this.disable()
  }
}

export default MenuButton
