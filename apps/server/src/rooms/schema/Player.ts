import { ArraySchema, Schema, type } from '@colyseus/schema'
import BingoCard from '@repo/core/src/bingo-card'

class Player extends Schema {
  // Seat number fo player
  @type('number') seat = -1

  // Session Id
  @type('string') sessionId = ''

  // Array of Bingo cards
  @type([BingoCard]) cards = new ArraySchema<BingoCard>()

  // Wolf cry count
  @type('number') wolfCries = 0

  // Is player a computer
  @type('boolean') isCpu = false

  name(): string {
    if (this.isCpu) {
      return `Cpu ${this.seat + 1}`
    } else {
      return `Player ${this.seat + 1}`
    }
  }
}

export default Player
