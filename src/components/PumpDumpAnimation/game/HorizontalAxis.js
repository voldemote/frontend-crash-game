import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";
import { Container } from "pixi.js";
import { PumpDumpGameMananger } from "./PumpDumpGameManager";


const AXIS_LABEL_FONT_FAMILY = 'PlusJakarta-Bold';
const AXIS_LABEL_COLOR = 0x605c8d;
const AXIS_LABEL_FONT_SIZE = 10;
const AXIS_LABEL_GAP = 5;

const AXIS_LINE_HEIGHT = 15;

const AXIS_COUNT = 20;
const AXIS_START_POS_X = 0.2;
const AXIS_BOTTOM_GAP = 7.5;

export class HorizontalAxis extends Container {
    axisLines = [];  // Graphic Lines Texture Sprites
    timeLabels = []; // Text to indicate seconds

    shouldRunUpdate = false;
    gameStartTime = new Date().getTime();

    multiFactor = 5;    // 1 Unit = 5ms
    unitThreshold = 50;     // If Below 50 Units upgrade to the next set 
    initialAxisGap = 100;
    axisGap = 0;
    axisStartPosX = 0;

    prevTimeElapsed = 0;
    reductionRate = 0.075;

    attribs = [
        { multiFactor: 10, lower: 0, upper: 0, prevTimeElapsed: 0, reductionRate: 0.075, unitThreshold: 50, axisGap: 100 },
        { multiFactor: 20, lower: 0, upper: 0, prevTimeElapsed: 0, reductionRate: 0.075, unitThreshold: 50, axisGap: 100 },
        { multiFactor: 100, lower: 0, upper: 0, prevTimeElapsed: 0, reductionRate: 0.5, unitThreshold: 125, axisGap: 250 },
        { multiFactor: 200, lower: 0, upper: 0, prevTimeElapsed: 0, reductionRate: 0.075, unitThreshold: 75, axisGap: 125 },
    ]

    constructor() {
        super();
        this.axisGap = this.initialAxisGap;
        const line = new Graphics();
        line.lineStyle(2, AXIS_LABEL_COLOR, 1);
        line.moveTo(0, 0);
        line.lineTo(0, -AXIS_LINE_HEIGHT);

        const axisPosY = PumpDumpGameMananger.height - AXIS_BOTTOM_GAP;
        this.axisStartPosX = PumpDumpGameMananger.width * AXIS_START_POS_X;
        const lineTexture = PumpDumpGameMananger.app.renderer.generateTexture(line);
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.axisLines[i] = new Sprite(lineTexture);
            this.axisLines[i].position.set(this.axisStartPosX + i * this.axisGap, axisPosY);
            this.axisLines[i].anchor.set(0.5, 1);
        }
        this.addChild(...this.axisLines);
        
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.timeLabels[i] = new Text(`${i * (this.multiFactor / 10)}s`, {
                fontFamily: AXIS_LABEL_FONT_FAMILY,
                fontSize: AXIS_LABEL_FONT_SIZE,
                fill: AXIS_LABEL_COLOR,
            });
            this.timeLabels[i].position.set(this.axisLines[i].x + AXIS_LABEL_GAP, this.axisLines[i].y);
            this.timeLabels[i].anchor.set(0, 1);

        }
        this.addChild(...this.timeLabels);

        this.calculateAttribs();
        console.warn('attribs', this.attribs);
    }

    start(gameStartTime) {
        this.gameStartTime = gameStartTime;
        this.prevTime = this.gameStartTime;
        this.shouldRunUpdate = true;
    }

    stop() {
        this.shouldRunUpdate = false;
    }

    update(delta) {
        if (!this.shouldRunUpdate) {
            return;
        }
        let currTime = new Date().getTime();
        let timeElapsed = currTime - this.gameStartTime;

        this.setupAxis(timeElapsed);


    }

    calculateAttribs() {
        let prevTimeElapsed = this.prevTimeElapsed;
        let multiFactor = this.multiFactor;
        let reductionRate= this.reductionRate;
        let unitThreshold = this.unitThreshold;
        let axisGap = this.axisGap;
        for (let i = 0; i < this.attribs.length; ++i) {
            if (i !== 0) {
                prevTimeElapsed = this.attribs[i - 1].prevTimeElapsed;
                multiFactor = this.attribs[i - 1].multiFactor;
                reductionRate = this.attribs[i - 1].reductionRate;
                unitThreshold = this.attribs[i - 1].unitThreshold;
                axisGap = this.attribs[i - 1].axisGap;
            }
            this.attribs[i].lower = ((axisGap - unitThreshold) / (reductionRate / multiFactor)) + prevTimeElapsed;
            this.attribs[i].prevTimeElapsed = this.attribs[i].lower;
            if (i !== 0) {
                this.attribs[i - 1].upper = this.attribs[i].lower;
            }
            // Last attrib
            if (i === this.attribs.length - 1) {
                this.attribs[i].upper = 5000000;
            }
        }
    }

    upgradeAxisToNextSet() {
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.timeLabels[i].text = `${i * (this.multiFactor / 10)}s`;
        }
    }

    setupAxis(timeElapsed) {
        this.axisGap = this.initialAxisGap - ((timeElapsed - this.prevTimeElapsed) * (this.reductionRate / this.multiFactor));       // 1 unit = 5ms / 10ms / 50ms etc.

        for (let i = 1; i < AXIS_COUNT; ++i) {
            this.axisLines[i].position.x = (this.axisLines[i - 1].position.x + this.axisGap);
            this.timeLabels[i].position.x = this.axisLines[i].position.x + AXIS_LABEL_GAP;
        }


        if (this.axisGap <= this.unitThreshold) {
            console.log('before axis gap', this.axisGap, timeElapsed, timeElapsed - this.prevTimeElapsed);
            this.axisGap = this.initialAxisGap;
            for (let i = 0; i < this.attribs.length; ++i) {
                if (timeElapsed >= this.attribs[i].lower && timeElapsed < this.attribs[i].upper) {
                    this.multiFactor = this.attribs[i].multiFactor;
                    this.initialAxisGap = this.attribs[i].axisGap;
                    this.prevTimeElapsed = this.attribs[i].prevTimeElapsed;
                    this.reductionRate = this.attribs[i].reductionRate;
                    this.unitThreshold = this.attribs[i].unitThreshold;
                    break;
                }
            }
            
            // if (timeElapsed >= this.attribs[0].lower && timeElapsed < this.attribs[0].upper) {
            //     this.multiFactor = this.attribs[0].multiFactor;
            //     this.initialAxisGap = this.attribs[0].axisGap;
            //     this.prevTimeElapsed = this.attribs[0].prevTimeElapsed;
            // } else if (timeElapsed > 23400 && timeElapsed < 100000) {
            //     this.multiFactor = 100;
            //     this.initialAxisGap = 500;
            //     this.unitThreshold = 200;
            //     this.reductionRate = 2;
            // } else if (timeElapsed > 100000) {
            //     this.multiFactor = 200;
            //     this.initialAxisGap = 200;
            //     this.reductionRate = 0.2;
            // } else {
            //     this.multiFactor = 500;
            //     this.initialAxisGap = 200;
            //     this.reductionRate = 0.2;
            // }
            this.upgradeAxisToNextSet();
        }

        console.log('time', timeElapsed);
    }



}