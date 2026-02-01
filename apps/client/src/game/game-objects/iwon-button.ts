import { GameObjects, Scene } from 'phaser'
import { NUMBER_PANEL_FILL_COLOR, NUMBER_PANEL_HIGHLIGHT_COLOR } from '../common'
import { CARD_NUMBER_FONT } from '../font-configs'

class IWonButton extends GameObjects.Rectangle {
  buttonText: GameObjects.Text
  #id: string

  constructor(scene: Scene, x: number, y: number, width: number, height: number, id: string) {
    super(scene, x, y, width, height)
    this.#id = id
    this.scene.add.existing(this)

    this.setStrokeStyle(2, CARD_NUMBER_FONT.color.stringToNumber())
    this.setFillStyle(NUMBER_PANEL_FILL_COLOR)
    this.buttonText = this.scene.add
      .text(this.x, this.y, 'Bingo! I Won!', CARD_NUMBER_FONT.toPhaserFontConfig())
      .setOrigin(0.5)
    this.setInteractive()
    this.on('pointerdown', this.handleClick, this)
    this.on('pointerup', this.fixUp, this)
  }

  handleClick() {
    this.setFillStyle(NUMBER_PANEL_HIGHLIGHT_COLOR)
    console.log('I Won!')
    this.scene.events.emit('bingoIWon!', this.#id)
  }

  fixUp() {
    this.setFillStyle(NUMBER_PANEL_FILL_COLOR)
  }
}

export default IWonButton
