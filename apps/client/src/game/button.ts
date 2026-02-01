import { GameObjects, Scene } from 'phaser'

class Button {
  protected scene: Scene
  protected image: GameObjects.Image
  protected disableAlpha: number | undefined
  protected disableTint: number | undefined
  protected hoverTint: number | undefined

  constructor(scene: Scene, x: number, y: number, imageName: string) {
    this.scene = scene
    this.image = this.scene.add.image(x, y, imageName)
    this.image.setInteractive()

    this.image.on('pointerover', () => {
      this.image.setTint(this.hoverTint)
    })

    this.image.on('pointerout', () => {
      this.image.clearTint()
    })

    this.image.on('pointerdown', () => this.onClick())
  }

  onClick() {
    throw new Error('Method onClick() must be implemented')
  }
}

export default Button
