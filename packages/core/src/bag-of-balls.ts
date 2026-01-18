import BingoBall from './bingo-ball'

class BagOfBalls {
  constructor() {
    if (new.target === BagOfBalls) {
      throw new Error('Cannot instantiate abstract class BagOfBalls.')
    }
  }

  public getNext(): BingoBall {
    throw new Error('Method getNext() must be implemented.')
  }

  public get length(): number {
    throw new Error('Method length() must be implemented.')
  }

  public refillBag(): void {
    throw new Error('Method refillBag() must be implemented.')
  }
}

export default BagOfBalls
