import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { calcCrashFactorFromElapsedTime, isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import { AXIS_START_POS_X, INIT_MULTI_FACTOR, INIT_STICK_POINT_TIME } from "./HorizontalAxis";
import { AXIS_START_POS_OFFSET_Y, INITIAL_AXIS_GAP, INIT_STICK_POINT_CRASH_FACTOR, INIT_STICK_UNITS, STICK_POINT_INCREMENTS } from "./VerticalAxis";
import TWEEN from '@tweenjs/tween.js';


// size of the stick visible at the top. Bot size will be same as the top
export const STICK_HEIGHT_OFFSET = isMobileRosiGame ? 5 : 10;

const STICK_WIDTH = isMobileRosiGame ? 2.5 : 5;
const BAR_WIDTH = isMobileRosiGame ? 12.5 : 25;
const BAR_ROUNDNESS = isMobileRosiGame ? 3 : 4;

const BAR_MIN_HEIGHT = isMobileRosiGame ? 10 : 20;
const BAR_HEIGHT_INCREMENTS = isMobileRosiGame ? 5 : 10;

const CONT_START_Y = -AXIS_START_POS_OFFSET_Y;

export const INIT_CREATE_THRESHOLD = isMobileRosiGame ? 500 : 300;   // Every 300ms generate a bar

export const MERGE_BAR_COUNT = 2;

const reducer = (accumlated, current) => {
    return {
        x: accumlated.x + current.x,
        y: accumlated.y + current.y,
        heightIndex: accumlated.heightIndex + current.heightIndex
    };
}

export class BarChartContainer extends Container {
    greenBarTextures = [];
    redBarTextures = [];

    shouldRunUpdate = false;
    
    previousThreshold = 0;
    
    gapBetweenBars = INIT_CREATE_THRESHOLD / INIT_MULTI_FACTOR;
    generatedBars = [];

    barScale = {x: 1, y: 1};

    createThresholdMult = 1;

    audioManager;

    attribs = [
        { threshold: 0.5, done: false, createThresholdMult: 2 },
        { threshold: 0.25, done: false, createThresholdMult: 4 },
        { threshold: 0.125, done: false, createThresholdMult: 8 },
        { threshold: 0.0625, done: false, createThresholdMult: 16 },
        { threshold: 0.03125, done: false, createThresholdMult: 32 },
        { threshold: 0.015625, done: false, createThresholdMult: 64 },
        { threshold: 0.0078125, done: false, createThresholdMult: 128 },
    ]

    constructor(audioManager) {
        super();
        this.audioManager = audioManager;

        const height = PumpDumpGameMananger.height;
        const width = PumpDumpGameMananger.width;
        this.position.set(width * AXIS_START_POS_X, height + CONT_START_Y);

        for (let i = 0; i < 5; ++i) {
            this.greenBarTextures[i] = this.generateBarTexture(BAR_MIN_HEIGHT + BAR_HEIGHT_INCREMENTS * i, 'green');
            this.redBarTextures[i] = this.generateBarTexture(BAR_MIN_HEIGHT + BAR_HEIGHT_INCREMENTS * i, 'red');
        }
        // First Bar
        this.generateBar(0, 100);

        // const bar1 = new Sprite(this.greenBarTextures[0]);
        // bar1.pivot.y = STICK_HEIGHT_OFFSET;
        // bar1.anchor.x = 0.5;
        // bar1.position.set(600, -((200 / 100) - 1) * INITIAL_AXIS_GAP * 5);
        // this.addChild(bar1);

        // this.scale.set(0.0001, 0.01);
        // bar1.scale.set(10000, 100);


        // const bar2 = new Sprite(this.greenBarTextures[3]);
        // bar1.pivot.y = STICK_HEIGHT_OFFSET;
        // bar1.anchor.x = 0.5;
        // bar2.position.set(50, -150);
        // this.addChild(bar2);


    }

    generateBarTexture(height, color = 'green') {
        const bar = new Graphics();
        // Stick visible at the top and the bottom
        bar.beginFill(color === 'green' ? 0x1c5d1a : 0x6a0b3e);
        // Positioning the stick at the center of the bar
        bar.drawRect((BAR_WIDTH - STICK_WIDTH) * 0.5, -STICK_HEIGHT_OFFSET, STICK_WIDTH, height + STICK_HEIGHT_OFFSET * 2);
        bar.endFill();

        // Bar
        bar.beginFill(color === 'green' ? 0x2beb33 : 0xff384b);
        bar.drawRoundedRect(0, 0, BAR_WIDTH, height, BAR_ROUNDNESS);
        bar.endFill();
        
        return PumpDumpGameMananger.app.renderer.generateTexture(bar);
    }

    start() {
        this.shouldRunUpdate = true;
    }

    handleNonFreshStart(timeElapsed) {
        // Remove existing bars if any (Note: we use the same function during PAGE HIDDEN/VISIBLE STATE)
        for (let i = this.generatedBars.length - 1; i >= 0; --i) {
            this.removeChild(this.generatedBars[i]);
        }
        this.generatedBars = [];

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        this.handleContainerScale(timeElapsed, crashFactor);

        this.shouldBarsMerge();

        let runningTime = INIT_CREATE_THRESHOLD * this.createThresholdMult;

        // First Bar
        this.generateBar(0, 100);
        while(runningTime < timeElapsed) {
            const runningCrashFactor = calcCrashFactorFromElapsedTime(runningTime < 1 ? 1 : runningTime) * 100;
            this.previousThreshold = runningTime;
            this.generateBar(this.previousThreshold, runningCrashFactor);
            runningTime += INIT_CREATE_THRESHOLD * this.createThresholdMult;
        }
    }

    stop() {
        this.shouldRunUpdate = false;
    }

    shouldBarsMerge() {
        // The lowest scale that the game can go to on x-scale is = 2500/200000 = 0.0125
        // The lowest scale that the game can go to on y-scale is = 100/10000 = 0.01
        for (let i = this.attribs.length - 1; i >= 0; --i) {
            if (this.scale.x < this.attribs[i].threshold && !this.attribs[i].done) {
                this.attribs[i].done = true;
                this.createThresholdMult = this.attribs[i].createThresholdMult;
                this.attribs.splice(0, i + 1);
                this.barScale = { x: 1 / this.scale.x, y: 1 / this.scale.y };
                return true;
            }
        }
        return false;
    }

    mergeBars() {
        const bigBarConfigs = [];
        const barsToMergeList = [];
        for (let index = this.generatedBars.length - 1; index >= 0; index -= MERGE_BAR_COUNT) {
            const barsToMerge = [];
            let count = 0;
            do {
                barsToMerge.unshift(...this.generatedBars.splice(index - count, 1));
                ++count;
            } while(count < MERGE_BAR_COUNT && this.generatedBars[index - count])

            // Get average position
            const bigBarConfig = barsToMerge.reduce(reducer, { x: 0, y: 0, heightIndex: 0 });
            bigBarConfig.x = barsToMerge[barsToMerge.length - 1].x;
            bigBarConfig.y /= barsToMerge.length;
            bigBarConfig.heightIndex = Math.ceil(bigBarConfig.heightIndex / barsToMerge.length);
            if (Math.abs(bigBarConfig.heightIndex) < 2) {
                bigBarConfig.heightIndex = (1 + Math.floor(Math.random() * 3)) * (bigBarConfig.heightIndex < 0 ? -1 : 1 );
            }

            bigBarConfigs.unshift(bigBarConfig);
            barsToMergeList.unshift({ bars: barsToMerge, bigBarConfig: bigBarConfig});
        }

        barsToMergeList.forEach((barsObject) => {
            this.mergeBarsTween(barsObject.bars, barsObject.bigBarConfig);
        })

        // Start tween on all big bars
        bigBarConfigs.forEach((bigBarConfig, index) => {
            if (index < 3) {
                bigBarConfig.heightIndex = Math.floor(Math.random() * 2) * (bigBarConfig.heightIndex < 0 ? -1 : 1)
            }
            const bigBar = this.createEmergingBiggerBar(bigBarConfig);
            this.generatedBars.push(bigBar);
            this.biggerBarEmergeTween(bigBar);
        });
    }

    createEmergingBiggerBar(bigBarConfig) {
        let texture;
        if (bigBarConfig.heightIndex < 0) {
            texture = this.redBarTextures[bigBarConfig.heightIndex * -1];
        } else {
            texture = this.greenBarTextures[bigBarConfig.heightIndex];
        }
        const bar = new Sprite(texture);
        bar.pivot.y = STICK_HEIGHT_OFFSET;
        bar.scale.set(0);
        bar.anchor.set(0.5);
        bar.position.set(bigBarConfig.x, bigBarConfig.y);
        bar.heightIndex = bigBarConfig.heightIndex;
        this.addChild(bar);
        return bar;

    }

    mergeBarsTween(bars, bigBarConfig) {
        for (let i = 0; i < bars.length; ++i) {
            const bar = bars[i];
            let barData = { x: bar.x, y: bar.y, alpha: 1, scaleX: bar.scale.x, scaleY: bar.scale.y  };
            new TWEEN.Tween(barData)
                .to({ x: bigBarConfig.x, y: bigBarConfig.y, alpha: 0, scaleX: 0, scaleY: 0 }, 600)
                .onUpdate(() => {
                    bar.scale.set(barData.scaleX, barData.scaleY);
                    bar.alpha = barData.alpha;
                    bar.position.set(barData.x, barData.y);
                    if (barData.alpha === 0) {
                        this.removeChild(bar);
                    }
                })
                .easing(TWEEN.Easing.Exponential.Out)
                .start();
        }
    }

    biggerBarEmergeTween(bigBar) {
        let scaleData = { x: 0, y: 0 };

        new TWEEN.Tween(scaleData)
            .to({ x: this.barScale.x, y: this.barScale.y }, 600)
            .onUpdate(() => {
                bigBar.scale.set(scaleData.x, scaleData.y);
            })
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
    }

    showNewBarTween(newBar) {
        let scaleData = { x: 0, y: 0 };
        this.audioManager.playSfx('bar');
        new TWEEN.Tween(scaleData)
            .to({ x: this.barScale.x, y: this.barScale.y }, 300)
            .onUpdate(() => {
                newBar.scale.set(scaleData.x, scaleData.y);
            })
            .easing(TWEEN.Easing.Back.Out)
            .start();
    }

    createCrashBar(timeElapsed) {

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        let crashBarPosition = { 
            x: ((this.previousThreshold + INIT_CREATE_THRESHOLD * this.createThresholdMult) / INIT_CREATE_THRESHOLD) * this.gapBetweenBars, 
            y: -((crashFactor / 100) - 1) * INITIAL_AXIS_GAP * INIT_STICK_UNITS
        };
        let bar = new Sprite(this.redBarTextures[(crashFactor < 150 ? 1 : 4)]);
        // crashBarPosition.y += this.getBarTopEdgeDistance(bar);
        bar.scale.set(0);
        bar.position.set(crashBarPosition.x, crashBarPosition.y);
        this.addChild(bar);

        // Add the bar to the container to get it's global position relative to the container
        const globalPosition = bar.getGlobalPosition();

        const scaleData = { x: 0, y: 0 };
        new TWEEN.Tween(scaleData)
            .to({ x: this.barScale.x, y: this.barScale.y }, 600)
            .onUpdate(() => {
                bar.scale.set(scaleData.x, scaleData.y);
                if (scaleData.x === this.barScale.x) {
                    this.removeChild(bar);
                    bar.position.set(globalPosition.x, globalPosition.y);
                    bar.scale.set(1);
                    this.emit('crash-bar-created', bar);
                }
            })
            .easing(TWEEN.Easing.Back.Out)
            .start();
    }

    handleContainerScale(timeElapsed, crashFactor) {
        let contScale = { x: 1, y: 1 };
        if (timeElapsed > INIT_STICK_POINT_TIME) {
            contScale.x = INIT_STICK_POINT_TIME / timeElapsed;
        }
        if (crashFactor >= INIT_STICK_POINT_CRASH_FACTOR) {
            // The scale start at 100 or 1.00. Hence we subtract crash factor by 100 to get the correct scale
            contScale.y = 100 / (crashFactor - STICK_POINT_INCREMENTS);
        }
        this.scale.set(contScale.x, contScale.y);
    }

    update(timeElapsed) {
        if (!this.shouldRunUpdate) {
            return;
        }

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        this.handleContainerScale(timeElapsed, crashFactor);
        if (this.shouldBarsMerge()) {
            this.emit('bars-merging');
            this.mergeBars();
        }
        this.setupBarChart(timeElapsed, crashFactor);

    }

    setupBarChart(timeElapsed, crashFactor) {
        if (timeElapsed - this.previousThreshold >= INIT_CREATE_THRESHOLD * this.createThresholdMult) {
            this.previousThreshold += INIT_CREATE_THRESHOLD * this.createThresholdMult;
            this.generateBar(this.previousThreshold, crashFactor, true);
        }
    }

    // Top edge of the bar from the center of the bar. Note: Not the top edge of the stick
    getBarTopEdgeDistance(bar) {
        let barHeight = bar.height - (STICK_HEIGHT_OFFSET * 2);
        return (barHeight * 0.5 * this.barScale.y);
    }

    generateBar(timeElapsed, crashFactor, showTween = false) {
        let randMax = this.greenBarTextures.length;
        let randMin = 0;
        // If less that 1.25x don't show tall bars
        if (this.generatedBars.length <= 3) {
            randMax = 1;
        } else {
            randMin = 1;
        }

        // Divide by 100 to get the origCrashFactor 
        // Subtract by -1 since the scale starts with 1.
        // Initially Verticle scale measures (INITIAL_AXIS_GAP) * 5 from 1.00x to 2.00x and are 5 Pieces of axis apart
        let positionY = -((crashFactor / 100) - 1) * INITIAL_AXIS_GAP * INIT_STICK_UNITS;
        let positionX = (timeElapsed / INIT_CREATE_THRESHOLD) * this.gapBetweenBars;
        
        let bar;
        let barHeightIndex = randMin + Math.floor(Math.random() * (randMax - randMin));
        if (Math.random() < 0.1) {
            // Generate random red bars at relatively low positions
            bar = new Sprite(this.redBarTextures[barHeightIndex]);
            positionY += this.getBarTopEdgeDistance(bar) + Math.random() * 10 * this.barScale.y;
            // Note negative HeightIndex for later calculation during bar merge
            bar.heightIndex = -1 * barHeightIndex;
        } else {
            bar = new Sprite(this.greenBarTextures[barHeightIndex]);
            positionY += this.getBarTopEdgeDistance(bar);
            bar.heightIndex = barHeightIndex;
        }
        bar.scale.set(0, 0);
        bar.anchor.set(0.5);
        bar.position.set(positionX, positionY);
        this.addChild(bar);
        if (showTween) {
            this.showNewBarTween(bar);
        } else {
            bar.scale.set(this.barScale.x, this.barScale.y);
        }

        this.generatedBars[this.generatedBars.length] = bar;
    }
}