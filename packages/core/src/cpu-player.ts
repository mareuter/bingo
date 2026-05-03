import BingoCard from './bingo-card'
import Player from './player'
import type GameLeader from './game-leader'
import type { GameTypes } from './game-types'

class CpuPlayer extends Player {
  constructor() {
    super('CPU')
  }

  checkCards(gameLeader: GameLeader, gameType: GameTypes): BingoCard | undefined {
    for (let i = 0; i < this.bingoCards.length; i++) {
      const card = this.bingoCards.at(i)!
      if (gameLeader.verify(card, gameType)) {
        return card
      }
    }
    return
  }

  setNumCards() {
    this.numCards = Math.floor(Math.random() * 3) + 1
  }

  reset() {
    this.setNumCards()
    this.wolfCries = 0
  }
}

export default CpuPlayer
