import { Scene } from 'phaser'
import BingoCard from '@repo/core/src/bingo-card'
import NumberButton from './number-button'
import NumberPanel from './number-panel'
import { COLUMNS } from '@repo/core/src/constants'
import BingoBall from '@repo/core/src/bingo-ball'
import IWonButton from './iwon-button'

class CardPanel {
  scene: Scene
  x: number
  y: number
  columnHeaders: NumberPanel[] = []
  cardNumbers: NumberButton[] = []
  bingoCard: BingoCard
  iWonButton: IWonButton

  constructor(scene: Scene, x: number, y: number, card: BingoCard) {
    this.scene = scene
    this.x = x
    this.y = y
    this.bingoCard = card

    for (let i = 0; i < COLUMNS.length; i++) {
      const xp = (i - 2) * NumberPanel.side + this.x
      this.columnHeaders.push(new NumberPanel(scene, xp, this.y, COLUMNS[i]!))
    }

    // this.scene.add.existing(this)
    for (let j = 0; j < BingoCard.SIZE; j++) {
      for (let k = 0; k < BingoCard.SIZE; k++) {
        const xp = (j - 2) * NumberPanel.side + this.x
        const yp = (k + 1) * NumberPanel.side + this.y
        const bv = this.bingoCard.boardValues[j]![k]!.number
        let value
        if (bv === BingoBall.FREE_SPACE) {
          value = 'FREE'
        } else {
          value = bv.toString()
        }
        this.cardNumbers.push(new NumberButton(this.scene, xp, yp, value))
      }
    }
    const yp = 6 * NumberPanel.side + this.y
    const width = COLUMNS.length * NumberPanel.side
    this.iWonButton = new IWonButton(this.scene, this.x, yp, width, NumberPanel.side, this.bingoCard.getSignature()!)
    this.scene.events.on('bingoIWon!', this.handleWinningCard, this)
  }

  handleWinningCard(id: string) {
    if (id === this.bingoCard.getSignature()) {
      console.log(`Winning card being sent`)
      this.scene.events.emit('handleWinningCard', this.bingoCard)
    }
  }

  destroy() {
    this.scene.events.off('bingoIWon!')
    this.iWonButton.buttonText.destroy()
    this.iWonButton.destroy()
    this.cardNumbers.forEach((cardNumber) => {
      cardNumber.buttonText.destroy()
      cardNumber.destroy()
    })
    this.columnHeaders.forEach((columnHeader) => {
      columnHeader.buttonText.destroy()
      columnHeader.destroy()
    })
  }
}

export default CardPanel
