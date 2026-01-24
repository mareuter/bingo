import { beforeEach, describe, expect, test, vi } from 'vitest'

import GameLeader from '../src/game-leader'
import BingoBall from '../src/bingo-ball'
import BingoCard from '../src/bingo-card'
import RandomBag from '../src/random-bag'

import type BagOfBalls from '../src/bag-of-balls'
import RowBag from './test-bags/row-bag'
import ColumnBag from './test-bags/column-bag'
import DiagonalBag from './test-bags/diagonal-bag'
import OtherDiagonalBag from './test-bags/other-diagonal-bag'
import TwoBingoBag from './test-bags/two-bingo-bag.'
import NoBingoBag from './test-bags/no-bingo-bag'
import ShortBag from './test-bags/short-bag'

const runGame = (bagOfBalls: BagOfBalls): GameLeader => {
  const gl = new GameLeader(bagOfBalls)
  let ball: BingoBall
  do {
    ball = gl.announceBall()
  } while (!ball.equals(new BingoBall(BingoBall.GAME_OVER)))
  return gl
}

test('Reset game', () => {
  const gl = runGame(new RandomBag())
  gl.reset()
  const balls = gl.numAnnouncedBalls()
  expect(balls).toBe(0)
  expect(gl.bagSize).toBe(75)
})

test('Announce ball', () => {
  const gl = new GameLeader(new RandomBag())
  const ball = gl.announceBall()
  expect(ball).toBeInstanceOf(BingoBall)
  expect(gl.numAnnouncedBalls()).toBe(1)
})

describe('Card winner verification tests', () => {
  let card: BingoCard

  beforeEach(() => {
    card = new BingoCard()
    card.boardValues[0][0] = new BingoBall(1)
    card.boardValues[0][1] = new BingoBall(19)
    card.boardValues[0][2] = new BingoBall(45)
    card.boardValues[0][3] = new BingoBall(47)
    card.boardValues[0][4] = new BingoBall(69)
    card.boardValues[1][0] = new BingoBall(13)
    card.boardValues[1][1] = new BingoBall(23)
    card.boardValues[1][2] = new BingoBall(32)
    card.boardValues[1][3] = new BingoBall(56)
    card.boardValues[1][4] = new BingoBall(74)
    card.boardValues[2][0] = new BingoBall(6)
    card.boardValues[2][1] = new BingoBall(20)
    card.boardValues[2][3] = new BingoBall(52)
    card.boardValues[2][4] = new BingoBall(61)
    card.boardValues[3][0] = new BingoBall(3)
    card.boardValues[3][1] = new BingoBall(29)
    card.boardValues[3][2] = new BingoBall(41)
    card.boardValues[3][3] = new BingoBall(49)
    card.boardValues[3][4] = new BingoBall(64)
    card.boardValues[4][0] = new BingoBall(10)
    card.boardValues[4][1] = new BingoBall(18)
    card.boardValues[4][2] = new BingoBall(36)
    card.boardValues[4][3] = new BingoBall(55)
    card.boardValues[4][4] = new BingoBall(70)
  })

  test('Verify row bingo', () => {
    const gl = runGame(new RowBag())
    expect(gl.numAnnouncedBalls()).toBe(12)
    expect(gl.verify(card)).toBeTruthy()
  })

  test('Verify column bingo', () => {
    const gl = runGame(new ColumnBag())
    expect(gl.numAnnouncedBalls()).toBe(12)
    expect(gl.verify(card)).toBeTruthy()
  })

  test('Verify diagonal (ul -> lr) bingo', () => {
    const gl = runGame(new DiagonalBag())
    expect(gl.numAnnouncedBalls()).toBe(14)
    expect(gl.verify(card)).toBeTruthy()
  })

  test('Verify other diagonal (ll -> ur) bingo', () => {
    const gl = runGame(new OtherDiagonalBag())
    expect(gl.numAnnouncedBalls()).toBe(14)
    expect(gl.verify(card)).toBeTruthy()
  })

  test('Verify bingo when two present', () => {
    const gl = runGame(new TwoBingoBag())
    expect(gl.numAnnouncedBalls()).toBe(14)
    expect(gl.verify(card)).toBeTruthy()
  })

  test('Verify no bingo (wolf crier!)', () => {
    const gl = runGame(new NoBingoBag())
    expect(gl.numAnnouncedBalls()).toBe(14)
    expect(gl.verify(card)).toBeFalsy()
  })
})

test('Game state checks', () => {
  const gl = new GameLeader(new ShortBag())
  expect(gl.isWaiting()).toBeTruthy()
  expect(gl.isPlaying()).toBeFalsy()
  expect(gl.isGameOver()).toBeFalsy()
  gl.announceBall()
  expect(gl.isWaiting()).toBeFalsy()
  expect(gl.isPlaying()).toBeTruthy()
  expect(gl.isGameOver()).toBeFalsy()
  gl.announceBall()
  gl.announceBall()
  expect(gl.isWaiting()).toBeFalsy()
  expect(gl.isPlaying()).toBeFalsy()
  expect(gl.isGameOver()).toBeTruthy()
  gl.reset()
  expect(gl.isWaiting()).toBeTruthy()
  expect(gl.isPlaying()).toBeFalsy()
  expect(gl.isGameOver()).toBeFalsy()
})

test('Sign Bingo card', () => {
  const uuidSpy = vi.spyOn(crypto, 'randomUUID')
  const gl = runGame(new RandomBag())
  const card = new BingoCard()
  gl.signCard(card)
  expect(uuidSpy).toHaveBeenCalledOnce()
})
