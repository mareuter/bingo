import { Room, Client, Delayed } from 'colyseus'
import { StateView } from '@colyseus/schema'
import { BingoRoomState } from './schema/BingoRoomState'
import Player from './schema/Player'
import type { CreateOptions, GameOptions } from './RoomOptions'
import GameLeader from '@repo/core/src/game-leader'
import RandomBag from '@repo/core/src/random-bag'
import BingoCard from '@repo/core/src/bingo-card'
import { MAX_WOLF_CRIES } from '@repo/core/src/constants'
import BingoCardSchema from './schema/BingoCardSchema'

export class BingoRoom extends Room {
  maxClients = 4
  state = new BingoRoomState()
  startGameTimeout = 0
  startGameDelay!: Delayed
  ballCallInterval = 0
  ballCallDelay!: Delayed
  gameLeader?: GameLeader
  bingoCards = new Map<string, BingoCard[]>()

  messages = {
    ready: (client: Client, _message: boolean) => {
      if (!this.gameLeader?.isWaiting()) {
        console.log('Z')
        this.gameLeader?.waiting()
        this.broadcast('gameMessage', `Game starts in ${this.startGameTimeout} seconds`)
        this.startGameDelay = this.clock.setTimeout(() => this.startGame(), this.startGameTimeout * 1000)
      } else {
        const remaining = (this.startGameTimeout * 1000 - this.startGameDelay.elapsedTime) / 1000
        client.send('gameMessage', `Game starting in ${remaining} seconds!`)
      }
    },
    getCards: (client: Client, message: number) => {
      this.getCards(client, message)
    },
    haveWinningCard: (client: Client, message: string) => {
      const player = this.findPlayerBySession(client.sessionId)
      if (player === null) {
        return
      }
      const needsDisconnection = this.handleWinningCard(player, message)
      if (needsDisconnection) {
        client.send('gameMessage', 'You have been kicked out for crying Wolf too many times!')
        client.leave(4011, 'WOLFCRIER')
      }
    },
  }

  onCreate({ startGameTimeout = 120, ballCallInterval = 3, bagOfBalls = undefined }: CreateOptions) {
    /**
     * Called when a new room is created.
     */
    if (bagOfBalls === undefined) {
      bagOfBalls = new RandomBag()
    }
    this.gameLeader = new GameLeader(bagOfBalls, true)
    console.log(`S: ${startGameTimeout}`)
    this.startGameTimeout = startGameTimeout
    this.ballCallInterval = ballCallInterval
    for (let i = 0; i < this.maxClients; i++) {
      const p = new Player()
      p.seat = i
      p.sessionId = `Cpu${i}`
      p.isCpu = true
      this.state.players.set(String(i), p)
      this.state.scores.set(String(i), 0)
      this.bingoCards.set(p.sessionId, [])
      const numCards = Math.floor(Math.random() * 3) + 1
      this.setPlayerCards(p, numCards)
    }
    this.clock.start()
  }

  onJoin(client: Client, { numberOfCards = 1, gameType = 'CLASSIC' }: GameOptions) {
    /**
     * Called when a client joins the room.
     */
    console.log(client.sessionId, 'joined!')

    const oldCpuPlayer = this.findCpuSeat()
    if (!oldCpuPlayer) return

    this.bingoCards.delete(oldCpuPlayer.sessionId)

    oldCpuPlayer.isCpu = false
    oldCpuPlayer.sessionId = client.sessionId
    this.setPlayerCards(oldCpuPlayer, numberOfCards)

    client.send('gameMessage', 'You joined.')
    this.broadcast('gameMessage', `${oldCpuPlayer.name()} joined.`, { except: client })

    client.view = new StateView()
    client.view.add(oldCpuPlayer)

    let numHuman = 0
    for (const p of this.state.players.values()) {
      if (!p.isCpu) {
        numHuman++
      }
    }
    if (numHuman === this.maxClients) {
      this.lock()
    }

    if (gameType === this.state.gameType) {
      client.send('gameMessage', `Game type already set: ${this.state.gameType}`)
    } else {
      this.state.gameType = gameType
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
    this.bingoCards.delete(client.sessionId)
    this.state.numPlayers--
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log('room', this.roomId, 'disposing...')
  }

  private announceBall() {
    const bb = this.gameLeader!.announceBall()
    console.log(`E: ${bb.toString()}`)
    this.state.currentBingoBall = bb.toString()
    this.checkCpuCards()
    if (this.gameLeader!.isGameOver()) {
      this.ballCallDelay.clear()
      this.state.gameOver = true
      console.log(`HHH: ${this.state.gameOver}`)
      this.broadcast('gameMessage', 'Game Over!')
      this.broadcast('gameMessage', 'Nobody Won!')
      this.resetGame()
    }
  }

  private checkCpuCards() {
    for (const player of this.state.players.values()) {
      if (player.isCpu) {
        const cards = this.bingoCards.get(player.sessionId)!
        for (const card of cards) {
          if (this.gameLeader!.verify(card, this.state.gameType)) {
            this.handleWinningCard(player, card.getSignature()!)
          }
        }
      }
    }
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

  private getCards(c: Client, nc: number) {
    const player = this.findPlayerBySession(c.sessionId)
    if (player === null) {
      return
    }
    this.setPlayerCards(player, nc)
    c.view?.add(player)
  }

  private setPlayerCards(p: Player, n: number) {
    this.bingoCards.set(p.sessionId, [])
    p.cards.clear()
    console.log(`Q: ${n}`)
    for (let i = 0; i < n; i++) {
      const c = new BingoCard()
      this.gameLeader!.signCard(c)
      this.bingoCards.get(p.sessionId)?.push(c)
      console.log('R')
      const bcs = new BingoCardSchema()
      bcs.signature = c.getSignature()!
      bcs.values = String(c.boardValues)
      p.cards.push(bcs)
    }
  }

  private handleWinningCard(player: Player, id: string): boolean {
    const card = this.bingoCards.get(player.sessionId)!.find((u) => u.getSignature() === id)
    let needsDisconnection = false
    if (card === undefined) {
      needsDisconnection = this.handleWolfCry(player)
    } else {
      if (this.gameLeader!.verify(card, this.state.gameType)) {
        this.broadcast('gameMessage', `${player.name()} won!!!`)
        this.broadcast('gameMessage', 'Game Over!')
        let score = this.state.scores.get(String(player.seat))
        if (score !== undefined) {
          this.state.scores.set(String(player.seat), score++)
          this.resetGame()
        }
      } else {
        needsDisconnection = this.handleWolfCry(player)
      }
    }
    return needsDisconnection
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

  private resetGame() {
    console.log('II')
    this.gameLeader!.reset(true)
    this.state.gameHasStarted = false
    this.state.gameOver = false
    console.log('III')
    this.unlock()
  }

  private startGame() {
    console.log('ZZ')
    this.state.gameHasStarted = true
    this.lock()
    this.broadcast('gameMessage', 'Game starts now!')
    this.ballCallDelay = this.clock.setInterval(() => this.announceBall(), this.ballCallInterval * 1000)
  }
}
