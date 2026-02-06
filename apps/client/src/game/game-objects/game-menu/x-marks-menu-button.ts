import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class XMarksMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'x-marks-menuitem')
  }

  onClick(): void {
    this.scene.registry.set('gameType', GAMETYPES.XMARKS)
  }
}

export default XMarksMenuButton
