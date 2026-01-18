import { beforeEach, expect, test, vi } from 'vitest'

import { NoMoreBingoBallsError } from '../src/bingo-errors'
import * as helpers from '../src/helpers'
import RandomBag from '../src/random-bag'

const shuffleSpy = vi.spyOn(helpers, 'shuffle')

const runToEmpty = (bag: RandomBag) => {
  const rb = bag
  const check = true
  do {
    rb.getNext()
  } while (check)
}

beforeEach(() => {
  shuffleSpy.mockReset()
})

test('First five balls from RandomBag', () => {
  const quickRun = 5
  const rb = new RandomBag()
  for (let i = 0; i < quickRun; i++) {
    rb.getNext()
  }
  expect(shuffleSpy.mock.calls.length).toBe(quickRun)
})

test('Exhaust bag and test error on empty bag', () => {
  expect(() => runToEmpty(new RandomBag())).toThrow(NoMoreBingoBallsError)
  expect(shuffleSpy.mock.calls.length).toBe(74)
})

test('Exhaust and refill bag', () => {
  const rb = new RandomBag()
  try {
    runToEmpty(rb)
  } catch {
    //
  }
  rb.refillBag()
  expect(rb.length).toBe(75)
})
