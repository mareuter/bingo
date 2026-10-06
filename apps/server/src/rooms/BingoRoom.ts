import { Room, Client, Delayed } from 'colyseus'
import { StateView } from '@colyseus/schema'
import { BingoRoomState } from './schema/BingoRoomState'
import Player from './schema/Player'
import type { CreateOptions, GameOptions } from './RoomOptions'
import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import BingoCard from '@repo/core/src/bingo-card'
import { MAX_WOLF_CRIES } from '@repo/core/src/constants'

export class BingoRoom extends Room {
  maxClients = 4
  state = new BingoRoomState()
  startGameTimeout = 0
  delayedInterval!: Delayed
  ballCallInterval!: Delayed
  gameLeader: GameLeader = new GameLeader(new RandomBag())

  messages = {
    gameStarting: (_client: Client, message: boolean) => {
      if (!this.state.gameHasStarted) {
        this.state.gameHasStarted = message
        this.broadcast('gameStarting', `Game starts in ${this.startGameTimeout} seconds`)
        // this.clock.start()
        this.clock.setTimeout(() => {
          this.broadcast('gameStarting', 'Game starts now!')
        }, this.startGameTimeout * 1000)
      }
    },
    getCards: (client: Client, message: number) => {
      const player = this.findPlayerBySession(client.sessionId)
      if (player === null) {
        return
      }
      player.cards.clear()
      for (let i = 0; i < message; i++) {
        const c = new BingoCard()
        this.gameLeader.signCard(c)
        player.cards.push(c)
      }
    },
    haveWinningCard: (client: Client, message: string) => {
      this.handleWinningCard(client, message)
    },
  }

  onCreate(options: CreateOptions = { startGameTimeout: 120 }) {
    /**
     * Called when a new room is created.
     */
    console.log('A')
    this.startGameTimeout = options.startGameTimeout
    for (let i = 0; i < this.maxClients; i++) {
      const p = new Player()
      p.seat = i
      p.sessionId = `Cpu${i}`
      p.isCpu = true
      this.state.players.set(String(i), p)
      this.state.scores.set(String(i), 0)
    }
    console.log('B')
    this.clock.start()
    console.log('C')
  }

  onJoin(client: Client, options: GameOptions) {
    /**
     * Called when a client joins the room.
     */
    console.log(client.sessionId, 'joined!')

    const oldCpuPlayer = this.findCpuSeat()
    if (!oldCpuPlayer) return

    oldCpuPlayer.isCpu = false
    oldCpuPlayer.sessionId = client.sessionId

    client.send('gameMessage', 'You joined.')
    this.broadcast('gameMessage', `${oldCpuPlayer.name()} joined.`, { except: client })

    client.view = new StateView()
    client.view.add(oldCpuPlayer)

    if (options.gameType === this.state.gameType) {
      client.send('gameMessage', `Game type already set: ${this.state.gameType}`)
    } else {
      this.state.gameType = options.gameType
    }
  }

  onLeave(client: Client, code: number) {
    /**
     * Called when a client leaves the room.
     */
    let state = 'left'
    if (code === 4011) {
      state = 'kicked out!'
    }
    console.log(client.sessionId, state, code)
    this.state.players.delete(client.sessionId)
    this.state.numPlayers--
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log('room', this.roomId, 'disposing...')
  }

  private findCpuSeat(): Player | null {
    let found: Player | null = null
    this.state.players.forEach((player: Player) => {
      if (player.isCpu && found === null) found = player
    })
    return found
  }

  private findPlayerBySession(sessionId: string): Player | null {
    let found: Player | null = null
    this.state.players.forEach((p: Player) => {
      if (p.sessionId === sessionId) found = p
    })
    return found
  }

  private getPlayerBySeat(seatIndex: number): Player {
    return this.state.players.get(String(seatIndex))!
  }

  private handleWinningCard(c: Client, id: string) {
    const player = this.findPlayerBySession(c.sessionId)
    if (player === null) {
      return
    }
    const card = player.cards.find((u) => u.getSignature() === id)
    let needsDisconnection = false
    if (card === undefined) {
      needsDisconnection = this.handleWolfCry(player)
    } else {
      if (this.gameLeader.verify(card, this.state.gameType)) {
        this.broadcast('gameMessage', `${player.name()} won!!!`)
        let score = this.state.scores.get(String(player.seat))
        if (score !== undefined) {
          this.state.scores.set(String(player.seat), score++)
          // Need to end and reset game
        }
      } else {
        needsDisconnection = this.handleWolfCry(player)
      }
    }
    if (needsDisconnection) {
      c.send('gameMessage', 'You have been kicked out for crying Wolf too many times!')
      c.leave(4011, 'WOLFCRIER')
    }
  }

  private handleWolfCry(p: Player): boolean {
    const pStr = p.name()
    this.broadcast('gameMessage', `${pStr} cried Wolf!!`)
    p.wolfCries++
    const diff = MAX_WOLF_CRIES - p.wolfCries
    if (diff > 0) {
      this.broadcast('gameMessage', `${pStr} has ${diff} Wolf cries left and then will be kicked out.`)
      return false
    } else {
      this.broadcast('gameMessage', `${pStr} will be kicked out.`)
      return true
    }
  }
}
