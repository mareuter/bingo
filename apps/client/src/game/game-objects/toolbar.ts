import { Scene } from 'phaser'
import StartButton from './toolbar/start-button'
import MenuButton from './toolbar/menu-button'

class Toolbar {
  startButton: StartButton
  menuButton: MenuButton

  constructor(scene: Scene, x: number, y: number) {
    const offsetX = 30
    this.startButton = new StartButton(scene, x - offsetX, y, 'start-button')
    this.menuButton = new MenuButton(scene, x + offsetX, y, 'game-menu-button')
  }
}

export default Toolbar
