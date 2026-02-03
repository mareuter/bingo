import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAME_KEYS } from '../../common'

class QuitGameMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'quit-menu-menuoption')
  }

  onClick(): void {
    this.scene.scene.switch(GAME_KEYS.SOLOBINGO)
  }
}

export default QuitGameMenuButton
