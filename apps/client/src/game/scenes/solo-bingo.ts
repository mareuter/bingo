import { Scene, Time } from 'phaser'

import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import BingoCard from '@repo/core/src/bingo-card'
import PlayerRecord from '@repo/core/src/player-record'
import { GAME_KEYS, MAX_WOLF_CRIES } from '../common'
import StartGameButton from '../game-objects/start-new-game-button'
import MessagePanel from '../game-objects/message-panel'
import NumCardsSelector from '../game-objects/num-cards-selector'
import SceneInfo from '../scene-info'
import StatusPanel from '../game-objects/status-panel'
import CardHolder from '../game-objects/card-holder'
import Toolbar from '../game-objects/toolbar'

class SoloBingo extends Scene {
  #sceneInfo: SceneInfo
  statusPanel: StatusPanel
  gameLeader: GameLeader
  toolbar: Toolbar
  messagePanel: MessagePanel
  startNewGameButton: StartGameButton
  cardHolder: CardHolder
  updateGameEvent: Time.TimerEvent
  player: PlayerRecord
  numCardsSelector: NumCardsSelector

  constructor() {
    super(GAME_KEYS.SOLOBINGO)
  }

  init() {
    this.registry.set('numCards', 1)
    this.gameLeader = new GameLeader(new RandomBag())
    this.player = {
      numCards: this.registry.get('numCards'),
      wolfCries: 0,
    }
  }

  create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')

    this.toolbar = new Toolbar(this, 70, 25)
    this.messagePanel = new MessagePanel(this, this.#sceneInfo.centerWidth, 25)
    this.statusPanel = new StatusPanel(this, this.#sceneInfo.centerWidth, 170)

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
    this.player.numCards = this.registry.get('numCards')
    this.player.wolfCries = 0
    this.statusPanel.clear()
    this.cardHolder = new CardHolder(this, this.#sceneInfo.width, this.player.numCards, this.gameLeader)
    await this.messagePanel.setAndClear('Starting Game!')
    this.time.addEvent(this.updateGameEvent)
    this.updateGameEvent.paused = false
  }

  async announceBall() {
    const bb = this.gameLeader.announceBall()
    this.statusPanel.updateStatus(bb)
    if (this.gameLeader.isGameOver()) {
      this.updateGameEvent.paused = true
      await this.endGameAndReset(['Game Over!', 'Nobody Won!'])
    }
  }

  async endGameAndReset(messages: string[]): Promise<void> {
    this.time.removeEvent(this.updateGameEvent)
    this.statusPanel.gameOver()
    await this.messagePanel.setAndClear(messages.at(0)!)
    await this.messagePanel.setAndClear(messages.at(1)!)
    this.statusPanel.resetDisplay()
    this.cardHolder.destroy()
    this.gameLeader.reset()
    this.events.emit('endGame')
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
}

export default SoloBingo
