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

    showCrash() {
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

    }

}