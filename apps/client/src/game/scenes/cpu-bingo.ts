import { GameObjects, Scene, Sound, Time } from 'phaser'

import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import BingoCard from '@repo/core/src/bingo-card'
import PlayerRecord from '@repo/core/src/player-record'
import CpuPlayer from '@repo/core/src/cpu-player'
import { GAMETYPES } from '@repo/core/src/game-types'
import { MAX_WOLF_CRIES } from '@repo/core/src/constants'
import MessagePanel from '../game-objects/message-panel'
import SceneInfo from '../scene-info'
import StatusPanel from '../game-objects/status-panel'
import CardHolder from '../game-objects/card-holder'
import Toolbar from '../game-objects/toolbar'
import { GAME_TYPE_FONT } from '../font-configs'
import { GAME_KEYS, REGISTRY_KEYS } from '../common'

class CpuBingo extends Scene {
  #sceneInfo: SceneInfo
  statusPanel: StatusPanel
  gameLeader: GameLeader
  toolbar: Toolbar
  messagePanel: MessagePanel
  cardHolder: CardHolder
  updateGameEvent: Time.TimerEvent
  player: PlayerRecord
  cpuPlayer: CpuPlayer
  gameType: GameObjects.Text
  announceTone: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound

  constructor() {
    super(GAME_KEYS.CPUBINGO)
  }

  init() {
    this.registry.set(REGISTRY_KEYS.NUMCARDS, 1)
    this.registry.set(REGISTRY_KEYS.PLAYTONE, true)
    this.registry.set(REGISTRY_KEYS.GAMETYPE, GAMETYPES.CLASSIC)
    this.gameLeader = new GameLeader(new RandomBag())
    this.player = {
      numCards: this.registry.get(REGISTRY_KEYS.NUMCARDS),
      wolfCries: 0,
    }
    this.cpuPlayer = new CpuPlayer()
  }

  create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
    this.announceTone = this.sound.add('tone')

    this.toolbar = new Toolbar(this, this.#sceneInfo.centerWidth, 35)
    this.statusPanel = new StatusPanel(this, this.#sceneInfo.centerWidth, 190)
    this.messagePanel = new MessagePanel(this, this.#sceneInfo.centerWidth, 335)
    this.gameType = this.add
      .text(
        this.#sceneInfo.centerWidth,
        750,
        this.registry.get(REGISTRY_KEYS.GAMETYPE),
        GAME_TYPE_FONT.toPhaserFontConfig(),
      )
      .setOrigin(0.5)

    this.events.on('startNewGame', this.startNewGame, this)
    this.events.on('haveWinningCard', this.handleWinningCard, this)

    this.registry.events.on(
      'changedata',
      (_parent: object, key: string, _value: number) => {
        if (key === REGISTRY_KEYS.GAMETYPE) {
          this.gameType.text = this.registry.get(REGISTRY_KEYS.GAMETYPE)
        }
      },
      this,
    )

    this.updateGameEvent = new Time.TimerEvent({
      delay: 3000,
      callback: () => this.announceBall(),
      callbackScope: this,
      loop: !this.gameLeader.isGameOver(),
    })
  }

  async startNewGame() {
    this.cpuPlayer.setNumCards()
    this.cpuPlayer.wolfCries = 0
    this.cpuPlayer.generateCards(this.gameLeader)
    this.player.numCards = this.registry.get(REGISTRY_KEYS.NUMCARDS)
    this.player.wolfCries = 0
    this.statusPanel.clear()
    this.cardHolder = new CardHolder(this, this.#sceneInfo.width, this.player.numCards, this.gameLeader)
    await this.messagePanel.setAndClear('Starting Game!')
    this.time.addEvent(this.updateGameEvent)
    this.updateGameEvent.paused = false
  }

  async announceBall() {
    const bb = this.gameLeader.announceBall()
    if (this.registry.get(REGISTRY_KEYS.PLAYTONE)) {
      this.announceTone.play()
    }
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
  }

  async handleWinningCard(card: BingoCard) {
    this.updateGameEvent.paused = true
    if (this.gameLeader.verify(card, this.registry.get(REGISTRY_KEYS.GAMETYPE))) {
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

export default CpuBingo
