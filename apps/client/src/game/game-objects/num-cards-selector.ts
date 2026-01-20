import { GameObjects, Scene } from 'phaser'
import { BALL_PANEL_BACKGROUND, hexNumToString } from '../common'

const styleMaker = (style: Map<string, string>): string => {
  let styleStr = ''
  for (const [key, value] of style) {
    styleStr += `${key}: ${value}; `
  }
  return styleStr
}

const divStyle = new Map<string, string>()
divStyle.set('display', 'flex')
divStyle.set('flex-direction', 'row')
divStyle.set('background-color', hexNumToString(BALL_PANEL_BACKGROUND))
divStyle.set('font', '24px Arial')
divStyle.set('height', '35px')
divStyle.set('width', '280px')
divStyle.set('padding-top', '5px')
divStyle.set('border-style', 'solid')
divStyle.set('border-color', 'black')

const textStyle = new Map<string, string>()
textStyle.set('color', 'black')
textStyle.set('padding-left', '5px')
textStyle.set('vertical-align', 'middle')

const labelStyle = new Map<string, string>()
labelStyle.set('color', 'black')
labelStyle.set('vertical-align', 'middle')
labelStyle.set('padding-right', '5px')

const divStyleStr = styleMaker(divStyle)
const labelStyleStr = styleMaker(labelStyle)
const textStyleStr = styleMaker(textStyle)

class NumCardsSelector extends GameObjects.DOMElement {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y)
    this.createFromCache('numCardsSelector')

    const div = document.getElementsByName('num-card-selector-div')[0]!
    div.style = divStyleStr

    const text = document.getElementsByName('num-card-selector-text')[0]!
    text.style = textStyleStr

    const labels = document.getElementsByName('num-card-selector-label')
    labels.forEach((element) => {
      element.style = labelStyleStr
    })

    this.scene.add.existing(this)

    this.addListener('click')
    this.on('click', (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.value !== undefined) {
        this.scene.events.emit('numCardsSelected', parseInt(input.value))
      }
    })
  }
}

export default NumCardsSelector
