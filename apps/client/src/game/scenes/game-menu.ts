import { GameObjects, Scene } from 'phaser'
import { GAME_KEYS, REGISTRY_KEYS } from '../common'
import SceneInfo from '../scene-info'
import QuitGameMenuButton from '../game-objects/game-menu/quit-game-menu-button'
import OneCardMenuButton from '../game-objects/game-menu/one-card-menu-button'
import TwoCardsMenuButton from '../game-objects/game-menu/two-cards-menu-button'
import ThreeCardsMenuButton from '../game-objects/game-menu/three-cards-menu-button'
import type MenuOptionButton from '../menu-option-button'
import ClassicMenuButton from '../game-objects/game-menu/classic-menu-button'
import BlackoutMenuButton from '../game-objects/game-menu/blackout-menu-button'
import Crazy8MenuButton from '../game-objects/game-menu/crazy-8-menu-button'
import FiveSpotMenuButton from '../game-objects/game-menu/five-spot-menu-button'
import HappyHMenuButton from '../game-objects/game-menu/happy-h-menu-button'
import XMarksMenuButton from '../game-objects/game-menu/x-marks-menu-button'
import { GAMETYPES } from '@repo/core/src/game-types'

class GameMenu extends Scene {
  gameTypeSubMenu: GameObjects.Image
  gameTypeSelector: GameObjects.Image
  classicButton: ClassicMenuButton
  blackoutButton: BlackoutMenuButton
  crazy8Button: Crazy8MenuButton
  fiveSpotButton: FiveSpotMenuButton
  happyHButton: HappyHMenuButton
  xmarksButton: XMarksMenuButton
  numCardsSubMenu: GameObjects.Image
  numCardsSelector: GameObjects.Image
  oneCardButton: OneCardMenuButton
  twoCardsButton: TwoCardsMenuButton
  threeCardsButton: ThreeCardsMenuButton
  quitMenuButton: QuitGameMenuButton
  #selectorOffset = 20
  #selectorImage = 'asterisk-marker'

  constructor() {
    super(GAME_KEYS.GAMEMENU)
  }

  create() {
    const sceneInfo = new SceneInfo(this)
    this.add.image(sceneInfo.centerWidth, sceneInfo.centerHeight, 'background')

    this.gameTypeSubMenu = this.add.image(sceneInfo.centerWidth, 60, 'game-type-menuoption')
    const offsetX1 = 200
    const y1 = 140
    const rowOffset = 60
    this.classicButton = new ClassicMenuButton(this, sceneInfo.centerWidth - offsetX1, y1)
    this.blackoutButton = new BlackoutMenuButton(this, sceneInfo.centerWidth + offsetX1, y1)
    this.crazy8Button = new Crazy8MenuButton(this, sceneInfo.centerWidth - offsetX1, y1 + rowOffset)
    this.fiveSpotButton = new FiveSpotMenuButton(this, sceneInfo.centerWidth + offsetX1, y1 + rowOffset)
    this.happyHButton = new HappyHMenuButton(this, sceneInfo.centerWidth - offsetX1, y1 + 2 * rowOffset)
    this.xmarksButton = new XMarksMenuButton(this, sceneInfo.centerWidth + offsetX1, y1 + 2 * rowOffset)
    this.setGameTypeSelector()

    this.numCardsSubMenu = this.add.image(sceneInfo.centerWidth, 400, 'number-of-cards-menuoption')
    const offsetX2 = 200
    const y2 = 475
    this.oneCardButton = new OneCardMenuButton(this, sceneInfo.centerWidth - offsetX2, y2)
    this.twoCardsButton = new TwoCardsMenuButton(this, sceneInfo.centerWidth, y2)
    this.threeCardsButton = new ThreeCardsMenuButton(this, sceneInfo.centerWidth + offsetX2, y2)
    this.setNumCardsSelector()

    this.registry.events.on(
      'changedata',
      (_parent: object, key: string, _value: number) => {
        if (key === REGISTRY_KEYS.NUMCARDS) {
          this.setNumCardsSelector(true)
        } else {
          this.setGameTypeSelector(true)
        }
      },
      this,
    )

    this.quitMenuButton = new QuitGameMenuButton(this, sceneInfo.centerWidth, 650)
  }

  setGameTypeSelector(isClick: boolean = false): void {
    let gameTypeButton: MenuOptionButton
    const gameType = this.registry.get(REGISTRY_KEYS.GAMETYPE)
    switch (gameType) {
      case GAMETYPES.BLACKOUT:
        gameTypeButton = this.blackoutButton
        break
      case GAMETYPES.CRAZY8:
        gameTypeButton = this.crazy8Button
        break
      case GAMETYPES.FIVESPOT:
        gameTypeButton = this.fiveSpotButton
        break
      case GAMETYPES.HAPPYH:
        gameTypeButton = this.happyHButton
        break
      case GAMETYPES.XMARKS:
        gameTypeButton = this.xmarksButton
        break
      default:
        gameTypeButton = this.classicButton
    }
    const leftSide = gameTypeButton.getLeftCenter()
    if (isClick) {
      this.gameTypeSelector.destroy()
    }
    this.gameTypeSelector = this.add.image(leftSide.x - this.#selectorOffset, leftSide.y, this.#selectorImage)
  }

  setNumCardsSelector(isClick: boolean = false): void {
    let numCardsButton: MenuOptionButton
    const numCards = this.registry.get(REGISTRY_KEYS.NUMCARDS)
    if (numCards === 1) {
      numCardsButton = this.oneCardButton
    } else if (numCards === 2) {
      numCardsButton = this.twoCardsButton
    } else {
      numCardsButton = this.threeCardsButton
    }
    const leftSide = numCardsButton.getLeftCenter()
    if (isClick) {
      this.numCardsSelector.destroy()
    }
    this.numCardsSelector = this.add.image(leftSide.x - this.#selectorOffset, leftSide.y, this.#selectorImage)
  }
}

export default GameMenu
