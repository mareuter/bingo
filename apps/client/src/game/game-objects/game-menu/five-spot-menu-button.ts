import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class FiveSpotMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'five-spot-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('gameType', GAMETYPES.FIVESPOT)
  }
}

export default FiveSpotMenuButton
