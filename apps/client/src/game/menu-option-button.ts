import { Scene } from 'phaser'
import Button from './button'
import { MENUOPTION_BUTTON_HOVER_TINT } from './common'

class MenuOptionButton extends Button {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
    this.hoverTint = MENUOPTION_BUTTON_HOVER_TINT
  }

  getLeftCenter(): Phaser.Types.Math.Vector2Like {
    return this.image.getLeftCenter()
  }
}

export default MenuOptionButton
