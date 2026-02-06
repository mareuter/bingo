import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class Crazy8MenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'crazy-8-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('gameType', GAMETYPES.CRAZY8)
  }
}

export default Crazy8MenuButton
