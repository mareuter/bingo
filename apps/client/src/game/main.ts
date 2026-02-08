import { AUTO, Types } from 'phaser'

import BootLoader from './scenes/bootloader'
import SoloBingo from './scenes/solo-bingo'
import MainMenu from './scenes/main-menu'
import Splash from './scenes/splash'
import GameMenu from './scenes/game-menu'

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
  scene: [BootLoader, Splash, MainMenu, GameMenu, SoloBingo],
  // scene: [BootLoader, SoloBingo],
  // scene: [BootLoader, GameMenu],
}

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent })
}

export default StartGame
