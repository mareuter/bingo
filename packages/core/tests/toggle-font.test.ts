import { expect, test } from 'vitest'

import ToggleFont from '../src/toggle-font'

test('Test toggle font', () => {
  const fontName = 'Arial Black'
  const fontSize = 50
  const upColor = '#53e2a4'
  const downColor = '#168354'
  const stroke = '#11e44a'
  const strokeThickness = 4
  const alignment = 'center'
  const padding = 5

  const tf = new ToggleFont(fontName, fontSize, upColor, downColor, stroke, strokeThickness, alignment, padding)
  expect(tf.name).toBe(fontName)
  expect(tf.getUpColor()).toBe(upColor)
  expect(tf.getDownColor()).toBe(downColor)
})
