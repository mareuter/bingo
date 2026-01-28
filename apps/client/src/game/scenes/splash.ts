import { GameObjects, Scene } from 'phaser'
import SceneInfo from '../scene-info'

class Splash extends Scene {
  logo: GameObjects.Image
  #sceneInfo: SceneInfo

  constructor() {
    super('Splash')
  }

  preload() {
    this.load.setPath('assets/images')
    this.load.image('background', 'bingo-background.png')
    this.load.image('title-logo', 'title-logo.png')
  }

  create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
    this.logo = this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'title-logo')
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
    const overlay = this.add
      .rectangle(this.#sceneInfo.width, 0, this.#sceneInfo.width, this.#sceneInfo.height, fadecolor)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999)
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
