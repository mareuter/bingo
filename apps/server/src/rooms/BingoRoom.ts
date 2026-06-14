import { Room, Client, CloseCode, Delayed } from 'colyseus'
import { BingoRoomState } from './schema/BingoRoomState'
import Player from './schema/Player'
import type { CreateOptions } from './RoomOptions'

export class BingoRoom extends Room {
  maxClients = 4
  state = new BingoRoomState()
  startGameTimeout = 0
  delayedInterval!: Delayed

  messages = {
    yourMessageType: (client: Client, message: any) => {
      /**
       * Handle "yourMessageType" message.
       */
      console.log(client.sessionId, 'sent a message:', message)
    },
    gameStart: (_client: Client, message: boolean) => {
      if (!this.state.gameHasStarted) {
        this.state.gameHasStarted = message
        this.broadcast('gameStarting', `Game starts in ${this.startGameTimeout} seconds`)
        this.clock.start()
        this.clock.setTimeout(() => {
          this.broadcast('gameStarting', 'Game starts now!')
        }, this.startGameTimeout * 1000)
      }
    },
  }

  onCreate(options: CreateOptions = { startGameTimeout: 15 }) {
    /**
     * Called when a new room is created.
     */
    this.startGameTimeout = options.startGameTimeout
  }

  onJoin(client: Client, _options: object) {
    /**
     * Called when a client joins the room.
     */
    console.log(client.sessionId, 'joined!')
    const p = new Player()
    p.num = this.state.players.size + 1
    this.state.players.set(client.sessionId, p)
    client.send('playerJoined', 'You joined.')
    if (this.state.players.size > 1) {
      this.broadcast('playerJoined', `Player ${p.num} joined.`, { except: client })
    }
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
