import { Container } from "pixi.js";
import { BarChartContainer } from "../game-objects/BarChartContainer";
import { EndGameContainer } from "../game-objects/EndGameContainer";
import { HorizontalAxis } from "../game-objects/HorizontalAxis";
import { MemeContainer } from "../game-objects/MemeContainer";
import { VerticalAxis } from "../game-objects/VerticalAxis";

export class GameScene extends Container {

    barChartContainer = null;
    horizontalAxis = null;
    verticalAxis = null;
    memeContainer = null;
    endGameContainer = null;

    gameStartTime = 0;

    memeThreshold = 10000;

    constructor(gameStartTime) {
        super();

        this.barChartContainer = new BarChartContainer();
        this.addChild(this.barChartContainer);

        this.horizontalAxis = new HorizontalAxis();
        this.addChild(this.horizontalAxis);

        this.verticalAxis = new VerticalAxis();
        this.addChild(this.verticalAxis);

        this.memeContainer = new MemeContainer();
        this.addChild(this.memeContainer);

        this.endGameContainer = new EndGameContainer();
        this.addChild(this.endGameContainer);

        this.start(gameStartTime);
    }

    start(gameStartTime) {
        this.gameStartTime = gameStartTime;
        this.horizontalAxis.start();
        this.verticalAxis.start();
        this.barChartContainer.start();
    }

    stop() {
        this.horizontalAxis.stop();
        this.verticalAxis.stop();
        this.barChartContainer.stop();
    }

    update() {
        let timeElapsed = Date.now() - this.gameStartTime;
        this.horizontalAxis.update(timeElapsed);
        this.verticalAxis.update(timeElapsed);
        this.barChartContainer.update(timeElapsed);
        if (timeElapsed > this.memeThreshold) {
            this.memeThreshold = timeElapsed + this.memeThreshold * 2;
            this.memeContainer.generateNextMeme();
        }
    }

    handleEndGame() {
        this.endGameContainer.showCrash();
    }
}