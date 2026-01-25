import { AUTO, Types } from 'phaser'

import SoloBingo from './scenes/solo-bingo'
import { MainMenu } from './scenes/main-menu'

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  backgroundColor: '#222288',
  parent: 'game-container',
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  scene: [SoloBingo],
}

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent })
}

export default StartGame
