import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'

class ThreeCardsMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'three-card-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('numCards', 3)
  }
}

export default ThreeCardsMenuButton
