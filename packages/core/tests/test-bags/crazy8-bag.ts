import FixedBag from './fixed-bag'
import BingoBall from '../../src/bingo-ball'

class Crazy8Bag extends FixedBag {
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
      new BingoBall(18),
      new BingoBall(47),
      new BingoBall(10),
      new BingoBall(52),
      new BingoBall(21),
      new BingoBall(3),
      new BingoBall(55),
      new BingoBall(19),
      new BingoBall(64),
      new BingoBall(6),
      new BingoBall(20),
      new BingoBall(69),
      new BingoBall(53),
      new BingoBall(1),
      new BingoBall(45),
      new BingoBall(36),
      new BingoBall(61),
      new BingoBall(BingoBall.GAME_OVER),
    ]
  }
}

export default Crazy8Bag
