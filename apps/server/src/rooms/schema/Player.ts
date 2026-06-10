import { ArraySchema, Schema, type } from '@colyseus/schema'

class Player extends Schema {
  // Player number
  @type('number') num = 0

  // Array of card Ids for the player when cards are created
  @type(['string']) cardIds = new ArraySchema<string>()

  // Number of games won by the player
  @type('number') score = 0
}

export default Player
