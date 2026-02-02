import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'

class TwoCardsMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
  }

  onClick(): void {
    this.scene.registry.set('numCards', 2)
  }
}

export default TwoCardsMenuButton
