import { Scene } from 'phaser'
import StartGameButton from './toolbar/start-game-button'
import GameOptionsButton from './toolbar/game-options-button'
import ToneButton from './toolbar/tone-button'

class Toolbar {
  startGameButton: StartGameButton
  gameOptionsButton: GameOptionsButton
  toneButton: ToneButton

  constructor(scene: Scene, x: number, y: number) {
    const offsetX = 70
    this.startGameButton = new StartGameButton(scene, x - offsetX, y)
    this.gameOptionsButton = new GameOptionsButton(scene, x, y)
    this.toneButton = new ToneButton(scene, x + offsetX, y)
  }
}

export default Toolbar
