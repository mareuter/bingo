import { Scene } from 'phaser'
import StartGameButton from './toolbar/start-game-button'
import GameOptionsButton from './toolbar/game-options-button'

class Toolbar {
  startGameButton: StartGameButton
  gameOptionsButton: GameOptionsButton

  constructor(scene: Scene, x: number, y: number) {
    const offsetX = 30
    this.startGameButton = new StartGameButton(scene, x - offsetX, y)
    this.gameOptionsButton = new GameOptionsButton(scene, x + offsetX, y)
  }
}

export default Toolbar
