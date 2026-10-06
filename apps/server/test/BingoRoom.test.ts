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
    const client1 = await colyseus.connectTo(room, { numberOfCards: 1, gameType: 'CLASSIC' })
    const client1State = new Promise((res) => client1.onStateChange(res))

    // // make your assertions
    assert.strictEqual(client1.sessionId, room.clients[0]!.sessionId)

    // wait for state sync
    await room.waitForNextPatch()
    const state = (await client1State) as BingoRoomState

    const stateJSON = client1.state.toJSON()
    expect(stateJSON.gameHasStarted).toBeFalsy()
    expect(stateJSON.gameOver).toBeFalsy()
    expect(stateJSON.numPlayers).toBe(4)
    expect(stateJSON.gameType).toBe('CLASSIC')
    expect(state.currentBingoBall).toBe('-2')
    const player = state.players.get('0')
    expect(player?.sessionId).toBe(client1.sessionId)
    expect(player?.isCpu).toBeFalsy()
  })

  test('Connect multiple clients', async () => {
    const room = await colyseus.createRoom<BingoRoomState>('bingo_room', {})
    const client1 = await colyseus.connectTo(room)
    const client1State = new Promise((res) => client1.onStateChange(res))
    const client2 = await colyseus.connectTo(room)
    const client2State = new Promise((res) => client2.onStateChange(res))

    await room.waitForNextPatch()
    const state1 = (await client1State) as BingoRoomState
    const state2 = (await client2State) as BingoRoomState

    expect(client1.state.numPlayers).toBe(4)
    expect(client2.state.numPlayers).toBe(4)

    expect(state1.players.size).toBe(1)
    expect(state2.players.size).toBe(1)

    const player1 = state1.players.get('0')
    const player2 = state2.players.get('1')

    expect(player1?.sessionId).toBe(client1.sessionId)
    expect(player1?.isCpu).toBeFalsy()
    expect(player2?.sessionId).toBe(client2.sessionId)
    expect(player2?.isCpu).toBeFalsy()
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
