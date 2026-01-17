import FixedBag from './fixed-bag'
import BingoBall from '../../src/bingo-ball'

class NoBingoBag extends FixedBag {
  constructor() {
    super()
    this.balls = [
      new BingoBall(47),
      new BingoBall(1),
      new BingoBall(32),
      new BingoBall(36),
      new BingoBall(49),
      new BingoBall(16),
      new BingoBall(8),
      new BingoBall(45),
      new BingoBall(56),
      new BingoBall(55),
      new BingoBall(61),
      new BingoBall(42),
      new BingoBall(70),
      new BingoBall(BingoBall.GAME_OVER),
    ]
  }
}

export default NoBingoBag
