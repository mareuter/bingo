import { GameObjects, Scene } from "phaser";
import BingoCard from '@repo/core/src/bingo-card'
import NumberButton from "./number-button";
import NumberPanel from "./number-panel";
import { COLUMNS } from "@repo/core/src/constants";
import BingoBall from "@repo/core/src/bingo-ball";

class CardPanel extends GameObjects.Container {
    bingoCard: BingoCard

    constructor(scene: Scene, x: number, y: number, card: BingoCard) {
        super(scene, x, y)
        // this.scene.add.existing(this)
        this.bingoCard = card

        for (let i = 0; i < COLUMNS.length; i++) {
            const xp = (i - 2) * NumberPanel.side + x
            new NumberPanel(scene, xp, y, COLUMNS[i]!)
            // this.add(np)
        }

        // this.scene.add.existing(this)
        for (let j = 0; j < BingoCard.SIZE; j++) {
            for (let k = 0; k < BingoCard.SIZE; k++) {
                const xp = (j - 2) * NumberPanel.side + x
                const yp = (k + 1) * NumberPanel.side + y
                const bv = this.bingoCard.boardValues[j]![k]!.number
                let value
                if (bv === BingoBall.FREE_SPACE) {
                    value = "FREE"
                } else {
                    value = bv.toString()
                }
                new NumberButton(scene, xp, yp, value)
            }
        }
    }
}

export default CardPanel