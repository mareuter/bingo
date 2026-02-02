import { GameObjects, Scene } from 'phaser'
import { GAME_KEYS } from '../common'

class BootLoader extends Scene {
  progressBar!: GameObjects.Graphics
  loadBar!: GameObjects.Graphics

  constructor() {
    super(GAME_KEYS.BOOTLOADER)
  }

  preload() {
    console.log('In bootloader')
    console.log(`${this.cameras.main.width}, ${this.cameras.main.height}`)
    this.createBars()
    this.createEvents()
    this.loadImages()
    this.load.html('numCardsSelector', 'assets/text/num-cards-selector.html')
    this.load.font('Roboto Regular', 'assets/fonts/Roboto-Regular.ttf')
    this.load.font('Ewert Regular', 'assets/fonts/Ewert-Regular.ttf')

    console.log('Done bootloader')
  }

  create() {}

  createBars() {
    this.loadBar = this.add.graphics()
    this.loadBar.fillStyle(0x008483, 1)
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20,
    )
    this.progressBar = this.add.graphics()
  }

  createEvents() {
    this.load.on(
      'progress',
      (value: number) => {
        console.log(`${value}`)
        this.progressBar.clear()
        this.progressBar.fillStyle(0x88d24c, 1)
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16,
        )
      },
      this,
    )
    this.load.on(
      'complete',
      () => {
        this.scene.start(GAME_KEYS.SPLASH)
      },
      this,
    )
  }

  loadImages() {
    this.load.image('background', 'assets/images/bingo-background.png')
    this.load.image('title-logo', 'assets/images/title-logo.png')
    this.load.image('main-menu', 'assets/images/main-menu.png')
    this.load.image('solo-menuitem', 'assets/images/solo-menuitem.png')
    this.load.image('vs-cpu-menuitem', 'assets/images/vs-cpu-menuitem.png')
    this.load.image('multiplayer-menuitem', 'assets/images/multiplayer-menuitem.png')
    this.load.image('status-board', 'assets/images/status-board.png')
    this.load.image('bingo-ball', 'assets/images/bingo-ball.png')
    this.load.image('game-menu-button', 'assets/images/menu.png')
    this.load.image('start-button', 'assets/images/start.png')
    this.load.image('game-type-menuoption', 'assets/images/game-type-menuoption.png')
    this.load.image('number-of-cards-menuoption', 'assets/images/number-of-cards-menuoption.png')
    this.load.image('one-card-menuitem', 'assets/images/one-card-menuitem.png')
    this.load.image('two-card-menuitem', 'assets/images/two-card-menuitem.png')
    this.load.image('three-card-menuitem', 'assets/images/three-card-menuitem.png')
    this.load.image('asterisk-marker', 'assets/images/asterisk-marker.png')
    this.load.image('quit-menu-menuoption', 'assets/images/quit-menu-menuoption.png')
  }
}

export default BootLoader
