import { ASSET_LIST } from "components/PumpDumpAnimation/config";
import { Container, Sprite } from "pixi.js";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import TWEEN from '@tweenjs/tween.js';

export class MemeContainer extends Container {
    memeConfig = [
        { x: 0.2, y: 0.2 },
        { x: 0.4, y: 0.75 },
        { x: 0.7, y: 0.7 },
    ];
    currentMemeIndex = 0;

    memeTextures = [
        "MEME_1",
        "MEME_1",
        "MEME_1",
        "MEME_1",
        "MEME_1",
    ]


    constructor() {
        super();
        this.currentMemeIndex = 0;
    }

    generateNextMeme() {
        if (this.currentMemeIndex > 2) {
            return;
        }
        const resources = PumpDumpGameMananger.app.loader.resources;
        const width = PumpDumpGameMananger.width;
        const height = PumpDumpGameMananger.height;

        let meme = new Sprite(resources[ASSET_LIST[this.memeTextures[this.currentMemeIndex]]].texture);
        meme.scale.set(0);
        meme.position.set(this.memeConfig[this.currentMemeIndex].x * width, this.memeConfig[this.currentMemeIndex].y * height);
        meme.anchor.set(0.5);
        this.addChild(meme);
        this.currentMemeIndex++;

        let scaleData = { val: 0 };

        new TWEEN.Tween(scaleData)
            .to({ val: 0.5 }, 400)
            .onUpdate(() => {
                meme.scale.set(scaleData.val);
            })
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }

}