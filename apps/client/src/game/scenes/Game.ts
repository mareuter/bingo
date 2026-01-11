import { Scene } from 'phaser'

import BallStatusPanel from '../game_objects/BallStatusPanel'
import CurrentBallPanel from '../game_objects/CurrentBallPanel'

class Game extends Scene {
  ballStatusPanel: BallStatusPanel
  currentBallPanel: CurrentBallPanel

  constructor() {
    super('Game')
  }

  create() {
    const statusX = 602
    const statusY = 200
    this.ballStatusPanel = new BallStatusPanel(this, statusX, statusY)
    this.currentBallPanel = new CurrentBallPanel(this, statusX, statusY, this.ballStatusPanel.fullWidth / 2, this.ballStatusPanel.height)
  }
}

export default Game
