import BingoBall from './bingo-ball'
import { BingoCardAlreadySignedError } from './bingo-errors'
import { shuffle } from './helpers'

class BingoCard {
  public static SIZE: number = 5
  public boardValues: BingoBall[][] = []
  #signature: string | undefined = undefined

  constructor(fromString: string | undefined = undefined) {
    if (fromString === undefined) {
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
    } else {
      const card = JSON.parse(fromString)
      for (let i = 0; i < BingoCard.SIZE; i++) {
        this.boardValues[i] = []
        for (let j = 0; j < BingoCard.SIZE; j++) {
          this.boardValues[i]!.push(new BingoBall(card.values[i][j]))
        }
      }
    }
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

  toString(): string {
    const rows: number[][] = []
    for (let i = 0; i < BingoCard.SIZE; i++) {
      const col: number[] = []
      for (let j = 0; j < BingoCard.SIZE; j++) {
        col.push(this.boardValues[i]![j]!.number)
      }
      rows.push(col)
    }
    const card = {
      values: rows,
    }
    return JSON.stringify(card)
  }
}

export default BingoCard
