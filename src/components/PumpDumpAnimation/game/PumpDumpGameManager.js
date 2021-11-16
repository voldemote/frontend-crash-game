import { Application } from "@pixi/app";
import { GameScene } from "./scenes/GameScene";
import { LaunchScene } from "./scenes/LaunchScene";
import TWEEN from '@tweenjs/tween.js';


/*this class is purely static. Don't new this class*/
export class PumpDumpGameMananger {

    // Safely store variables for our game
    static app;

    // A DisplayObject with its own update method
    static currentScene;
    
    static _width = 0;
    static _height = 0;

    // With getters but not setters, these variables become read-only
    static get width() {
        return this._width;
    }
    static get height() {
        return this._height;
    }

    static _isGameRunning = false;

    static get isGameRunning() {
        return this._isGameRunning;
    }

    // Use this function ONCE to start the entire game
    static initialize(backgroundColor, viewCanvas) {

        // Create our pixi app
        this.app = new Application({
            view: viewCanvas,
            resolution: 1,
            resizeTo: viewCanvas.parentElement,
            // autoDensity: true,
            antialias: true,
            backgroundColor,
        });

        this._width = this.app.renderer.width;
        this._height = this.app.renderer.height;

        // Add the ticker
        this.app.ticker.add(this.update, this)
    }

    static load(assetList, onLoad) {
        if (this.app) {
            this.app.loader.add(Object.values(assetList));
            this.app.loader.load();
        }
        if (onLoad) {
            this.app.loader.onComplete.once(onLoad);
        }
    }

    // Call this function when you want to go to a new scene
    static changeScene(newScene) {
        // Remove and destroy old scene... if we had one..
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy();
        }

        // Add the new one
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);
    }

    static startGame(gameTime) {
        const gameScene = new GameScene(gameTime);
        this.changeScene(gameScene);
        this._isGameRunning = true;
    }

    static endGame() {
        // remove this once end functionality added
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy();
        }
        // Add endgame functionality
        // Show red bar
        // pause scales
    }

    static launchCoin(launchTime) {
        // Preparation Scene
        if (launchTime <= 0) {
            return;
        }
        this._isGameRunning = false;
        const launchScene = new LaunchScene(launchTime);
        this.changeScene(launchScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    static update(framesPassed) {
        if (this.currentScene) {
            // framesPassed is not desireable in most cases, hence we pass the delta
            this.currentScene.update(this.app.ticker.deltaMS);
        }
        TWEEN.update(this.app.ticker.lastTime);
    }

    static doCashedOutAnimation() {

    }
}