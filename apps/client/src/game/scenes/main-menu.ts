import { GameObjects, Scene } from 'phaser'

class MainMenu extends Scene {
  #width!: number
  #height!: number
  #center_width!: number
  #center_height!: number
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

  preload() {
    this.load.setPath('assets/images')
    this.load.image('background', 'bingo-background.png')
    this.load.image('main-menu', 'main-menu.png')
    this.load.image('solo-menuitem', 'solo-menuitem.png')
    this.load.image('vs-cpu-menuitem', 'vs-cpu-menuitem.png')
    this.load.image('multiplayer-menuitem', 'multiplayer-menuitem.png')
  }

  create() {
    this.#width = +this.sys.game.config.width
    this.#height = +this.sys.game.config.height
    this.#center_width = this.#width / 2
    this.#center_height = this.#height / 2
    this.add.image(this.#center_width, this.#center_height, 'background')
    const deltaY = Math.floor(this.#height / 5)
    this.title = this.add.image(this.#center_width, deltaY, 'main-menu')
    this.soloItem = this.add.image(this.#center_width, deltaY * 2, 'solo-menuitem')
    this.vsCpuItem = this.add.image(this.#center_width, deltaY * 3, 'vs-cpu-menuitem')
    this.multiplayerItem = this.add.image(this.#center_width, deltaY * 4, 'multiplayer-menuitem')

    this._setActions(this.soloItem, 'SoloBingo')
  }

  startGame(key: string): void {
    const fadecolor = 0x000000
    const overlay = this.add
      .rectangle(0, 0, this.#width, this.#height, fadecolor)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(9999)
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 1000,
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
