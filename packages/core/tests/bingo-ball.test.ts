import { assert, expect, test } from 'vitest'

import BingoBall from '../src/bingo-ball'

test('This should be the free space ball', () => {
  const bb = new BingoBall(-1)
  expect(bb.number).toBe(BingoBall.FREE_SPACE)
})

test('This should be the game over ball', () => {
  const bb = new BingoBall(-2)
  expect(bb.number).toBe(BingoBall.GAME_OVER)
})

test('This should be the B1 ball', () => {
  const bb = new BingoBall(1)
  expect(bb.toString()).toBe('B1')
  expect(bb.getLetter()).toBe('B')
})

test('This should be the B15 ball', () => {
  const bb = new BingoBall(15)
  expect(bb.toString()).toBe('B15')
})

test('This should be the I16 ball', () => {
  const bb = new BingoBall(16)
  expect(bb.toString()).toBe('I16')
})

test('This should be the O75 ball', () => {
  const bb = new BingoBall(75)
  expect(bb.toString()).toBe('O75')
})

test('These should be invalid balls', () => {
  assert(new BingoBall(0), 'Invalid BingoBall!')
  assert(new BingoBall(76), 'Invalid BingoBall!')
})

test('These balls should be equal', () => {
  const bb1 = new BingoBall(-1)
  const bb2 = new BingoBall(-1)
  expect(bb1.equals(bb2)).toBeTruthy()
})

test('These types and balls should not be equal', () => {
  const bb1 = new BingoBall(-1)
  const bb2 = new BingoBall(34)
  expect(bb1.equals(bb2)).toBeFalsy()
})
