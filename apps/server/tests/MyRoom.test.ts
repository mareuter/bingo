import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { ColyseusTestServer, boot } from '@colyseus/testing'

// import your "app.config.ts" file here.
import appConfig from '../src/app.config.js'
import { MyRoomState } from '../src/rooms/schema/MyRoomState.js'

describe('testing your Colyseus app', () => {
  let colyseus: ColyseusTestServer<typeof appConfig>

  beforeAll(async () => (colyseus = await boot(appConfig)))
  afterAll(async () => colyseus.shutdown())

  beforeEach(async () => await colyseus.cleanup())

  test('connecting into a room', async () => {
    // `room` is the server-side Room instance reference.
    const room = await colyseus.createRoom<MyRoomState>('my_room', {})

    // `client1` is the client-side `Room` instance reference (same as JavaScript SDK)
    const client1 = await colyseus.connectTo(room)

    // make your assertions
    expect(client1.sessionId).toEqual(room.clients[0].sessionId)

    // wait for state sync
    await room.waitForNextPatch()

    expect(client1.state.toJSON()).toStrictEqual({ mySynchronizedProperty: 'Hello world' })
  })
})
