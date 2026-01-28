import { GameObjects, Scene } from 'phaser'
import SceneInfo from '../scene-info'

class MainMenu extends Scene {
  #sceneInfo: SceneInfo
  title: GameObjects.Image
  soloItem: GameObjects.Image
  vsCpuItem: GameObjects.Image
  multiplayerItem: GameObjects.Image

  constructor() {
    super('MainMenu')
  }

  _setActions(item: GameObjects.Image, key: string): void {
    item.setInteractive()

    item.on('pointerover', () => {
      item.setTint(0xaaaaaa)
    })

    item.on('pointerout', () => {
      item.clearTint()
    })

    item.on('pointerdown', () => {
      this.startGame(key)
    })
  }

  create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
    const deltaY = Math.floor(this.#sceneInfo.height / 5)
    this.title = this.add.image(this.#sceneInfo.centerWidth, deltaY, 'main-menu')
    this.soloItem = this.add.image(this.#sceneInfo.centerWidth, deltaY * 2, 'solo-menuitem')
    this.vsCpuItem = this.add.image(this.#sceneInfo.centerWidth, deltaY * 3, 'vs-cpu-menuitem')
    this.multiplayerItem = this.add.image(this.#sceneInfo.centerWidth, deltaY * 4, 'multiplayer-menuitem')

    this._setActions(this.soloItem, 'SoloBingo')
  }

  startGame(key: string): void {
    const fadecolor = 0x000000
    const overlay = this.add
      .rectangle(0, 0, this.#sceneInfo.width, this.#sceneInfo.height, fadecolor)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999)
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 3000,
      ease: 'circ.in',
      onComplete: () => {
        this.scene.start(key)
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

export default MainMenu
