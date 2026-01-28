import { GameObjects, Scene } from 'phaser'

class Splash extends Scene {
  logo: GameObjects.Image

  constructor() {
    super('Splash')
  }

  preload() {
    this.load.setPath('assets/images')
    this.load.image('background', 'bingo-background.png')
    this.load.image('title-logo', 'title-logo.png')
  }

  create() {
    this.add.image(512, 384, 'background')
    this.logo = this.add.image(512, 384, 'title-logo')
    this.logo.scale = 0
    const duration = 2000
    this.tweens.add({
      targets: this.logo,
      scaleX: 1,
      scaleY: 1,
      duration: duration,
    })

    this.tweens.add({
      targets: this.logo,
      rotation: 1,
      angle: 360,
      duration: duration,
      onComplete: () => this.endSplash(),
    })
  }

  endSplash() {
    const fadecolor = 0x000000
    const overlay = this.add.rectangle(1024, 0, 1024, 768, fadecolor).setOrigin(0).setAlpha(0).setDepth(9999)
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      x: 0,
      duration: 3000,
      ease: 'quad.inOut',
      onComplete: () => {
        this.scene.start('MainMenu')
        this.tweens.add({
          targets: overlay,
          alpha: 0,
          onComplete: () => {
            overlay.destroy()
          },
        })
      },
    })
  }
}

export default Splash
