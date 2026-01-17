import BagOfBalls from './bag-of-balls'
import BingoBall from './bingo-ball'
import { NoMoreBingoBallsError } from './bingo-errors'
import { shuffle } from './helpers'

class RandomBag extends BagOfBalls {
  #balls: BingoBall[] = []

  constructor() {
    super()
    for (let i = BingoBall.MIN; i <= BingoBall.MAX; i++) {
      this.#balls.push(new BingoBall(i))
    }
  }

  public getNext(): BingoBall {
    if (this.#balls.length > 1) {
      this.#balls = shuffle<BingoBall>(this.#balls)
    }
    if (this.#balls.length > 0) {
      return this.#balls.pop()!
    } else {
      throw new NoMoreBingoBallsError('No Bingo balls left!')
    }
  }
}

export default RandomBag
