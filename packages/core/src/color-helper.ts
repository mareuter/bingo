class ColorHelper {
  value: string

  constructor(value: string) {
    this.value = value
  }

  stringToNumber(): number {
    const hex = this.value.replace('#', '0x')
    return Number(hex)
  }
}

export default ColorHelper
