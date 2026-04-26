import { expect, test } from 'vitest'

import CpuPlayer from '../src/cpu-player'
import GameLeader from '../src/game-leader'
import RandomBag from '../src/random-bag'

test('Initialization', () => {
  const cpu = new CpuPlayer()
  expect(cpu.numCards).toBe(1)
  expect(cpu.wolfCries).toBe(0)
  expect(cpu.bingoCards.length).toBe(0)
})

test('Number of cards setting', () => {
  const cpu = new CpuPlayer()
  cpu.setNumCards()
  expect(cpu.numCards).toBeGreaterThanOrEqual(1)
  expect(cpu.numCards).toBeLessThanOrEqual(3)
})

test('Has a card', () => {
  const cpu = new CpuPlayer()
  const gl = new GameLeader(new RandomBag())
  cpu.generateCards(gl)
  expect(cpu.bingoCards.length).toBe(1)
  expect(cpu.bingoCards.at(0)?.getSignature()).toBeDefined()
})
