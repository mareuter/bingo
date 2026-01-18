import { GameObjects, Scene } from 'phaser'
import { BALL_PANEL_BACKGROUND, hexNumToString } from '../common'

const style = {
  font: '24px Arial',
  width: '200px',
  height: '40px',
  'background-color': hexNumToString(BALL_PANEL_BACKGROUND),
}

class StartGameButton extends GameObjects.DOMElement {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'button', style, 'Start New Game')
    this.setClassName('startButton')
    this.scene.add.existing(this)
    this.addListener('click')
    this.on('click', () => {
      this.scene.events.emit('startNewGame')
      const elem = document.getElementsByClassName('startButton')[0]!
      elem.setAttribute('disabled', 'true')
    })
  }

  enable() {
    const elem = document.getElementsByClassName('startButton')[0]!
    elem.removeAttribute('disabled')
  }
}

export default StartGameButton
