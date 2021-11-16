import { Graphics } from "@pixi/graphics";
import { Text } from "@pixi/text";
import { calcCrashFactorFromElapsedTime } from "components/RosiGameAnimation/canvas/utils";
import { Container } from "pixi.js";
import { PumpDumpGameMananger } from "./PumpDumpGameManager";


const AXIS_LABEL_FONT_FAMILY = 'PlusJakarta-Bold';
const AXIS_LABEL_COLOR = 0x605c8d;
const AXIS_LABEL_FONT_SIZE = 10;
const AXIS_LABEL_MINI_FONT_SIZE = 8;
const AXIS_LABEL_GAP = 7.5;

const AXIS_BIG_LINE_HEIGHT = 25;
const AXIS_MEDIUM_LINE_HEIGHT = 20;
const AXIS_SMALL_LINE_HEIGHT = 7.5;

const AXIS_COUNT = 20;
const AXIS_START_POS_Y = 0.93;
const AXIS_RIGHT_GAP = 50;

export class VerticalAxis extends Container {
    axisLines = [];  // Graphic Lines
    multiplierLabels = []; // Text to indicate multipliers
    miniMultiplierLabels = [];  // Text to indicate mini multipliers

    multiFactor = 2;    // 1 Unit = 5ms
    unitThreshold = 40;     // If Below 50 Units upgrade to the next set 
    axisGap = 50;
    initialAxisGap = 50;
    axisStartPosY = 0;
    prevCrashFactor = 100;  // 1.00
    reductionRate = 0.2;

    isHalfAxis = false;

    attribs = [
        { multiFactor: 2, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 30, axisGap: 40, isHalfAxis: true },
        { multiFactor: 4, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 40, axisGap: 60, isHalfAxis: false },
        { multiFactor: 4, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 30, axisGap: 40, isHalfAxis: true },
        { multiFactor: 8, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 40, axisGap: 60, isHalfAxis: false },
        { multiFactor: 8, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 30, axisGap: 40, isHalfAxis: true },
        { multiFactor: 16, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 40, axisGap: 60, isHalfAxis: false },
        { multiFactor: 16, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 30, axisGap: 40, isHalfAxis: true },
        { multiFactor: 32, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 40, axisGap: 60, isHalfAxis: false },
        { multiFactor: 32, lower: 0, upper: 0, prevCrashFactor: 0, reductionRate: 0.2, unitThreshold: 30, axisGap: 40, isHalfAxis: true },
    ]

    constructor() {
        super();

        const normalAxisPiece = this.generateNormalAxisPiece();
        const axisPosX = PumpDumpGameMananger.width - AXIS_RIGHT_GAP;
        this.axisStartPosY = PumpDumpGameMananger.height * AXIS_START_POS_Y;
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.axisLines[i] = normalAxisPiece.clone();
            this.axisLines[i].position.set(axisPosX, this.axisStartPosY - i * this.axisGap);
        }
        this.addChild(...this.axisLines);

        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.multiplierLabels[i] = new Text('1.00x', {
                fontFamily: AXIS_LABEL_FONT_FAMILY,
                fontSize: AXIS_LABEL_FONT_SIZE,
                fill: AXIS_LABEL_COLOR,
            });
            this.multiplierLabels[i].position.set(this.axisLines[i].x + AXIS_LABEL_GAP, this.axisLines[i].y);
            this.multiplierLabels[i].anchor.set(0, 0.5);

