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
    expect(stateJSON.mySynchronizedProperty).toBe('Hello world')
    const players = stateJSON.players
    expect(players[client1.sessionId]).toBeDefined()
    const player1 = players[client1.sessionId]
    expect(player1?.num).toBe(1)
    expect(player1?.score).toBe(0)
  })
})
