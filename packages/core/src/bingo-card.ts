import BingoBall from './bingo-ball'
import { shuffle } from './helpers'

class BingoCard {
  public static SIZE: number = 5
  public boardValues: BingoBall[][] = []

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
}

export default BingoCard
