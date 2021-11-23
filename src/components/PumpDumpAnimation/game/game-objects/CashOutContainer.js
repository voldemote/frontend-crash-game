import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { EventEmitter } from "eventemitter3";
import { calcCrashFactorFromElapsedTime } from "components/RosiGameAnimation/canvas/utils";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import { INIT_STICK_POINT_TIME } from "./HorizontalAxis";
import { AXIS_START_POS_OFFSET_Y, INITIAL_AXIS_GAP, INIT_STICK_POINT_CRASH_FACTOR } from "./VerticalAxis";
import TWEEN from '@tweenjs/tween.js';


// size of the stick visible at the top. Bot size will be same as the top
const STICK_HEIGHT_OFFSET = 10;

const STICK_WIDTH = 5;
const BAR_WIDTH = 25;
const BAR_ROUNDNESS = 4;

const CONT_START_Y = -AXIS_START_POS_OFFSET_Y;

const INIT_CREATE_THRESHOLD = 300;   // Every 300ms generate a bar

const MERGE_BAR_COUNT = 2;

const reducer = (accumlated, current) => {
    return {
        x: accumlated.x + current.x,
        y: accumlated.y + current.y,
        heightIndex: accumlated.heightIndex + current.heightIndex
    };
}

export class BarChartContainer extends Container {
    audioManager = null;

    constructor(audioManager) {
        super();
        this.eventEmitter = new EventEmitter();
        this.audioManager = audioManager;

        const height = PumpDumpGameMananger.height;
        const width = PumpDumpGameMananger.width;
        this.position.set(width * 0.2, height + CONT_START_Y);

    }


    update(timeElapsed) {
        if (!this.shouldRunUpdate) {
            return;
        }

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        this.handleContainerScale(timeElapsed, crashFactor);
        if (this.shouldBarsMerge()) {
            this.mergeBars();
        }
        this.setupBarChart(timeElapsed, crashFactor);

    }
}