import BingoBall from "@repo/core/src/bingo-ball";
import { GameObjects, Scene } from "phaser";

class CurrentBallPanel {
    scene: Scene
    x: number
    y: number
    border: GameObjects.Rectangle
    ballOutline: GameObjects.Arc
    ballText: GameObjects.Text
    #fontSize: number = 50
    #fontPadding: number = 5

    constructor(scene: Scene, x: number, y: number, offsetX: number, height: number) {
        this.scene = scene
        const side = this.#fontSize + 2 * this.#fontPadding
        this.x = x - offsetX - side
        this.y = y

        this.border = this.scene.add.rectangle(this.x, this.y, height, height, 0x858585)
        this.border.setStrokeStyle(4, 0x0)

        this.ballText = this.scene.add.text(this.x, this.y, "B1", {
            fontFamily: 'Arial Black',
            fontSize: this.#fontSize,
            color: '#edd45bff',
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

        const radius = 96 * Math.SQRT2 / 2
        this.ballOutline = this.scene.add.circle(this.x, this.y, radius)
        this.ballOutline.setStrokeStyle(4, 0xedd45bff)

        this.ballOutline.setVisible(false)
        this.ballText.setVisible(false)
    }

    updateBall(bb: BingoBall) {
        if (!this.ballOutline.visible) {
            this.ballOutline.setVisible(true)
        }
        if (!this.ballText.visible) {
            this.ballText.setVisible(true)
        }
        this.ballText.text = bb.toString()
    }
}

export default CurrentBallPanel