import ColorHelper from './color-helper'

class FontHelper {
  name: string
  size: number
  color: ColorHelper
  stroke: ColorHelper
  strokeThickness: number
  alignment: string
  padding: number

  constructor(
    name: string,
    size: number,
    color: string,
    stroke: string,
    strokeThickness: number,
    alignment: string,
    padding: number,
  ) {
    this.name = name
    this.size = size
    this.color = new ColorHelper(color)
    this.stroke = new ColorHelper(stroke)
    this.strokeThickness = strokeThickness
    this.alignment = alignment
    this.padding = padding
  }

  toPhaserFontConfig() {
    return {
      fontFamily: this.name,
      fontSize: this.size,
      color: this.color.value,
      stroke: this.stroke.value,
      strokeThickness: this.strokeThickness,
      align: this.alignment,
      padding: {
        left: this.padding,
        right: this.padding,
        top: this.padding,
        bottom: this.padding,
      },
    }
  }
}

export default FontHelper
