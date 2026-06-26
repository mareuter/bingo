import { assert, afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { ColyseusTestServer, boot } from '@colyseus/testing'

// import your "app.config.ts" file here.
import appConfig from '../src/app.config'
import { BingoRoomState } from '../src/rooms/schema/BingoRoomState'

describe('testing your Colyseus app', () => {
  let colyseus: ColyseusTestServer<typeof appConfig>

  beforeAll(async () => (colyseus = await boot(appConfig)))
  afterAll(async () => colyseus.shutdown())

  beforeEach(async () => await colyseus.cleanup())

  test('connecting into a room', async () => {
    // `room` is the server-side Room instance reference.
    const room = await colyseus.createRoom<BingoRoomState>('bingo_room', {})

    // `client1` is the client-side `Room` instance reference (same as JavaScript SDK)
    const client1 = await colyseus.connectTo(room)

    // make your assertions
    assert.strictEqual(client1.sessionId, room.clients[0]!.sessionId)

    // wait for state sync
    await room.waitForNextPatch()

    const stateJSON = client1.state.toJSON()
    expect(stateJSON.gameHasStarted).toBeFalsy()
    expect(stateJSON.gameOver).toBeFalsy()
    const players = stateJSON.players
    expect(players[client1.sessionId]).toBeDefined()
    const player1 = players[client1.sessionId]
    expect(player1?.num).toBe(1)
    expect(player1?.score).toBe(0)
  })

  test('Connect multiple clients', async () => {
    const room = await colyseus.createRoom<BingoRoomState>('bingo_room', {})
    const client1 = await colyseus.connectTo(room)
    let client1_recv = ''
    client1.onMessage('playerJoined', (message) => {
      client1_recv = message
    })

    await client1.waitForMessage('playerJoined')
    expect(client1_recv).toBe('You joined.')

    const client2 = await colyseus.connectTo(room)
    let client2_recv = ''
    client2.onMessage('playerJoined', (message) => {
      client2_recv = message
    })

    await room.waitForNextPatch()

    expect(client1.state.players.size).toBe(2)
    expect(client2.state.players.size).toBe(2)

    expect(client1_recv).toBe('Player 2 joined.')
    expect(client2_recv).toBe('You joined.')
  })

  test('Start game', async () => {
    const room = await colyseus.createRoom<BingoRoomState>('bingo_room', { startGameTimeout: 0.001 })
    const client1 = await colyseus.connectTo(room)
    let client1_recv = ''
    client1.onMessage('gameStarting', (message) => {
      client1_recv = message
    })
    const client2 = await colyseus.connectTo(room)

    await room.waitForNextPatch()

    client1.send('gameStart', true)

    await room.waitForNextPatch()

    expect(client1.state.gameHasStarted).toBeTruthy()
    expect(client2.state.gameHasStarted).toBeTruthy()
    expect(client1_recv).toBe('Game starts now!')
  })
})
