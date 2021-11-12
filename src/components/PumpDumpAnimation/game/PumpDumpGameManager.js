import { Application } from "@pixi/app";

/*this class is purely static. Don't new this class*/
export class PumpDumpGameMananger {

    // Safely store variables for our game
    static app;

    // A DisplayObject with its own update method
    static currentScene;    

    // With getters but not setters, these variables become read-only
    static get width() {
        if (this.app == null) return 0;
        return this.app.renderer.width;
    }
    static get height() {
        if (this.app == null) return 0;
        return this.app.renderer.height;
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

        console.log(this.app)

        // Add the ticker
        this.app.ticker.add(this.update, this)
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

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    static update(framesPassed) {
        if (this.currentScene) {
            // framesPassed is not desireable in most cases, hence we pass the delta
            this.currentScene.update(this.app.ticker.deltaMS);
        }
    }
}