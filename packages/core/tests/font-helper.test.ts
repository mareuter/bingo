import { expect, test } from 'vitest'

import FontHelper from '../src/font-helper'
import ColorHelper from '../src/color-helper'

test('Test font helper', () => {
  const fontName = 'Arial Black'
  const fontSize = 50
  const color = '#53e2a4'
  const stroke = '#11e44a'
  const strokeThickness = 4
  const alignment = 'center'
  const padding = 5

  const fh = new FontHelper(fontName, fontSize, color, stroke, strokeThickness, alignment, padding)
  expect(fh.name).toBe(fontName)
  expect(fh.color).toBeInstanceOf(ColorHelper)
  expect(fh.stroke).toBeInstanceOf(ColorHelper)
  expect(fh.toPhaserFontConfig()).toStrictEqual({
    fontFamily: fontName,
    fontSize: fontSize,
    color: color,
    stroke: stroke,
    strokeThickness: strokeThickness,
    align: alignment,
    padding: {
      left: padding,
      right: padding,
      top: padding,
      bottom: padding,
    },
  })
})
