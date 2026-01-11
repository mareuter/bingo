import { AUTO, Types } from 'phaser'

import Game from './scenes/Game'
import { MainMenu } from './scenes/MainMenu'

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  backgroundColor: '#0000ff',
  parent: 'game-container',
  pixelArt: true,
  scene: [Game],
}

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent })
}

export default StartGame
