import { Schema, type } from '@colyseus/schema'

class BingoCardSchema extends Schema {
  // Card signature
  @type('string') signature: string = ''

  // Card values
  @type('string') values: string = ''
}

export default BingoCardSchema
