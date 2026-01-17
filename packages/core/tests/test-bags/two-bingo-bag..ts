import FixedBag from './fixed-bag'
import BingoBall from '../../src/bingo-ball'

class TwoBingoBag extends FixedBag {
  constructor() {
    super()
    this.balls = [
      new BingoBall(18),
      new BingoBall(1),
      new BingoBall(31),
      new BingoBall(74),
      new BingoBall(42),
      new BingoBall(10),
      new BingoBall(70),
      new BingoBall(56),
      new BingoBall(36),
      new BingoBall(23),
      new BingoBall(75),
      new BingoBall(49),
      new BingoBall(55),
      new BingoBall(BingoBall.GAME_OVER),
    ]
  }
}

export default TwoBingoBag
