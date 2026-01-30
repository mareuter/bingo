import { expect, test } from 'vitest'

import ColorHelper from '../src/color-helper'

test('Test color helper', () => {
  const color1 = '#000000'
  const ch1 = new ColorHelper(color1)
  expect(ch1.value).toBe(color1)
  expect(ch1.stringToNumber()).toBe(0x000000)

  const color2 = '#ec36fa'
  const ch2 = new ColorHelper(color2)
  expect(ch2.value).toBe(color2)
  expect(ch2.stringToNumber()).toBe(0xec36fa)
})
