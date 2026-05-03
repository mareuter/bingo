import { GameObjects, Scene, Sound, Time } from 'phaser'

import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import BingoCard from '@repo/core/src/bingo-card'
import HumanPlayer from '@repo/core/src/human-player'
import CpuPlayer from '@repo/core/src/cpu-player'
import { GAMETYPES } from '@repo/core/src/game-types'
import { MAX_WOLF_CRIES } from '@repo/core/src/constants'
import MessagePanel from '../game-objects/message-panel'
import SceneInfo from '../scene-info'
import StatusPanel from '../game-objects/status-panel'
import CardHolder from '../game-objects/card-holder'
import Toolbar from '../game-objects/toolbar'
import { GAME_TYPE_FONT, SCORE_PANEL_FONT } from '../font-configs'
import { GAME_KEYS, REGISTRY_KEYS } from '../common'
import Player from '@repo/core/src/player'
import CpuCardHolder from '../game-objects/cpu-card-holder'

class CpuBingo extends Scene {
  #sceneInfo: SceneInfo
  statusPanel: StatusPanel
  gameLeader: GameLeader
  toolbar: Toolbar
  messagePanel: MessagePanel
  cardHolder: CardHolder
  cpuCardHolder: CpuCardHolder
  updateGameEvent: Time.TimerEvent
  player: HumanPlayer
  cpuPlayer: CpuPlayer
  gameType: GameObjects.Text
  playerScore: GameObjects.Text
  cpuScore: GameObjects.Text
  announceTone: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound

  constructor() {
    super(GAME_KEYS.CPUBINGO)
  }

  _makeScoreString(player: Player, regKey: string): string {
    const score: number = this.registry.get(regKey)
    return `${player.name}: ` + score.toString().padStart(3, ' ')
  }

  init() {
    this.registry.set(REGISTRY_KEYS.NUMCARDS, 1)
    this.registry.set(REGISTRY_KEYS.PLAYTONE, true)
    this.registry.set(REGISTRY_KEYS.GAMETYPE, GAMETYPES.CLASSIC)
    this.registry.set(REGISTRY_KEYS.PLAYERSCORE, 100)
    this.registry.set(REGISTRY_KEYS.CPUSCORE, 100)
    this.gameLeader = new GameLeader(new RandomBag())
    this.player = new HumanPlayer('Player')
    this.cpuPlayer = new CpuPlayer()
  }

  create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
    this.announceTone = this.sound.add('tone')

    this.playerScore = this.add
      .text(
        (1 / 24) * this.#sceneInfo.centerWidth,
        35,
        this._makeScoreString(this.player, REGISTRY_KEYS.PLAYERSCORE),
        SCORE_PANEL_FONT.toPhaserFontConfig(),
      )
      .setOrigin(0, 0.5)
    this.cpuScore = this.add
      .text(
        (13 / 8) * this.#sceneInfo.centerWidth,
        35,
        this._makeScoreString(this.cpuPlayer, REGISTRY_KEYS.CPUSCORE),
        SCORE_PANEL_FONT.toPhaserFontConfig(),
      )
      .setOrigin(0, 0.5)

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
    this.events.on('haveWinningCard', this.haveWinningCard, this)

    this.registry.events.on(
      'changedata',
      (_parent: object, key: string, _value: number) => {
        if (key === REGISTRY_KEYS.GAMETYPE) {
          this.gameType.text = this.registry.get(REGISTRY_KEYS.GAMETYPE)
        }
        if (key === REGISTRY_KEYS.CPUSCORE) {
          this.cpuScore.text = this._makeScoreString(this.cpuPlayer, REGISTRY_KEYS.CPUSCORE)
        }
        if (key === REGISTRY_KEYS.PLAYERSCORE) {
          this.playerScore.text = this._makeScoreString(this.player, REGISTRY_KEYS.PLAYERSCORE)
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
    this.cpuPlayer.reset()
    this.cpuPlayer.generateCards(this.gameLeader)
    this.player.reset(this.registry.get(REGISTRY_KEYS.NUMCARDS))
    this.player.generateCards(this.gameLeader)
    this.statusPanel.clear()
    this.cardHolder = new CardHolder(this, this.#sceneInfo.width, this.player)
    this.cpuCardHolder = new CpuCardHolder(this, this.cpuPlayer)
    await this.messagePanel.setAndClear('Starting Game!')
    await this.messagePanel.setAndClear(`CPU has ${this.cpuPlayer.numCards} cards.`)
    this.time.addEvent(this.updateGameEvent)
    this.updateGameEvent.paused = false
  }

  async announceBall() {
    const bb = this.gameLeader.announceBall()
    if (this.registry.get(REGISTRY_KEYS.PLAYTONE)) {
      this.announceTone.play()
    }
    this.statusPanel.updateStatus(bb)
    this.events.emit('announceBall', this.gameLeader, this.registry.get(REGISTRY_KEYS.GAMETYPE))
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
    this.cpuCardHolder.destroy()
    this.gameLeader.reset()
    this.events.emit('endGame')
  }

  async haveWinningCard(player: Player, card: BingoCard) {
    console.log(`Checking winning card for ${player.name}`)
    this.updateGameEvent.paused = true
    if (this.gameLeader.verify(card, this.registry.get(REGISTRY_KEYS.GAMETYPE))) {
      if (player.name === 'CPU') {
        this.registry.inc(REGISTRY_KEYS.CPUSCORE)
      }
      if (player.name === 'Player') {
        this.registry.inc(REGISTRY_KEYS.PLAYERSCORE)
      }
      await this.endGameAndReset([`${player.name} Won!!!`, 'Game Over!'])
    } else {
      await this.messagePanel.setAndClear(`${player.name} cried Wolf!!`)
      player.wolfCries++
      if (MAX_WOLF_CRIES === player.wolfCries) {
        let winner = undefined
        if (player.name === 'CPU') {
          winner = this.player.name
          this.registry.inc(REGISTRY_KEYS.PLAYERSCORE)
        } else {
          winner = this.cpuPlayer.name
          this.registry.inc(REGISTRY_KEYS.CPUSCORE)
        }
        await this.messagePanel.setAndClear(`${player.name} has been kicked out!`)
        await this.endGameAndReset([`${winner} Won.`, 'Resetting game.'])
      } else {
        const wolfCriesLeft = MAX_WOLF_CRIES - player.wolfCries
        await this.messagePanel.setAndClear(`${wolfCriesLeft} more Wolf cries and you're out.`)
        this.updateGameEvent.paused = false
      }
    }
  }
}

export default CpuBingo
