import Player from './player'

class HumanPlayer extends Player {
  constructor(name: string) {
    super(name)
  }

  reset(numCards: number) {
    this.numCards = numCards
    this.wolfCries = 0
  }
}

export default HumanPlayer
