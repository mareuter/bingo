import { Scene, Time } from 'phaser'

import BallStatusPanel from '../game_objects/BallStatusPanel'
import CurrentBallPanel from '../game_objects/CurrentBallPanel'
import RandomBag from '@repo/core/src/random-bag'
import { NoMoreBingoBallsError } from '@repo/core/src/bingo-errors'

class Game extends Scene {
  ballStatusPanel: BallStatusPanel
  currentBallPanel: CurrentBallPanel
  bagOfBalls: RandomBag
  timeline: Time.Timeline

  constructor() {
    super('Game')
  }

  init() {
    this.bagOfBalls = new RandomBag()
  }

  create() {
    const statusX = 602
    const statusY = 200
    this.ballStatusPanel = new BallStatusPanel(this, statusX, statusY)
    this.currentBallPanel = new CurrentBallPanel(this, statusX, statusY, this.ballStatusPanel.fullWidth / 2, this.ballStatusPanel.height)

    this.timeline = this.add.timeline({
      from: 5000,
      run: () => this.announceBall()
    })

    this.timeline.repeat().play()
  }

  announceBall() {
    try {
      const bb = this.bagOfBalls.getNext()
      this.currentBallPanel.updateBall(bb)
      this.ballStatusPanel.updateDisplay(bb)
    } catch (error) {
      if (error instanceof NoMoreBingoBallsError) {
        this.timeline.stop()
        this.currentBallPanel.clear()
      }
    }
  }
}

export default Game
