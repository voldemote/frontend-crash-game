class AnimationController {
  init(canvas, options) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: 1,
      antialias: true,
    });

    this.audioReady = false;
    let volumeLevel = '1.0';
    try {
      volumeLevel = localStorage.getItem('gameVolume');
    } catch (e) {
      console.error(e);
    }
    this.audio = new AudioController();

    this.audio.setBgmIndex(options.musicIndex);

    this.gameStartTime = 0;
    this.lastCrashFactor = 1.0;
    this.currentIntervalIndex = -1;
    this.animationIndex = options.animationIndex;
    return {
      audio: this.audio,
    };
  }

  load(done) {
    loadAssets(this.app.loader).then(() => {
      if (done) {
        this.drawElements();
        this.app.ticker.add(dt => this.update(dt));
        done();
      }
    });
  }

  update(dt) {
    const coinPos = this.coinAndTrajectory.getCoinCrashPosition();
    const elapsed = Date.now() - this.gameStartTime;
    const crashFactor = Number(calcCrashFactorFromElapsedTime(elapsed)) || 1.0;
    const maxElonFrames = this.coinAndTrajectory.getElonFramesCount();

    const intervals = ROSI_GAME_INTERVALS;
    const currentInterval =
      intervals.find(
        ([fromFactor, toFactor]) =>
          crashFactor >= fromFactor && crashFactor < toFactor
      ) || intervals[intervals.length - 1];

    const [_f, _t, speed, elonFrame] = currentInterval;
    const currentIntervalIndex = intervals.indexOf(currentInterval);

    if (this.audio) {
      this.audio.setElapsed(elapsed);
    }

    if (
      this.coinAndTrajectory.canUpdateElonFrame() &&
      elonFrame < maxElonFrames
    ) {
      this.coinAndTrajectory.setElonFrame(elonFrame);
    }

    if (this.currentIntervalIndex !== currentIntervalIndex) {
      this.background.setStarsSpeed(speed);
      this.currentIntervalIndex = currentIntervalIndex;
    }

    if (this.background.shouldShowStarshipAnimation(crashFactor)) {
      this.background.doStarshipAnimation();
    }

    TWEEN.update(this.app.ticker.lastTime);
    this.cashedOut.update(dt, elapsed, coinPos);
    this.background.update(dt, this.coinAndTrajectory.trajectoryAngle);
  }

  drawElements() {
    this.background = new RosiAnimationBackground(this.app);
    this.app.stage.addChild(this.background.container);

    this.coinExplosion = new CoinExplosion(this.app);
    this.coinAndTrajectory = new CoinAnimation(this.app);
    this.cashedOut = new CashedOutAnimation(this.app, this.coinAndTrajectory);
    this.preparingRound = new PreparingRound(this.app, this.animationIndex);

    this.app.stage.addChild(this.coinAndTrajectory.container);
    this.app.stage.addChild(this.cashedOut.container);
    this.app.stage.addChild(this.coinExplosion.container);
    this.app.stage.addChild(this.preparingRound.container);
  }

  start(gameStartTime, musicIndex) {
    this.preparingRound.hide();
    this.coinAndTrajectory.startCoinFlyingAnimation(gameStartTime);
    this.cashedOut.reset();
    this.gameStartTime = gameStartTime;
    this.currentIntervalIndex = -1;
    this.background.updateStarshipAnimationTrigger();
    this.audio.setBgmIndex(musicIndex);
    this.audio.startBgm();
  }

  end(isLosing) {
    const coinPosition = this.coinAndTrajectory.getCoinExplosionPosition();
    this.coinExplosion.startAnimation(coinPosition.x, coinPosition.y);
    this.cashedOut.crashed = true;
    this.coinAndTrajectory.endCoinFlyingAnimation();
    isLosing ? this.audio.playLoseSound() : this.audio.playGameOverSound();
    this.audio.stopBgm();
  }

  doCashedOutAnimation(data) {
    const point = this.coinAndTrajectory.getCoinCrashPosition();
    const elapsed = Date.now() - this.gameStartTime;
    this.cashedOut.animate(point.x, data.amount, data.crashFactor, elapsed);
  }
}

export default new AnimationController();
