import { expect, test } from 'vitest'
import Player from '../src/player'
import GameLeader from '../src/game-leader'
import RandomBag from '../src/random-bag'

test('Initialization', () => {
  const player = new Player('Test')
  expect(player.name).toBe('Test')
  expect(player.numCards).toBe(1)
  expect(player.wolfCries).toBe(0)
  expect(player.bingoCards.length).toBe(0)
})

test('Has a card', () => {
  const player = new Player('Test')
  const gl = new GameLeader(new RandomBag())
  player.generateCards(gl)
  expect(player.bingoCards.length).toBe(1)
  expect(player.bingoCards.at(0)?.getSignature()).toBeDefined()
})
