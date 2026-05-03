import { Scene } from 'phaser'
import Player from '@repo/core/src/player'
import BingoCard from '@repo/core/src/bingo-card'

class BaseCardHolder {
  scene: Scene
  player: Player

  constructor(scene: Scene, player: Player) {
    this.scene = scene
    this.player = player
    this.scene.events.on('handleWinningCard', this.handleWinningCard, this)
  }

  handleWinningCard(card: BingoCard) {
    const hasId = this.player.bingoCards.find((u) => u.getSignature() === card.getSignature())
    if (hasId !== undefined) {
      this.scene.events.emit('haveWinningCard', this.player, card)
    }
  }

  destroy() {
    this.scene.events.off('handleWinningCard')
  }
}

export default BaseCardHolder
