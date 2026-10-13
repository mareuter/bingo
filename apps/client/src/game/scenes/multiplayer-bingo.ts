import { GameObjects, Scene, Sound } from 'phaser'
import { Room } from '@colyseus/sdk'

import MessagePanel from '../game-objects/message-panel'
import StatusPanel from '../game-objects/status-panel'
import CardHolder from '../game-objects/card-holder'
import Toolbar from '../game-objects/toolbar'
import SceneInfo from '../scene-info'
import { GAMETYPES } from '@repo/core/src/game-types'
import { GAME_KEYS, REGISTRY_KEYS } from '../common'
import { GAME_TYPE_FONT, SCORE_PANEL_FONT } from '../font-configs'
import { client } from '../colyseus'

class MultiplayerBingo extends Scene {
  #sceneInfo: SceneInfo
  statusPanel: StatusPanel
  toolbar: Toolbar
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

    this.room = await client.joinOrCreate('bingo_room')
  }

  async startNewGame() {}

  async haveWinningCard() {}
}

export default MultiplayerBingo
