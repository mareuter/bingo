import BagOfBalls from '@repo/core/src/bag-of-balls'

export interface CreateOptions {
  startGameTimeout: number
  ballCallInterval: number
  bagOfBalls: BagOfBalls | undefined
}

export interface GameOptions {
  numberOfCards: number
  gameType: string
}
