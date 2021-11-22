import { ASSET_LIST } from "components/PumpDumpAnimation/config";
import { Container, Sprite } from "pixi.js";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import TWEEN from '@tweenjs/tween.js';

export class EndGameContainer extends Container {
    crashTextures = [
        "CRASH_1",
        "CRASH_1",
        "CRASH_1",
        "CRASH_1",
        "CRASH_1",
    ]

    showCrash(crashBar) {
        const resources = PumpDumpGameMananger.app.loader.resources;
        const width = PumpDumpGameMananger.width;
        const height = PumpDumpGameMananger.height;

        let crashImage = new Sprite(resources[ASSET_LIST[this.crashTextures[0]]].texture);
        crashImage.scale.set(0);
        crashImage.position.set(width * 0.75, height * 0.3);
        crashImage.anchor.set(0.5);
        this.addChild(crashImage);

        let scaleData = { val: 0 };
        new TWEEN.Tween(scaleData)
            .to({ val: 1 }, 600)
            .onUpdate(() => {
                crashImage.scale.set(scaleData.val);
            })
            .easing(TWEEN.Easing.Back.Out)
            .start();

        let barAnimData = { scale: crashBar.scale.x, x: crashBar.x, y: crashBar.y };
        this.addChild(crashBar);
        new TWEEN.Tween(barAnimData)
            .to({ scale: 2, x: width * 0.5, y: height * 0.6 }, 800)
            .onUpdate(() => {
                crashBar.position.set(barAnimData.x, barAnimData.y);
                crashBar.scale.set(barAnimData.scale);
            })
            .easing(TWEEN.Easing.Quintic.Out)
            .start();

    }

}