import { handleVisibilityChange } from "components/PumpDumpAnimation/utils/VisibilityCheck";
import { Container } from "pixi.js";
import { isMobile } from "react-device-detect";
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

    visibilityChangeRemoveHandle = null;

    audioManager;

    constructor(gameStartTime, audioManager) {
        super();

        this.audioManager = audioManager;

        this.barChartContainer = new BarChartContainer(this.audioManager);
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

        this.audioManager.startBgm();
    }

    start(gameStartTime) {
        this.gameStartTime = gameStartTime;

        // Handle whenever player switches tabs.
        this.visibilityChangeRemoveHandle = handleVisibilityChange(undefined, () => {
            this.handleNonFreshStart(Date.now() - this.gameStartTime)
        });

        // If game has already been running
        let timeElapsed = Date.now() - this.gameStartTime;
        if (timeElapsed > 1000) {
            this.handleNonFreshStart(timeElapsed);
        }
        this.horizontalAxis.start();
        this.verticalAxis.start();
        this.barChartContainer.start();

        console.warn('isMobile', isMobile);
    }

    handleNonFreshStart(timeElapsed) {
        this.horizontalAxis.handleNonFreshStart(timeElapsed);
        this.verticalAxis.handleNonFreshStart(timeElapsed);
        this.barChartContainer.handleNonFreshStart(timeElapsed);
    }

    stop() {
        this.horizontalAxis.stop();
        this.verticalAxis.stop();
        this.barChartContainer.stop();
        if (this.visibilityChangeRemoveHandle) {
            this.visibilityChangeRemoveHandle();
        }
        this.audioManager.stopBgm();
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
        let timeElapsed = Date.now() - this.gameStartTime;
        this.barChartContainer.createCrashBar(timeElapsed)
        this.barChartContainer.eventEmitter.once('crash-bar-created', (bar) => {
            this.endGameContainer.showCrash(bar);
        });
    }
}