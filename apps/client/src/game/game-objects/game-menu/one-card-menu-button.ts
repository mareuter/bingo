import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'

class OneCardMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'one-card-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('numCards', 1)
  }
}

export default OneCardMenuButton
