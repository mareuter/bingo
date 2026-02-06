import BagOfBalls from './bag-of-balls'
import BingoBall from './bingo-ball'
import BingoCard from './bingo-card'
import { NUM_CRAZY8_MATCHES, NUM_HAPPYH_MATCHES } from './constants'
import { GAMESTATE, GameState } from './game-state'
import { GAMETYPES } from './game-types'

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

  verify(card: BingoCard, gameType: string): boolean {
    switch (gameType) {
      case GAMETYPES.BLACKOUT:
        return this.verify_blackout(card)
      case GAMETYPES.CRAZY8:
        return this.verify_crazy8(card)
      case GAMETYPES.FIVESPOT:
        return this.verify_fiveSpot(card)
      case GAMETYPES.HAPPYH:
        return this.verify_happyH(card)
      case GAMETYPES.XMARKS:
        return this.verify_xmarks(card)
      default:
        return this.verify_classic(card)
    }
  }

  verify_blackout(card: BingoCard): boolean {
    let matches = 0
    card.boardValues.forEach((row) => {
      row.forEach((ball) => {
        if (this._findBall(ball)) {
          matches++
        }
      })
    })
    return matches === BingoCard.SIZE * BingoCard.SIZE
  }

  verify_classic(card: BingoCard): boolean {
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

  verify_crazy8(card: BingoCard): boolean {
    let matches = 0
    for (let i = 0; i < BingoCard.SIZE; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < BingoCard.SIZE; j++) {
          if (this._findBall(card.boardValues[i]![j]!)) {
            matches++
          }
        }
      } else {
        ;[0, BingoCard.SIZE - 1].forEach((index) => {
          if (this._findBall(card.boardValues[i]![index]!)) {
            matches++
          }
        })
      }
    }
    return matches === NUM_CRAZY8_MATCHES
  }

  verify_fiveSpot(card: BingoCard): boolean {
    let matches = 0
    const balls: BingoBall[] = [
      card.boardValues[0]![0]!,
      card.boardValues[0]![4]!,
      card.boardValues[2]![2]!,
      card.boardValues[4]![0]!,
      card.boardValues[4]![4]!,
    ]
    balls.forEach((ball) => {
      if (this._findBall(ball)) {
        matches++
      }
    })
    return matches === BingoCard.SIZE
  }

  verify_happyH(card: BingoCard): boolean {
    let matches = 0
    for (let i = 0; i < BingoCard.SIZE; i++) {
      if (i === 2) {
        for (let j = 0; j < BingoCard.SIZE; j++) {
          if (this._findBall(card.boardValues[i]![j]!)) {
            matches++
          }
        }
      } else {
        ;[0, BingoCard.SIZE - 1].forEach((index) => {
          if (this._findBall(card.boardValues[i]![index]!)) {
            matches++
          }
        })
      }
    }
    return matches === NUM_HAPPYH_MATCHES
  }

  verify_xmarks(card: BingoCard): boolean {
    let diagMatches = 0
    let otherDiagMatches = 0
    for (let i = 0; i < BingoCard.SIZE; i++) {
      for (let j = 0; j < BingoCard.SIZE; j++) {
        if (i === j && this._findBall(card.boardValues[i]![j]!)) {
          diagMatches++
        }
        if (i + j === BingoCard.SIZE - 1 && this._findBall(card.boardValues[j]![i]!)) {
          otherDiagMatches++
        }
      }
    }
    return diagMatches === BingoCard.SIZE && otherDiagMatches === BingoCard.SIZE
  }
}

export default GameLeader
