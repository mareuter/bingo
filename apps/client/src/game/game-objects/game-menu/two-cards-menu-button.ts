import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'

class TwoCardsMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'two-card-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('numCards', 2)
  }
}

export default TwoCardsMenuButton
