import { Scene } from 'phaser'
import Toolbar from './toolbar'
import JoinLeaveButton from './toolbar/join-leave-button'

class MultiplayerToolbar extends Toolbar {
  joinLeaveButton: JoinLeaveButton

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y)
    const offsetX = 70
    this.joinLeaveButton = new JoinLeaveButton(scene, x - 2 * offsetX, y)
  }
}

export default MultiplayerToolbar
