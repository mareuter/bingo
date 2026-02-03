import { Scene } from 'phaser'
import ToggleButton from '../../toggle-button'

class StartGameButton extends ToggleButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'start-game-button')

    this.scene.events.on('endGame', () => {
      this.enable()
    })
  }

  onClick(): void {
    this.scene.events.emit('startNewGame')
    this.disable()
  }
}

export default StartGameButton
