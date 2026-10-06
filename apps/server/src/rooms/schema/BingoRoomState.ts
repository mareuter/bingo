import { MapSchema, Schema, type, view } from '@colyseus/schema'
import Player from './Player'
import BingoBall from '@repo/core/src/bingo-ball'

export class BingoRoomState extends Schema {
  // Boolean indicating whether the game has started
  @type('boolean') gameHasStarted: boolean = false

  // Boolean indicating whether the game is over
  @type('boolean') gameOver: boolean = false

  // Map of players, where keys are player session IDs and values are instances of the Player class
  @view() @type({ map: Player }) players = new MapSchema<Player>()

  // Number of players
  @type('number') numPlayers: number = 4

  // The current game types
  @type('string') gameType: string = 'NONE'

  // The current Bingo ball
  @type('string') currentBingoBall: string = String(BingoBall.GAME_OVER)

  // Map of the client (player) scores
  @type({ map: 'number' }) scores = new MapSchema<number>()
}
