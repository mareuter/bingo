import { Scene } from 'phaser'
import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import SceneInfo from '../scene-info'
import { GAME_KEYS, REGISTRY_KEYS } from '../common'
import { GAMETYPES } from '@repo/core/src/game-types'
import { Client, Room } from '@colyseus/sdk'

class CpuBingo extends Scene {
  #sceneInfo: SceneInfo
  gameLeader: GameLeader
  client: Client = new Client('http://localhost:2567')
  room: Room

  constructor() {
    super(GAME_KEYS.CPUBINGO)
  }

  init() {
    this.registry.set(REGISTRY_KEYS.NUMCARDS, 1)
    this.registry.set(REGISTRY_KEYS.PLAYTONE, true)
    this.registry.set(REGISTRY_KEYS.GAMETYPE, GAMETYPES.CLASSIC)
    this.gameLeader = new GameLeader(new RandomBag())
  }

  async create() {
    this.#sceneInfo = new SceneInfo(this)
    this.add.image(this.#sceneInfo.centerWidth, this.#sceneInfo.centerHeight, 'background')
    console.log('OK')

    try {
      this.room = await this.client.joinOrCreate('my_room')
      console.log('Joined successfully!')
    } catch (e) {
      console.error(e)
    }
  }
}

export default CpuBingo
