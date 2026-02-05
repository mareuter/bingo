import { GameObjects, Scene } from 'phaser'
import Button from '../../button'
import { TOOLBAR_BUTTON_HOVER_TINT } from '../../common'

class ToneButton extends Button {
  protected downImage: GameObjects.Image

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'tone')
    this.hoverTint = TOOLBAR_BUTTON_HOVER_TINT

    this.downImage = this.scene.add.image(x, y, 'no-tone')
    this.downImage.setVisible(false)

    this.downImage.on('pointerover', () => {
      this.downImage.setTint(this.hoverTint)
    })

    this.downImage.on('pointerout', () => {
      this.downImage.clearTint()
    })

    this.downImage.on('pointerdown', () => this.onClick())
  }

  onClick(): void {
    if (this.image.visible) {
      this.scene.registry.set('playSound', false)
      this.image.setVisible(false)
      this.image.disableInteractive()
      this.downImage.setVisible(true)
      this.downImage.setInteractive()
    } else if (this.downImage.visible) {
      this.scene.registry.set('playSound', true)
      this.downImage.setVisible(false)
      this.downImage.disableInteractive()
      this.image.setVisible(true)
      this.image.setInteractive()
    }
  }
}

export default ToneButton
