import { isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";

// const deviceType = isMobileRosiGame ? 'mobile' : 'desktop';
// const resolution = deviceType === 'mobile' ? 2 : 1;

const constructPath = asset =>
    `/images/pump-dump-game/${isMobileRosiGame ? '@2x':'@1x'}/${asset}`;

// const constructPath = asset =>
//     `/images/pump-dump-game/source/${asset}`;

export const ASSET_LIST = {
    TWEET_1: constructPath('1.png'),
    TWEET_2: constructPath('2.png'),
    TWEET_3: constructPath('3.png'),
    TWEET_4: constructPath('4.png'),
    TWEET_5: constructPath('5.png'),
    CRASH_1: constructPath('crash_1.png'),
    MEME_1: constructPath('meme_1.png'),
}

export const AUDIO_LIST = {
    bgm: {
        url: '/sounds/pump-dump/bg_music_1.mp3',
        loop: true,
    },
    bar: {
        url: '/sounds/pump-dump/bar_sfx.mp3',
        loop: false,
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
}