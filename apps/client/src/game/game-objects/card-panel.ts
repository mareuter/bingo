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
  bingoCard: BingoCard
  iWonButton: IWonButton

  constructor(scene: Scene, x: number, y: number, card: BingoCard) {
    this.scene = scene
    this.x = x
    this.y = y
    this.bingoCard = card

    for (let i = 0; i < COLUMNS.length; i++) {
      const xp = (i - 2) * NumberPanel.side + x
      new NumberPanel(scene, xp, y, COLUMNS[i]!)
    }

    // this.scene.add.existing(this)
    for (let j = 0; j < BingoCard.SIZE; j++) {
      for (let k = 0; k < BingoCard.SIZE; k++) {
        const xp = (j - 2) * NumberPanel.side + x
        const yp = (k + 1) * NumberPanel.side + y
        const bv = this.bingoCard.boardValues[j]![k]!.number
        let value
        if (bv === BingoBall.FREE_SPACE) {
          value = 'FREE'
        } else {
          value = bv.toString()
        }
        new NumberButton(scene, xp, yp, value)
      }
    }
    const yp = 6 * NumberPanel.side + y
    const width = COLUMNS.length * NumberPanel.side
    this.iWonButton = new IWonButton(scene, x, yp, width, NumberPanel.side)
  }
}

export default CardPanel
