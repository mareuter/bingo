import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'

class ThreeCardsMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
  }

  onClick(): void {
    this.scene.registry.set('numCards', 3)
  }
}

export default ThreeCardsMenuButton