            this.miniMultiplierLabels[i] = new Text('1.10x', {
                fontFamily: AXIS_LABEL_FONT_FAMILY,
                fontSize: AXIS_LABEL_MINI_FONT_SIZE,
                fill: AXIS_LABEL_COLOR,
            });
            this.miniMultiplierLabels[i].position.set(this.axisLines[i].x + AXIS_LABEL_GAP, this.axisLines[i].y - this.axisGap * 0.5);
            this.miniMultiplierLabels[i].anchor.set(0, 0.5);

        }
        this.addChild(...this.multiplierLabels);
        this.addChild(...this.miniMultiplierLabels);

        this.upgradeAxisToNextSet();
        this.calculateAttribs();
        console.warn('verticle attribs', this.attribs);
    }

    calculateAttribs() {
        let prevCrashFactor = this.prevCrashFactor;
        let multiFactor = this.multiFactor;
        let reductionRate = this.reductionRate;
        let unitThreshold = this.unitThreshold;
        let axisGap = this.axisGap;
        for (let i = 0; i < this.attribs.length; ++i) {
            if (i !== 0) {
                prevCrashFactor = this.attribs[i - 1].prevCrashFactor;
                multiFactor = this.attribs[i - 1].multiFactor;
                reductionRate = this.attribs[i - 1].reductionRate;
                unitThreshold = this.attribs[i - 1].unitThreshold;
                axisGap = this.attribs[i - 1].axisGap;
            }
            this.attribs[i].lower = ((axisGap - unitThreshold) / (reductionRate / multiFactor)) + prevCrashFactor;
            this.attribs[i].prevCrashFactor = this.attribs[i].lower;
            if (i !== 0) {
                this.attribs[i - 1].upper = this.attribs[i].lower;
            }
            // Last attrib
            if (i === this.attribs.length - 1) {
                this.attribs[i].upper = 5000000;
            }
        }
    }

    // Generate 1 piece of axis which includes 1 Big Line, 3 Small Lines, 1 Medium Line and again 3 Small Lines in order
    //  Looks like this =>  |...!... ('.' indicate small lines, '|' indicate big line, '!' medium line)
    generateNormalAxisPiece(existingAxisLine = undefined) {
        let line;
        if (existingAxisLine) {
            line = existingAxisLine;
            line.clear();
        } else {
            line = new Graphics();
        }
        line.lineStyle(2, AXIS_LABEL_COLOR, 1);
        // Big Line
        line.moveTo(0, 0);
        line.lineTo(-AXIS_BIG_LINE_HEIGHT, 0);

        // 3 Small Lines
        for (let i = 1; i <= 3; ++i) {
            let yPos = i * -this.axisGap / 8;
            line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
            line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);
        }

        // Medium Line
        let yPos = -this.axisGap / 2
        line.moveTo(0, yPos);
        line.lineTo(-AXIS_MEDIUM_LINE_HEIGHT, yPos);

        // Again 3 Small Lines
        for (let i = 5; i <= 8; ++i) {
            let yPos = i * -this.axisGap / 8;
            line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
            line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);
        }
        return line;
    }

    // Generate half piece of axis which includes 1 Big Line, 1 Small Line, 1 Medium Line and again 1 Small Line in order
    //  Looks like this =>  |.!. ('.' indicate small lines, '|' indicate big line, '!' medium line)
    generateHalfAxisPiece(existingAxisLine = undefined) {
        let line;
        if (existingAxisLine) {
            line = existingAxisLine;
            line.clear();
        } else {
            line = new Graphics();
        }
        line.lineStyle(2, AXIS_LABEL_COLOR, 1);
        // Big Line
        line.moveTo(0, 0);
        line.lineTo(-AXIS_BIG_LINE_HEIGHT, 0);

        // 1 Small Line
        let yPos = -this.axisGap / 4;
        line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
        line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);

        // Medium Line
        yPos = -this.axisGap / 2
        line.moveTo(0, yPos);
        line.lineTo(-AXIS_MEDIUM_LINE_HEIGHT, yPos);

        // Again 3 Small Lines
        yPos = 3 * -this.axisGap / 4;
        line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
        line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);
        return line;
    }

    start(gameStartTime) {
        this.gameStartTime = gameStartTime;
        this.shouldRunUpdate = true;
    }

    stop() {
        this.shouldRunUpdate = false;
    }

    update(delta) {
        if (!this.shouldRunUpdate) {
            return;
        }

        this.setupAxis(this.gameStartTime);
    }

    upgradeAxisToNextSet() {
        for (let i = 0; i < AXIS_COUNT; ++i) {
            let val = (1 + i * (this.multiFactor / 10));
            this.multiplierLabels[i].text = `${val.toFixed(2)}x`;
            this.miniMultiplierLabels[i].text = `${(val + (this.multiFactor / 20)).toFixed(2)}x`;
        }
    }

    setupAxis(timeElapsed) {
        let diff = Date.now() - timeElapsed;
        const crashFactor = calcCrashFactorFromElapsedTime(diff < 1 ? 1 : diff) * 100;
        console.log(crashFactor);

        
        this.axisGap = this.initialAxisGap - ((crashFactor - this.prevCrashFactor) * (this.reductionRate / this.multiFactor));       // 1 unit = 5ms / 10ms / 50ms etc.
        console.log('axis Gap', this.axisGap);

        for (let i = 0; i < AXIS_COUNT; ++i) {
            if (this.isHalfAxis) {
                this.generateHalfAxisPiece(this.axisLines[i]);
            } else {
                this.generateNormalAxisPiece(this.axisLines[i]);
            }
            this.axisLines[i].position.y = this.axisStartPosY - i * this.axisGap;
            this.multiplierLabels[i].position.y = this.axisLines[i].y;
            this.miniMultiplierLabels[i].position.y = this.axisLines[i].y - this.axisGap * 0.5;
        }

        if (this.axisGap <= this.unitThreshold) {
            console.log('before verticle axis gap', this.axisGap, crashFactor, crashFactor - this.prevCrashFactor);
            this.axisGap = this.initialAxisGap;
            for (let i = 0; i < this.attribs.length; ++i) {
                if (crashFactor >= this.attribs[i].lower && crashFactor < this.attribs[i].upper) {
                    this.isHalfAxis = this.attribs[i].isHalfAxis;
                    this.multiFactor = this.attribs[i].multiFactor;
                    this.initialAxisGap = this.attribs[i].axisGap;
                    this.prevCrashFactor = this.attribs[i].prevCrashFactor;
                    this.reductionRate = this.attribs[i].reductionRate;
                    this.unitThreshold = this.attribs[i].unitThreshold;
                    break;
                }
            }
            this.upgradeAxisToNextSet();
        }

    }
}