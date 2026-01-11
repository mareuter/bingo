import { GameObjects, Scene } from 'phaser'

import BingoBall from '@repo/core/src/bingo-ball'
import { COLUMNS } from '@repo/core/src/constants'

class BallStatusPanel {
  scene: Scene
  x: number
  y: number
  height: number
  width: number
  fullWidth: number
  border: GameObjects.Rectangle
  display: GameObjects.Text[][]

  constructor(scene: Scene, x: number, y: number) {
    this.scene = scene
    this.x = x
    this.y = y
    const fontSize = 30
    const padding = 5
    const deltaX = fontSize + 2 * padding
    const deltaY = deltaX

    this.width = (BingoBall.RANGE + 1) * deltaX
    console.log(deltaX)
    this.fullWidth = this.width + 1.5 * deltaX + 16
    console.log(this.width, deltaX, this.fullWidth)
    this.height = COLUMNS.length * deltaY
    this.border = this.scene.add.rectangle(x, y, this.width, this.height, 0x858585)
    this.border.setStrokeStyle(4, 0x0)

    this.display = []
    for (let i = 0; i < COLUMNS.length; i++) {
      this.display[i] = []
      const xp = this.x - BingoBall.RANGE * (deltaX / 2)
      const yp = this.y + (i - 2) * deltaY
      this.scene.add
        .text(xp, yp, COLUMNS[i]!, {
          fontFamily: 'Arial Black',
          fontSize: fontSize,
          color: '#3e3e3d3d',
          stroke: '#000000',
          strokeThickness: 2,
          align: 'center',
          padding: {
            left: padding,
            right: padding,
            top: padding,
            bottom: padding,
          },
        })
        .setOrigin(0.5)
      for (let j = 1; j <= BingoBall.RANGE; j++) {
        const value = BingoBall.RANGE * i + j
        const xp1 = this.x - ((BingoBall.RANGE - j * 2) * deltaX) / 2
        const num = this.scene.add
          .text(xp1, yp, value.toString(), {
            fontFamily: 'Arial Black',
            fontSize: fontSize,
            color: '#edd45bff',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center',
            padding: {
              left: padding,
              right: padding,
              top: padding,
              bottom: padding,
            },
          })
          .setOrigin(0.5)
        this.display[i]?.push(num)
      }
    }
  }

  updateDisplay(bb: BingoBall) {
    const rowIndex = COLUMNS.indexOf(bb.getLetter())
    const colIndex = bb.number - BingoBall.RANGE * rowIndex - 1
    this.display[rowIndex]![colIndex]?.setVisible(false)
  }

  resetDisplay() {
    this.display.forEach(subArray => {
        subArray.forEach(element => {
            element.setVisible(true)
        })
    })
  }
}

export default BallStatusPanel
