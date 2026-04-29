import { expect, test } from 'vitest'
import HumanPlayer from '../src/human-player'
import GameLeader from '../src/game-leader'
import RandomBag from '../src/random-bag'

test('Initialization', () => {
  const human = new HumanPlayer('Test')
  expect(human.name).toBe('Test')
})

test('Has a card', () => {
  const human = new HumanPlayer('Test')
  const gl = new GameLeader(new RandomBag())
  human.generateCards(gl)
  expect(human.bingoCards.length).toBe(1)
  expect(human.bingoCards.at(0)?.getSignature()).toBeDefined()
})
