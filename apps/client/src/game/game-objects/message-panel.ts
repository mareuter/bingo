import { GameObjects, Scene } from 'phaser'
import { MESSANGE_PANEL_FONT } from '../font-configs'

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

class MessagePanel {
  text: GameObjects.Text

  constructor(scene: Scene, x: number, y: number) {
    this.text = scene.add.text(x, y, 'Welcome!', MESSANGE_PANEL_FONT.toPhaserFontConfig()).setOrigin(0.5)
  }

  clear() {
    this.text.setText('')
  }

  async setAndClear(text: string, delayInMillis: number = 3000) {
    this.text.setText(text)
    await sleep(delayInMillis)
    this.clear()
  }
}

export default MessagePanel
