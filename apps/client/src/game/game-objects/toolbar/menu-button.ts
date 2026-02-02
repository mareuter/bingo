import { Scene } from 'phaser'
import ToggleButton from '../../toggle-button'
import { GAME_KEYS } from '../../common'

class MenuButton extends ToggleButton {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)

    this.scene.events.on('startNewGame', () => this.disable())
    this.scene.events.on('endGame', () => this.enable())
  }

  onClick(): void {
    console.log('Step 1')
    this.scene.scene.switch(GAME_KEYS.GAMEMENU)
  }
}

export default MenuButton
