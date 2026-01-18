import { GameObjects, Scene } from 'phaser'
import { BALL_PANEL_BACKGROUND, hexNumToString } from '../common'

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

const style = {
  'background-color': hexNumToString(BALL_PANEL_BACKGROUND),
  width: '700px',
  height: '50px',
  font: '36px Arial',
  'text-align': 'center',
  'padding-top': '5px',
  'border-style': 'solid',
  'border-color': 'black',
  'border-width': '4px',
}

class MessagePanel extends GameObjects.DOMElement {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'div', style, 'Welcome!')
    this.scene.add.existing(this)
  }

  clear() {
    this.setText('')
  }

  async setAndClear(text: string, delayInMillis: number = 3000) {
    this.setText(text)
    await sleep(delayInMillis)
    this.clear()
  }
}

export default MessagePanel
