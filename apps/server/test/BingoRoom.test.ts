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
    const client2 = await colyseus.connectTo(room)

    await room.waitForNextPatch()

    expect(client1.state.players.size).toBe(2)
    expect(client2.state.players.size).toBe(2)
  })

  test('Start game', async () => {
    const room = await colyseus.createRoom<BingoRoomState>('bingo_room', { startGameTimeout: 0.001 })
    const client1 = await colyseus.connectTo(room)
    const client2 = await colyseus.connectTo(room)

    await room.waitForNextPatch()

    client1.send('gameStarting', true)
    let client1Recv = new Promise((res) => client1.onMessage('gameStarting', res))
    await expect(client1Recv).resolves.toBe('Game starts in 0.001 seconds')
    client1Recv = new Promise((res) => client1.onMessage('gameStarting', res))
    await expect(client1Recv).resolves.toBe('Game starts now!')
    await room.waitForNextPatch()

    expect(client1.state.gameHasStarted).toBeTruthy()
    expect(client2.state.gameHasStarted).toBeTruthy()
  })
})
