import { GameObjects, Scene, Sound } from 'phaser'
import { Callbacks, Room } from '@colyseus/sdk'
import { client } from '../colyseus'

import MessagePanel from '../game-objects/message-panel'
import StatusPanel from '../game-objects/status-panel'
import CardHolder from '../game-objects/card-holder'
import MultiplayerToolbar from '../game-objects/multiplayer-toolbar'
import type BingoCard from '@repo/core/src/bingo-card'
import type Player from '@repo/core/src/player'
import SceneInfo from '../scene-info'
import { GAMETYPES } from '@repo/core/src/game-types'
import { GAME_KEYS, REGISTRY_KEYS } from '../common'
import { GAME_TYPE_FONT, SCORE_PANEL_FONT } from '../font-configs'

import BingoBall from '@repo/core/src/bingo-ball'

class MultiplayerBingo extends Scene {
  #sceneInfo: SceneInfo
  statusPanel: StatusPanel
  toolbar: MultiplayerToolbar
  messagePanel: MessagePanel
  cardHolder: CardHolder
  gameType: GameObjects.Text
  announceTone: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound
  room: Room

  constructor() {
    super(GAME_KEYS.MULTIPLAYERBINGO)
  }

  init() {
    this.registry.set(REGISTRY_KEYS.NUMCARDS, 1)
    this.registry.set(REGISTRY_KEYS.PLAYTONE, true)
    this.registry.set(REGISTRY_KEYS.GAMETYPE, GAMETYPES.CLASSIC)
  }

  async create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
    this.announceTone = this.sound.add('tone')

    this.toolbar = new MultiplayerToolbar(this, this.#sceneInfo.centerWidth, 35)
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
    this.events.on('joinRoom', this.joinRoom, this)
    this.events.on('leaveRoom', this.leaveRoom, this)
  }

  endGameAndReset() {
    this.statusPanel.gameOver()
    this.statusPanel.resetDisplay()
  }

  async joinRoom() {
    console.log('VV')
    try {
      const hello = await client.http.get('/api/hello')
      console.log('/api/hello →', hello.data?.message)

      this.room = await client.joinOrCreate('bingo_room', {})
      console.log('VV1')
    } catch (e) {
      console.log(`Cannot connect: ${e}`)
      await this.messagePanel.setAndClear('Joining Bing Room Failed!', 1000)
      this.events.emit('joinRoomFailed')
      return
    }
    this.room.onMessage('gameMessage', (message) => {
      this.messagePanel.setAndClear(message, 1000)
    })
    console.log('VV2')
    const callbacks = Callbacks.get(this.room)
    console.log('VV3')
    callbacks.listen('currentBingoBall', (_, currentBall) => {
      this.statusPanel.updateStatus(new BingoBall(currentBall))
    })
    console.log('VV4')
    callbacks.listen('gameOver', (previousState, currentState) => {
      if (!previousState && currentState) {
        this.endGameAndReset()
      }
    })
    console.log(`H: ${this.room.name}`)
  }

  async leaveRoom() {
    await this.room.leave(true)
  }

  async startNewGame() {
    this.room.send('ready')
  }

  async haveWinningCard(_player: Player, card: BingoCard) {
    this.room.send('haveWinningCard', { id: card.getSignature() })
  }
}

export default MultiplayerBingo
