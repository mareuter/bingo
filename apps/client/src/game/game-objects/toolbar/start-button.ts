import { Scene } from 'phaser'
import ToggleButton from '../../toggle-button'

class StartButton extends ToggleButton {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)

    this.scene.events.on('endGame', () => {
      this.enable()
    })
  }

  onClick(): void {
    this.scene.events.emit('startNewGame')
    this.disable()
  }
}

export default StartButton
