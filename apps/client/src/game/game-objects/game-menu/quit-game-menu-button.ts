import { Scene } from 'phaser'
import MenuOptionButton from '../../menu-option-button'
import { GAME_KEYS } from '../../common'

class QuitGameMenuButton extends MenuOptionButton {
  constructor(scene: Scene, x: number, y: number, imageName: string) {
    super(scene, x, y, imageName)
  }

  onClick(): void {
    this.scene.scene.switch(GAME_KEYS.SOLOBINGO)
  }
}

export default QuitGameMenuButton
