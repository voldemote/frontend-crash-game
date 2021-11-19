// import { isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";

// const deviceType = isMobileRosiGame ? 'mobile' : 'desktop';
// const resolution = deviceType === 'mobile' ? 2 : 1;

const constructPath = asset =>
    `/images/pump-dump-game/${asset}`;

export const ASSET_LIST = {
    TWEET_1: constructPath('1.png'),
    TWEET_2: constructPath('2.png'),
    TWEET_3: constructPath('3.png'),
    TWEET_4: constructPath('4.png'),
    TWEET_5: constructPath('5.png'),
    CRASH_1: constructPath('crash_1.png'),
    MEME_1: constructPath('meme_1.png'),
}