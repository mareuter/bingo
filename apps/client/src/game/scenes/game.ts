import { GameObjects, Scene, Time } from 'phaser'

import BallStatusPanel from '../game-objects/ball-status-panel'
import CurrentBallPanel from '../game-objects/current-ball-panel'
import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import { NoMoreBingoBallsError } from '@repo/core/src/bingo-errors'
import CardPanel from '../game-objects/card-panel'
import BingoCard from '@repo/core/src/bingo-card'
import { BALL_PANEL_BACKGROUND, hexNumToString } from '../common'
import StartGameButton from '../game-objects/start-new-game-button'
import BingoBall from '@repo/core/src/bingo-ball'
import MessagePanel from '../game-objects/message-panel'

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

class Game extends Scene {
  ballStatusPanel: BallStatusPanel
  currentBallPanel: CurrentBallPanel
  gameLeader: GameLeader
  cardPanel: CardPanel
  timeline: Time.Timeline
  messagePanel: MessagePanel
  startNewGameButton: StartGameButton

  constructor() {
    super('Game')
  }

  init() {
    this.gameLeader = new GameLeader(new RandomBag())
  }

  create() {
    const statusX = 602
    const statusY = 200
    this.ballStatusPanel = new BallStatusPanel(this, statusX, statusY)
    this.currentBallPanel = new CurrentBallPanel(
      this,
      statusX,
      statusY,
      this.ballStatusPanel.fullWidth / 2,
      this.ballStatusPanel.height,
    )

    this.messagePanel = new MessagePanel(this, 512, 66)

    this.startNewGameButton = new StartGameButton(this, 512, 320)
    this.events.on('startNewGame', this.startNewGame, this)

    this.cardPanel = new CardPanel(this, 512, 450, new BingoCard())
    this.events.on('haveWinningCard', this.handleWinningCard, this)

    this.timeline = this.add.timeline({
      from: 5000,
      run: () => this.announceBall(),
    })
  }

  async startNewGame() {
    this.currentBallPanel.clear()
    await this.messagePanel.setAndClear('Starting Game!')
    this.timeline.repeat().play()
  }

  announceBall() {
    const bb = this.gameLeader.announceBall()
    this.currentBallPanel.updateBall(bb)
    if (bb.number !== BingoBall.GAME_OVER) {
      this.ballStatusPanel.updateDisplay(bb)
    } else {
      this.timeline.stop()
      this.startNewGameButton.enable()
    }
  }

  async handleWinningCard(card: BingoCard) {
    this.timeline.pause()
    if (this.gameLeader.verify(card)) {
      this.timeline.stop()
      this.currentBallPanel.updateBall(new BingoBall(BingoBall.GAME_OVER))
      await this.messagePanel.setAndClear('Player Won!!!')
      await this.messagePanel.setAndClear('Game Over!')
      this.startNewGameButton.enable()
    } else {
      await this.messagePanel.setAndClear('Player cried Wolf!! ... Be careful!!')
      this.timeline.resume()
    }
  }
}

export default Game
