import { GameObjects, Scene } from "phaser";
import { NUMBER_PANEL_COLOR, NUMBER_PANEL_FILL_COLOR, hexNumToString } from "../common";

class IWonButton extends GameObjects.Rectangle {
    buttonText: GameObjects.Text
    #fontSize: number = 30
    #fontPadding: number = 2

    constructor(scene: Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height)
        this.scene.add.existing(this)
        this.setStrokeStyle(2, NUMBER_PANEL_COLOR)
        this.setFillStyle(NUMBER_PANEL_FILL_COLOR)
        this.buttonText = this.scene.add.text(this.x, this.y, "Bingo! I Won!", {
            fontFamily: 'Arial Black',
            fontSize: this.#fontSize,
            color: hexNumToString(NUMBER_PANEL_COLOR),
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center',
            padding: {
              left: this.#fontPadding,
              right: this.#fontPadding,
              top: this.#fontPadding,
              bottom: this.#fontPadding,
            },
        }).setOrigin(0.5)
        this.setInteractive()
        this.on('pointerdown', this.handleClick, this)
        this.on('pointerup', this.fixUp, this)
    }

    handleClick() {
        this.setAlpha(0.4)
        console.log("I Won!")
    }

    fixUp() {
        this.setAlpha(1)
    }
}

export default IWonButton