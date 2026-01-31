import { GameObjects, Scene } from 'phaser'

import BingoBall from '@repo/core/src/bingo-ball'
import { COLUMNS } from '@repo/core/src/constants'
import { BALL_COLUMN_FONT, BALL_RANGE_FONT, BALL_FONT } from '../font-configs'

class StatusPanel {
  scene: Scene
  x: number
  y: number
  panel: GameObjects.Image
  display: GameObjects.Text[][]
  ball: GameObjects.Image
  ballText: GameObjects.Text

  constructor(scene: Scene, x: number, y: number) {
    this.scene = scene
    this.x = x
    this.y = y
    this.panel = scene.add.image(this.x, this.y, 'status-board')
    const leftEdge = this.panel.getLeftCenter()
    console.log(`A: ${leftEdge.x}, ${leftEdge.y}`)

    const deltaX = BALL_COLUMN_FONT.size + 2 * BALL_COLUMN_FONT.padding
    const deltaY = deltaX

    this.display = []
    const offsetX = this.x + 90
    const columnTextConfig = BALL_COLUMN_FONT.toPhaserFontConfig()
    const numberTextConfig = BALL_RANGE_FONT.toPhaserFontConfig()
    for (let i = 0; i < COLUMNS.length; i++) {
      this.display[i] = []
      const xp = offsetX - BingoBall.RANGE * (deltaX / 2)
      const yp = this.y + (i - 2) * deltaY
      this.scene.add.text(xp, yp, COLUMNS[i]!, columnTextConfig).setOrigin(0.5)

      for (let j = 1; j <= BingoBall.RANGE; j++) {
        const value = BingoBall.RANGE * i + j
        const xp1 = offsetX - ((BingoBall.RANGE - j * 2) * deltaX) / 2
        const num = this.scene.add.text(xp1, yp, value.toString(), numberTextConfig).setOrigin(0.5)
        this.display[i]?.push(num)
      }
    }

    const ballCenter = leftEdge.x + 103
    this.ball = this.scene.add.image(ballCenter, this.y, 'bingo-ball').setOrigin(0.5)
    this.ballText = this.scene.add.text(ballCenter, this.y, 'B15', BALL_FONT.toPhaserFontConfig()).setOrigin(0.5)

    this.ball.setVisible(false)
    this.ballText.setVisible(false)
  }

  clear() {
    this.ball.setVisible(false)
    this.ballText.setVisible(false)
  }

  gameOver() {
    this.updateStatus(new BingoBall(BingoBall.GAME_OVER))
  }

  resetDisplay() {
    this.display.forEach((subArray) => {
      subArray.forEach((element) => {
        element.setVisible(true)
      })
    })
  }

  updateStatus(bb: BingoBall) {
    if (!this.ball.visible) {
      this.ball.setVisible(true)
    }
    if (!this.ballText.visible) {
      this.ballText.setVisible(true)
    }
    if (bb.number === BingoBall.GAME_OVER) {
      this.ball.setVisible(false)
      this.ballText.text = 'Game\nOver'
    } else {
      this.ballText.text = bb.toString()

      const rowIndex = COLUMNS.indexOf(bb.getLetter())
      const colIndex = bb.number - BingoBall.RANGE * rowIndex - 1
      this.display[rowIndex]![colIndex]?.setVisible(false)
    }
  }
}

export default StatusPanel
