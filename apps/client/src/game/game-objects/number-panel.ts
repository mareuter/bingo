import { GameObjects, Scene } from "phaser";

import { NUMBER_PANEL_COLOR, hexNumToString } from '../common'

class NumberPanel extends GameObjects.Rectangle {
    buttonText: GameObjects.Text
    #fontSize: number = 30
    #fontPadding: number = 2
    static side: number = 50

    constructor(scene: Scene, x: number, y: number, value: string) {
        super(scene, x, y, NumberPanel.side, NumberPanel.side)
        this.scene.add.existing(this)
        this.setStrokeStyle(2, NUMBER_PANEL_COLOR)
        this.setFillStyle(0xffffe6)
        let fSize
        if (value === "FREE") {
            fSize = 18
        } else {
            fSize = this.#fontSize
        }

        this.buttonText = this.scene.add.text(this.x, this.y, value, {
            fontFamily: 'Arial Black',
            fontSize: fSize,
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
    }
}

export default NumberPanel