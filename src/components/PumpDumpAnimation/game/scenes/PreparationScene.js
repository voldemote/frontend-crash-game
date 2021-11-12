import { Container } from "pixi.js";

export class PreparationScene extends Container {

    constructor() {
        super();
        // Add assets etc.
    }

    update(delta) {
        // alter assets
        console.log('framesPassed', delta);
    }
}