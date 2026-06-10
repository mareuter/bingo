import { MapSchema, Schema, type } from '@colyseus/schema'
import Player from './Player'

export class BingoRoomState extends Schema {
  @type('string') mySynchronizedProperty: string = 'Hello world'

  // Boolean indicating whether the game has started
  @type('boolean') gameHasStarted: boolean = false

  // Boolean indicating whether the game is over
  @type('boolean') gameOver: boolean = false

  // Map of players, where keys are player session IDs and values are instances of the Player class
  @type({ map: Player }) players = new MapSchema<Player>()
}
