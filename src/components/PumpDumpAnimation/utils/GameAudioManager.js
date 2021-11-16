import * as Sound from '@pixi/sound';

export class GameAudioManager {
    constructor(bgmIndex = 0) {
        let volume = 0;
        try {
            const savedVolume = localStorage.getItem('gameVolume');
            this.volume = savedVolume ? parseFloat(savedVolume) : volume;
        } catch (e) {
            this.volume = 0;
            console.error(e);
        }
        this.errors = [];
        this.bgmIndex = bgmIndex;
        this.elapsed = 0;
        this.ready = true;

        Sound.sound.add(
            {
                bgm: {
                    url: '/sounds/elon/elon_bgm.mp3',
                    loop: true,
                },
                flying: {
                    url: '/sounds/elon/flying.mp3',
                    loop: true,
                },
                gameover: {
                    url: '/sounds/elon/sfx_gameover.mp3',
                    loop: false,
                },
                lose: {
                    url: '/sounds/elon/sfx_lose.mp3',
                    loop: false,
                },
                cashout: {
                    url: '/sounds/elon/sfx_cashout3.mp3',
                    loop: false,
                },
                placebet: {
                    url: '/sounds/elon/sfx_placebet.mp3',
                    loop: false,
                },
            },
            {
                loaded: (err, data) => {
                    if (err) {
                        this.errors = [...this.errors, err];
                    }
                },
                preload: true,
            }
        );
    }

    setVolume(volume = 1.0) {
        try {
            if (volume === 1 || volume === '1') {
                this.volume = 1.0;
            } else if (!volume) {
                this.volume = 0.0;
            } else {
                this.volume = volume;
            }

            localStorage.setItem('gameVolume', `${volume}`);

            Sound.sound.volume('bgm', this.volume);
            Sound.sound.volume('flying', this.volume);
        } catch (e) {
            console.error('Audio output error');
        }
    }

    mute() {
        this.setVolume(0.0);
    }

    setElapsed(elapsed) {
        this.elapsed = elapsed;
    }

    setBgmIndex(idx = 0) {
        this.bgmIndex = idx;
    }

    playSound(name, loop = false) {
        try {
            if (this.ready) {
                Sound.sound.volume(name, this.volume);
                Sound.sound.play(name, {
                    loop: loop,
                });
            }
        } catch (e) {
            console.error('Audio output error');
        }
    }

    stopSound(name) {
        Sound.sound.stop(name);
    }

    startBgm() {
        const diff = this.elapsed / 1000;
        if (this.bgmIndex === 0) {
            this.playSound('bgm', true);
        }
        if (this.bgmIndex === 1) {
            this.playSound('flying', true);
        }
    }

    stopBgm() {
        this.stopSound('bgm');
        this.stopSound('flying');
    }

    playGameOverSound() {
        this.playSound('gameover');
    }

    playLoseSound() {
        this.playSound('lose');
    }

    playWinSound() {
        this.playSound('cashout');
    }

    playBetSound() {
        this.playSound('placebet');
    }
}