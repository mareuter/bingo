import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class HappyHMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'happy-h-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('gameType', GAMETYPES.HAPPYH)
  }
}

export default HappyHMenuButton
