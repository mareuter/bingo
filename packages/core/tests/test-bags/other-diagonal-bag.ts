import FixedBag from './fixed-bag'
import BingoBall from '../../src/bingo-ball'

class OtherDiagonalBag extends FixedBag {
  constructor() {
    super()
    this.balls = [
      new BingoBall(18),
      new BingoBall(1),
      new BingoBall(32),
      new BingoBall(69),
      new BingoBall(49),
      new BingoBall(29),
      new BingoBall(8),
      new BingoBall(74),
      new BingoBall(56),
      new BingoBall(10),
      new BingoBall(61),
      new BingoBall(42),
      new BingoBall(75),
      new BingoBall(BingoBall.GAME_OVER),
    ]
  }
}

export default OtherDiagonalBag
