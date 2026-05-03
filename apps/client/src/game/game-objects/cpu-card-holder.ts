import { Scene } from 'phaser'
import BaseCardHolder from './base-card-holder'
import GameLeader from '@repo/core/src/game-leader'
import CpuPlayer from '@repo/core/src/cpu-player'
import { GameTypes } from '@repo/core/src/game-types'

class CpuCardHolder extends BaseCardHolder {
  constructor(scene: Scene, player: CpuPlayer) {
    super(scene, player)
    this.scene.events.on('announceBall', this.checkCards, this)
  }

  checkCards(gameLeader: GameLeader, gameType: GameTypes) {
    const card = (this.player as CpuPlayer).checkCards(gameLeader, gameType)
    if (card !== undefined) {
      this.handleWinningCard(card)
    }
  }

  destroy() {
    super.destroy()
    this.scene.events.off('announceBall')
  }
}

export default CpuCardHolder
