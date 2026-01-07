import BagOfBalls from './bag-of-balls'
import BingoBall from './bingo-ball'
import { NoMoreBingoBallsError } from './bingo-errors'
import { shuffle } from './helpers'

class RandomBag extends BagOfBalls {
  #balls: BingoBall[] = []

  constructor() {
    super()
    const temp: BingoBall[] = []
    for (let i = BingoBall.MIN; i <= BingoBall.MAX; i++) {
      temp.push(new BingoBall(i))
    }
    this.#balls = shuffle<BingoBall>(temp)
  }

  public getNext(): BingoBall {
    if (this.#balls.length > 0) {
      return this.#balls.pop()!
    } else {
      throw new NoMoreBingoBallsError('No Bingo balls left!')
    }
  }
}

export default RandomBag
