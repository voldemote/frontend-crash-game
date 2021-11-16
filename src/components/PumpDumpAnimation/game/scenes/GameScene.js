import { Container } from "pixi.js";
import { HorizontalAxis } from "../HorizontalAxis";
import { VerticalAxis } from "../VerticalAxis";

export class GameScene extends Container {

    horizontalAxis = null;
    verticalAxis = null;

    constructor(gameTime) {
        super();
        this.horizontalAxis = new HorizontalAxis();
        this.addChild(this.horizontalAxis);

        this.verticalAxis = new VerticalAxis();
        this.addChild(this.verticalAxis);

        this.start(gameTime);
    }

    start(gameTime) {
        this.horizontalAxis.start(gameTime);
        this.verticalAxis.start(gameTime);
    }

    update(delta) {
        this.horizontalAxis.update(delta);
        this.verticalAxis.update(delta);

    }
}