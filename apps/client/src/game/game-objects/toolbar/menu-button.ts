import { Scene } from 'phaser'
import ToggleButton from '../../toggle-button'

class MenuButton extends ToggleButton {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
  }

  onClick(): void {
    this.disable()
  }
}

export default MenuButton
