import { ColyseusSDK } from '@colyseus/sdk'
import '@colyseus/sdk/debug'
import type server from '@repo/server/src/app.config'

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:2567'
console.log(`D: ${WS_URL}`)
export const client = new ColyseusSDK<typeof server>(WS_URL)
