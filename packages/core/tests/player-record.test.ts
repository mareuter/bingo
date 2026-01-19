import { beforeEach, describe, expect, test } from 'vitest'
import PlayerRecord from '../src/player-record'

describe('Player record manipulation', () => {
  let player: PlayerRecord
  beforeEach(() => {
    player = {
      numCards: 1,
      wolfCries: 0,
    }
  })

  test('Test player record construction', () => {
    expect(player.numCards).toBe(1)
    expect(player.wolfCries).toBe(0)
  })

  test('Test manipulating attributes', () => {
    player.numCards = 3
    expect(player.numCards).toBe(3)
    player.wolfCries++
    player.wolfCries++
    expect(player.wolfCries).toBe(2)
    player.wolfCries = 0
    expect(player.wolfCries).toBe(0)
  })
})
