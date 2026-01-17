import FixedBag from './fixed-bag'
import BingoBall from '../../src/bingo-ball'

class RowBag extends FixedBag {
  constructor() {
    super()
    this.balls = [
      new BingoBall(16),
      new BingoBall(2),
      new BingoBall(32),
      new BingoBall(74),
      new BingoBall(42),
      new BingoBall(13),
      new BingoBall(70),
      new BingoBall(56),
      new BingoBall(39),
      new BingoBall(23),
      new BingoBall(75),
      new BingoBall(BingoBall.GAME_OVER),
    ]
  }
}

export default RowBag
