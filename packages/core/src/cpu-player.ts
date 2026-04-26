import BingoCard from './bingo-card'
import PlayerRecord from './player-record'
import type GameLeader from './game-leader'
import type { GameTypes } from './game-types'

class CpuPlayer implements PlayerRecord {
  numCards: number
  wolfCries: number
  bingoCards: BingoCard[] = []

  constructor() {
    this.numCards = 1
    this.wolfCries = 0
  }

  checkCards(gl: GameLeader, gameType: GameTypes): boolean {
    let outcome = false
    this.bingoCards.forEach((card) => {
      const check = gl.verify(card, gameType)
      outcome ||= check
    })
    return outcome
  }

  generateCards(gl: GameLeader) {
    this.bingoCards.length = 0
    for (let i = 0; i < this.numCards; i++) {
      const c = new BingoCard()
      gl.signCard(c)
      this.bingoCards.push(c)
    }
  }

  setNumCards() {
    this.numCards = Math.floor(Math.random() * 3) + 1
  }
}

export default CpuPlayer
