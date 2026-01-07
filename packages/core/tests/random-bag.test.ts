import { expect, test, vi } from 'vitest'

import BingoBall from '../src/bingo-ball'
import { NoMoreBingoBallsError } from '../src/bingo-errors'
import * as helpers from '../src/helpers'
import RandomBag from '../src/random-bag'

vi.spyOn(helpers, 'shuffle').mockImplementation((_r) => {
  return [
    new BingoBall(2),
    new BingoBall(24),
    new BingoBall(25),
    new BingoBall(64),
    new BingoBall(36),
    new BingoBall(7),
    new BingoBall(9),
    new BingoBall(14),
    new BingoBall(31),
    new BingoBall(37),
    new BingoBall(53),
    new BingoBall(58),
    new BingoBall(30),
  ]
})

test('First five balls from RandomBag', () => {
  const rb = new RandomBag()
  const balls: BingoBall[] = []
  for (let i = 0; i < 5; i++) {
    balls.push(rb.getNext())
  }
  expect(balls).toEqual(
    [new BingoBall(31), new BingoBall(37), new BingoBall(53), new BingoBall(58), new BingoBall(30)].reverse(),
  )
})

test('Exhaust bag and test error on empty bag', () => {
  const runToEmpty = () => {
    const rb = new RandomBag()
    const check = true
    do {
      rb.getNext()
    } while (check)
  }
  expect(() => runToEmpty()).toThrow(NoMoreBingoBallsError)
})
