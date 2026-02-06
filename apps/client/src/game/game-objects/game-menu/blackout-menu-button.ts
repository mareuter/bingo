import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class BlackoutMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'blackout-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('gameType', GAMETYPES.BLACKOUT)
  }
}

export default BlackoutMenuButton
