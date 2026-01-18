import FixedBag from './fixed-bag'
import BingoBall from '../../src/bingo-ball'

class ShortBag extends FixedBag {
  constructor() {
    super()
    this._setup()
  }

  private _setup(): void {
    this.balls = [new BingoBall(47), new BingoBall(1)]
  }

  public refillBag(): void {
    this._setup()
  }
}

export default ShortBag
