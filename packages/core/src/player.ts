import BingoCard from './bingo-card'
import type GameLeader from './game-leader'

class Player {
  name: string
  numCards: number
  wolfCries: number
  bingoCards: BingoCard[] = []

  constructor(name: string) {
    this.name = name
    this.numCards = 1
    this.wolfCries = 0
  }

  generateCards(gl: GameLeader) {
    this.bingoCards.length = 0
    for (let i = 0; i < this.numCards; i++) {
      const c = new BingoCard()
      gl.signCard(c)
      this.bingoCards.push(c)
    }
  }
}

export default Player
