import { Scene } from 'phaser'

class SceneInfo {
  width: number
  height: number
  centerWidth: number
  centerHeight: number

  constructor(scene: Scene) {
    this.width = +scene.sys.game.config.width
    this.height = +scene.sys.game.config.height
    this.centerWidth = this.width / 2
    this.centerHeight = this.height / 2
  }
}

export default SceneInfo
