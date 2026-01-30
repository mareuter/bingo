import { Scene, Time } from 'phaser'

import BallStatusPanel from '../game-objects/ball-status-panel'
import CurrentBallPanel from '../game-objects/current-ball-panel'
import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import CardPanel from '../game-objects/card-panel'
import BingoCard from '@repo/core/src/bingo-card'
import PlayerRecord from '@repo/core/src/player-record'
import { MAX_WOLF_CRIES } from '../common'
import StartGameButton from '../game-objects/start-new-game-button'
import MessagePanel from '../game-objects/message-panel'
import NumCardsSelector from '../game-objects/num-cards-selector'
import SceneInfo from '../scene-info'

class SoloBingo extends Scene {
  #sceneInfo: SceneInfo
  ballStatusPanel: BallStatusPanel
  currentBallPanel: CurrentBallPanel
  gameLeader: GameLeader
  cardPanels: CardPanel[]
  messagePanel: MessagePanel
  startNewGameButton: StartGameButton
  updateGameEvent: Time.TimerEvent
  player: PlayerRecord
  numCardsSelector: NumCardsSelector

  constructor() {
    super('SoloBingo')
  }

  init() {
    this.gameLeader = new GameLeader(new RandomBag())
    this.player = {
      numCards: 1,
      wolfCries: 0,
    }
  }

  create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
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

    this.messagePanel = new MessagePanel(this, this.#sceneInfo.centerWidth, 25)

    this.startNewGameButton = new StartGameButton(this, 355, 320)
    this.events.on('startNewGame', this.startNewGame, this)
    this.numCardsSelector = new NumCardsSelector(this, 545, 308)
    this.events.on(
      'numCardsSelected',
      (num: number) => {
        this.player.numCards = num
      },
      this,
    )

    this.events.on('haveWinningCard', this.handleWinningCard, this)

    this.updateGameEvent = new Time.TimerEvent({
      delay: 3000,
      callback: () => this.announceBall(),
      callbackScope: this,
      loop: !this.gameLeader.isGameOver(),
    })
  }

  async startNewGame() {
    this.player.wolfCries = 0
    this.currentBallPanel.clear()
    this.setupCardPanels()
    await this.messagePanel.setAndClear('Starting Game!')
    this.time.addEvent(this.updateGameEvent)
    this.updateGameEvent.paused = false
  }

  async announceBall() {
    const bb = this.gameLeader.announceBall()
    this.currentBallPanel.updateBall(bb)
    if (!this.gameLeader.isGameOver()) {
      this.ballStatusPanel.updateDisplay(bb)
    } else {
      this.updateGameEvent.paused = true
      await this.endGameAndReset(['Game Over!', 'Nobody Won!'])
    }
  }

  async endGameAndReset(messages: string[]): Promise<void> {
    this.time.removeEvent(this.updateGameEvent)
    this.currentBallPanel.gameOver()
    await this.messagePanel.setAndClear(messages.at(0)!)
    await this.messagePanel.setAndClear(messages.at(1)!)
    this.ballStatusPanel.resetDisplay()
    this.cardPanels.forEach((cardPanel) => {
      cardPanel.destroy()
    })
    this.gameLeader.reset()
    this.startNewGameButton.enable()
  }

  async handleWinningCard(card: BingoCard) {
    this.updateGameEvent.paused = true
    if (this.gameLeader.verify(card)) {
      await this.endGameAndReset(['Player Won!!!', 'Game Over!'])
    } else {
      await this.messagePanel.setAndClear('Player cried Wolf!!')
      this.player.wolfCries++
      if (MAX_WOLF_CRIES === this.player.wolfCries) {
        await this.endGameAndReset(['You have been kicked out!', 'Resetting game.'])
      } else {
        const wolfCriesLeft = MAX_WOLF_CRIES - this.player.wolfCries
        await this.messagePanel.setAndClear(`${wolfCriesLeft} more Wolf cries and you're out.`)
        this.updateGameEvent.paused = false
      }
    }
  }

  setupCardPanels(): void {
    this.cardPanels = []
    const deltaX = Math.floor(this.#sceneInfo.width / (this.player.numCards + 1))
    for (let i = 0; i < this.player.numCards; i++) {
      const card = new BingoCard()
      this.gameLeader.signCard(card)
      this.cardPanels.push(new CardPanel(this, (i + 1) * deltaX, 400, card))
    }
  }
}

export default SoloBingo
