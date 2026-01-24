import BagOfBalls from './bag-of-balls'
import BingoBall from './bingo-ball'
import BingoCard from './bingo-card'
import { GAMESTATE, GameState } from './game-state'

class GameLeader {
  #announcedBalls: BingoBall[] = []
  #bagOfBalls: BagOfBalls
  #gameState: GameState

  constructor(bagOfBalls: BagOfBalls) {
    this.resetAnnouncedBalls()
    this.#bagOfBalls = bagOfBalls
    this.#gameState = GAMESTATE.WAITING
  }

  private _findBall(ball: BingoBall): boolean {
    const r = this.#announcedBalls.find((u) => ball.equals(u))
    return r !== undefined
  }

  announceBall(): BingoBall {
    if (this.isWaiting()) {
      this.#gameState = GAMESTATE.PLAYING
    }
    let ball: BingoBall
    try {
      ball = this.#bagOfBalls.getNext()
    } catch {
      ball = new BingoBall(BingoBall.GAME_OVER)
      this.#gameState = GAMESTATE.GAMEOVER
    }
    this.#announcedBalls.push(ball)
    return ball
  }

  get bagSize(): number {
    return this.#bagOfBalls.length
  }

  isGameOver() {
    return this.#gameState === GAMESTATE.GAMEOVER
  }

  isPlaying() {
    return this.#gameState === GAMESTATE.PLAYING
  }

  isWaiting() {
    return this.#gameState === GAMESTATE.WAITING
  }

  numAnnouncedBalls() {
    return this.#announcedBalls.length - 1
  }

  reset() {
    this.#gameState = GAMESTATE.WAITING
    this.resetAnnouncedBalls()
    this.#bagOfBalls.refillBag()
  }

  resetAnnouncedBalls() {
    this.#announcedBalls = [new BingoBall(BingoBall.FREE_SPACE)]
  }

  signCard(card: BingoCard): void {
    card.setSignature(crypto.randomUUID())
  }

  verify(card: BingoCard): boolean {
    let rowMatches = 0
    let columnMatches = 0
    let diagMatches = 0
    let otherDiagMatches = 0

    for (let i = 0; i < BingoCard.SIZE; i++) {
      for (let j = 0; j < BingoCard.SIZE; j++) {
        if (this._findBall(card.boardValues[i]![j]!)) {
          rowMatches++
        }
        if (this._findBall(card.boardValues[j]![i]!)) {
          columnMatches++
        }
        if (i === j && this._findBall(card.boardValues[i]![j]!)) {
          diagMatches++
        }
        if (i + j === BingoCard.SIZE - 1 && this._findBall(card.boardValues[j]![i]!)) {
          otherDiagMatches++
        }
      }
      if (rowMatches === BingoCard.SIZE) {
        return true
      } else if (columnMatches === BingoCard.SIZE) {
        return true
      } else {
        rowMatches = 0
        columnMatches = 0
      }
    }
    if (diagMatches === BingoCard.SIZE) {
      return true
    } else if (otherDiagMatches === BingoCard.SIZE) {
      return true
    }
    return false
  }
}

export default GameLeader
