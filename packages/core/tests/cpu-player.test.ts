import { expect, test } from 'vitest'
import CpuPlayer from '../src/cpu-player'

test('Initialization', () => {
  const cpu = new CpuPlayer()
  expect(cpu.name).toBe('CPU')
})

test('Number of cards setting', () => {
  const cpu = new CpuPlayer()
  cpu.setNumCards()
  expect(cpu.numCards).toBeGreaterThanOrEqual(1)
  expect(cpu.numCards).toBeLessThanOrEqual(3)
})

test('Reset', () => {
  const cpu = new CpuPlayer()
  cpu.wolfCries++
  cpu.wolfCries++
  expect(cpu.wolfCries).toBe(2)
  cpu.reset()
  expect(cpu.wolfCries).toBe(0)
})
