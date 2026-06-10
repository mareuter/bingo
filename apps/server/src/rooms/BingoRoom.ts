import { Room, Client, CloseCode } from 'colyseus'
import { BingoRoomState } from './schema/BingoRoomState'
import Player from './schema/Player'

export class BingoRoom extends Room {
  maxClients = 4
  state = new BingoRoomState()

  messages = {
    yourMessageType: (client: Client, message: any) => {
      /**
       * Handle "yourMessageType" message.
       */
      console.log(client.sessionId, 'sent a message:', message)
    },
  }

  onCreate(options: any) {
    /**
     * Called when a new room is created.
     */
  }

  onJoin(client: Client, options: any) {
    /**
     * Called when a client joins the room.
     */
    console.log(client.sessionId, 'joined!')
    const p = new Player()
    p.num = this.state.players.size + 1
    this.state.players.set(client.sessionId, p)
  }

  onLeave(client: Client, code: CloseCode) {
    /**
     * Called when a client leaves the room.
     */
    console.log(client.sessionId, 'left!', code)
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log('room', this.roomId, 'disposing...')
  }
}
