import type { Scene } from "phaser";
import NumberPanel from "./number-panel";

class NumberButton extends NumberPanel {
    isToggled: boolean = false

    constructor(scene: Scene, x: number, y: number, value: string) {
        super(scene, x, y, value)
        this.setInteractive()
        this.on('pointerdown', this.handleClick, this)
    }

    handleClick() {
        if (this.isToggled) {
            this.setAlpha(1)
            this.isToggled = false
        } else {
            this.setAlpha(0.4)
            this.isToggled = true
        }
    }
}

export default NumberButton