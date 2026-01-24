import { expect, test, vi } from 'vitest'

import BingoBall from '../src/bingo-ball'
import BingoCard from '../src/bingo-card'
import * as helpers from '../src/helpers'
import { BingoCardAlreadySignedError } from '../src/bingo-errors'

vi.spyOn(helpers, 'shuffle').mockImplementation((r) => {
  if (r[0] === 1) {
    return [7, 3, 10, 1, 11, 5, 2, 15, 6, 4, 13, 9, 8, 12, 14]
  } else if (r[0] === 16) {
    return [28, 18, 24, 25, 21, 26, 29, 20, 23, 19, 27, 16, 30, 22, 17]
  } else if (r[0] === 31) {
    return [41, 35, 39, 42, 31, 33, 40, 32, 36, 37, 45, 34, 38, 44, 43]
  } else if (r[0] === 46) {
    return [55, 54, 48, 52, 53, 60, 51, 59, 57, 50, 47, 46, 58, 49, 56]
  } else {
    return [65, 67, 66, 72, 64, 69, 71, 73, 70, 62, 68, 63, 74, 61, 75]
  }
})

test('Board values after creation', () => {
  const bc = new BingoCard()
  expect(bc.boardValues[0]).toEqual([
    new BingoBall(7),
    new BingoBall(3),
    new BingoBall(10),
    new BingoBall(1),
    new BingoBall(11),
  ])
  expect(bc.boardValues[1]).toEqual([
    new BingoBall(28),
    new BingoBall(18),
    new BingoBall(24),
    new BingoBall(25),
    new BingoBall(21),
  ])
  expect(bc.boardValues[2]).toEqual([
    new BingoBall(41),
    new BingoBall(35),
    new BingoBall(-1),
    new BingoBall(42),
    new BingoBall(31),
  ])
  expect(bc.boardValues[3]).toEqual([
    new BingoBall(55),
    new BingoBall(54),
    new BingoBall(48),
    new BingoBall(52),
    new BingoBall(53),
  ])
  expect(bc.boardValues[4]).toEqual([
    new BingoBall(65),
    new BingoBall(67),
    new BingoBall(66),
    new BingoBall(72),
    new BingoBall(64),
  ])
})

test('Sign a Bingo card', () => {
  const bc = new BingoCard()
  const signature = '546264-5f73a9-637ef-43abdc'
  bc.setSignature(signature)
  expect(bc.getSignature()).toBe(signature)
})

test('Twice signing a Bingo card throws an error', () => {
  const bc = new BingoCard()
  const signature = '546264-5f73a9-637ef-43abdc'
  bc.setSignature(signature)
  expect(() => bc.setSignature(signature)).toThrow(BingoCardAlreadySignedError)
})
