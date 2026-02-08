import ColorHelper from './color-helper'
import FontHelper from './font-helper'

class ToggleFont extends FontHelper {
  downColor: ColorHelper

  constructor(
    name: string,
    size: number,
    upColor: string,
    downColor: string,
    stroke: string,
    strokeThickness: number,
    alignment: string,
    padding: number,
  ) {
    super(name, size, upColor, stroke, strokeThickness, alignment, padding)
    this.downColor = new ColorHelper(downColor)
  }

  getUpColor(): string {
    return this.color.value
  }

  getDownColor(): string {
    return this.downColor.value
  }
}

export default ToggleFont
