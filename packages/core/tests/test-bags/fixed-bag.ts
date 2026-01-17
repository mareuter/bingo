import BagOfBalls from '../../src/bag-of-balls'
import BingoBall from '../../src/bingo-ball'
import { NoMoreBingoBallsError } from '../../src/bingo-errors'

class FixedBag extends BagOfBalls {
  protected balls: BingoBall[] = []

  constructor() {
    super()
    if (new.target === FixedBag) {
      throw new Error('Cannot instantiate abstract class FixedBag.')
    }
  }

  public getNext(): BingoBall {
    if (this.balls.length > 0) {
      return this.balls.shift()!
    } else {
      throw new NoMoreBingoBallsError('No Bingo balls left!')
    }
  }
}

export default FixedBag
