import MenuOptionButton from '../../menu-option-button'
import GameMenu from '../../scenes/game-menu'

class QuitGameMenuButton extends MenuOptionButton {
  #bingoScene: string

  constructor(scene: GameMenu, x: number, y: number) {
    super(scene, x, y, 'quit-menu-menuoption')
    this.#bingoScene = scene.bingoScene
  }

  onClick(): void {
    this.scene.scene.switch(this.#bingoScene)
  }
}

export default QuitGameMenuButton
