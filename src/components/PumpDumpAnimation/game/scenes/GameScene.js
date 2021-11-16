import { Container } from "pixi.js";
import { HorizontalAxis } from "../HorizontalAxis";
import { VerticalAxis } from "../VerticalAxis";

export class GameScene extends Container {

    horizontalAxis = null;
    verticalAxis = null;

    constructor(gameTime) {
        super();
        // Add assets etc.
        this.horizontalAxis = new HorizontalAxis();
        this.addChild(this.horizontalAxis);
        // this.horizontalAxis.start(new Date().getTime());

        this.verticalAxis = new VerticalAxis();
        this.addChild(this.verticalAxis);

        this.start(gameTime);
    }

    start(gameTime) {
        this.horizontalAxis.start(gameTime);
        this.verticalAxis.start(gameTime);
    }

    update(delta) {
        // alter assets
        this.horizontalAxis.update(delta);
        this.verticalAxis.update(delta);

    }
}