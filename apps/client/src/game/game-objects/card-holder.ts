import { Scene } from 'phaser'
import BingoCard from '@repo/core/src/bingo-card'
import GameLeader from '@repo/core/src/game-leader'
import CardPanel from './card-panel'

class CardHolder {
  numCards: number
  cardPanels: CardPanel[]

  constructor(scene: Scene, x: number, numCards: number, gameLeader: GameLeader) {
    this.numCards = numCards

    const deltaX = Math.floor(x / (this.numCards + 1))

    const spots: number[] = []
    if (this.numCards === 1) {
      spots.push(deltaX)
    }
    if (this.numCards === 2) {
      const offsetX = 20
      spots.push(deltaX + offsetX)
      spots.push(2 * deltaX - offsetX)
    }
    if (this.numCards === 3) {
      const offsetX = 40
      spots.push(deltaX - offsetX)
      spots.push(2 * deltaX)
      spots.push(3 * deltaX + offsetX)
    }

    this.cardPanels = []
    spots.forEach((xLoc) => {
      const card = new BingoCard()
      gameLeader.signCard(card)
      this.cardPanels.push(new CardPanel(scene, xLoc, 400, card))
    })
  }

  destroy() {
    this.cardPanels.forEach((cardPanel) => {
      cardPanel.destroy()
    })
  }
}

export default CardHolder
