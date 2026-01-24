import BingoBall from './bingo-ball'
import { BingoCardAlreadySignedError } from './bingo-errors'
import { shuffle } from './helpers'

class BingoCard {
  public static SIZE: number = 5
  public boardValues: BingoBall[][] = []
  #signature: string | undefined = undefined

  constructor() {
    for (let i = 0; i < BingoCard.SIZE; i++) {
      this.boardValues[i] = []
      const min = BingoBall.RANGE * i + 1
      const max = BingoBall.RANGE * (i + 1)
      const columnValues: number[] = []
      for (let j = min; j <= max; j++) {
        columnValues.push(j)
      }
      const shuffled = shuffle<number>(columnValues)
      for (let k = 0; k < BingoCard.SIZE; k++) {
        this.boardValues[i]!.push(new BingoBall(shuffled[k]!))
      }
    }
    this.boardValues[2]![2]! = new BingoBall(BingoBall.FREE_SPACE)
  }

  getSignature(): string | undefined {
    return this.#signature
  }

  setSignature(signature: string) {
    if (this.#signature === undefined) {
      this.#signature = signature
    } else {
      throw new BingoCardAlreadySignedError('Cannot sign Bingo card again!')
    }
  }
}

export default BingoCard
