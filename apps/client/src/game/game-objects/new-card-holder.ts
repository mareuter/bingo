import { Scene } from 'phaser'
import CardPanel from './card-panel'
import Player from '@repo/core/src/player'
import BaseCardHolder from './base-card-holder'

class NewCardHolder extends BaseCardHolder {
  cardPanels: CardPanel[]

  constructor(scene: Scene, x: number, player: Player) {
    super(scene, player)

    const numCards = this.player.numCards

    const deltaX = Math.floor(x / (numCards + 1))

    const spots: number[] = []
    if (numCards === 1) {
      spots.push(deltaX)
    }
    if (numCards === 2) {
      const offsetX = 20
      spots.push(deltaX + offsetX)
      spots.push(2 * deltaX - offsetX)
    }
    if (numCards === 3) {
      const offsetX = 40
      spots.push(deltaX - offsetX)
      spots.push(2 * deltaX)
      spots.push(3 * deltaX + offsetX)
    }

    this.cardPanels = []
    for (let i = 0; i < spots.length; i++) {
      this.cardPanels.push(new CardPanel(scene, spots.at(i)!, 400, this.player.bingoCards.at(i)!))
    }
  }

  destroy() {
    super.destroy()
    this.cardPanels.forEach((cardPanel) => {
      cardPanel.destroy()
    })
  }
}

export default NewCardHolder
