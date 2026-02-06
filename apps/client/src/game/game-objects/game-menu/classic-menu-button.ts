import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class ClassicMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'classic-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('gameType', GAMETYPES.CLASSIC)
  }
}

export default ClassicMenuButton
