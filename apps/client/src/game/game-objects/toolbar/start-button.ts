import { Scene } from 'phaser'
import Button from '../../button'
import { TOOLBAR_BUTTON_DISABLE_ALPHA, TOOLBAR_BUTTON_DISABLE_TINT, TOOLBAR_BUTTON_HOVER_TINT } from '../../common'

class StartButton extends Button {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
    this.disableTint = TOOLBAR_BUTTON_DISABLE_TINT
    this.disableAlpha = TOOLBAR_BUTTON_DISABLE_ALPHA
    this.hoverTint = TOOLBAR_BUTTON_HOVER_TINT

    this.scene.events.on('endGame', () => {
      this.enable()
    })
  }

  onClick(): void {
    console.log()
    this.scene.events.emit('startNewGame')
    this.disable()
  }
}

export default StartButton
