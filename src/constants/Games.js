import IconType from '../components/Icon/IconType';
import RosiImg from '../data/backgrounds/games/elon-game-banner.png';
import First from '../data/backgrounds/games/game1-bg.png';
import Second from '../data/backgrounds/games/game2-bg.png';
import Third from '../data/backgrounds/games/game3-bg.png';
import Fourth from '../data/backgrounds/games/game4-bg.png';
import Fifth from '../data/backgrounds/games/game5-bg.png';
import Sixth from '../data/backgrounds/games/game6-bg.png';
import Seventh from '../data/backgrounds/games/game7-bg.png';
import Eight from '../data/backgrounds/games/game8-bg.png';
import AlpacaWheel from '../data/backgrounds/games/game-alpacawheel.png';
import Plinko from '../data/backgrounds/games/game-plinko.png';
import PumpDump from '../data/backgrounds/games/game-pump-dump.png';
import Routes from './Routes';

import gameCardElon from '../data/images/house-games/card-elon.png';
import gameCard1 from '../data/images/house-games/card-1.png';
import gameCard5 from '../data/images/house-games/card-5.png';
import gameCardPumpDump from '../data/images/house-games/card-pumpdump.png';
import gameCard4 from '../data/images/house-games/card-4.png';
import gameCardMines from '../data/images/house-games/card-mines.png';
import gameCardAlpacannon from '../data/images/house-games/card-alpacannon-soon.png';

export const CASINO_GAMES = [
  {
    background: RosiImg,
    title: '',
    subtitle: '',
    description: '',
    active: true,
    linkTo: Routes.elonGame,
    infoIcon: {
      iconType: IconType.info,
      content: (
        <div>
          <p>
            <strong>What is Elon Game?</strong>
          </p>
          <p>&nbsp;</p>
          <p>
            The Elon Game is a crash game which promises pure fun and
            excitement, every fall counts!
          </p>
          <p>
            When you start playing it you enter a bet amount. The crash coin
            will go up till it crashes at some random time.
          </p>
          <p>
            In Elon Game, the longer the coin flies, the higher the chance that
            it will crash. If you cash out before the coin explodes, your bet
            will be multiplied by the current number the graph has by the time
            you cash out. If you do not cash out before the graph crashes, you
            will lose your bet.
          </p>
        </div>
      ),
    },
  },
];

export const NEW_SLOTS_GAMES = [
  {
    background: gameCardElon,
    title: `Elon Game`,
    subtitle: '',
    active: true,
    linkTo: '/games/elon-game',
  },
  {
    background: gameCardPumpDump,
    title: `Pump and Dump`,
    subtitle: '',
    active: true,
    linkTo: '/games/pump-dump',
  },
  {
    background: gameCardMines,
    title: `Mines`,
    subtitle: '',
    active: true,
    linkTo: '/games/mines',
  },
  {
    background: gameCard4,
    title: 'Plinko',
    subtitle: '',
    description: '',
    active: true,
    linkTo: '/games/plinko',
  },
  {
    background: gameCard1,
    title: 'Alpaca Wheel',
    subtitle: '',
    description: '',
    active: true,
    linkTo: '/games/alpaca-wheel',
  },
  {
    background: gameCard5,
    title: `Oil Rush`,
    subtitle: '',
    active: false,
    linkTo: '/games/oilrush',
  },
  {
    background: gameCardAlpacannon,
    title: `AlpaCannon`,
    subtitle: '',
    active: false,
    linkTo: '/games/alpacannon',
  },
  /*,
  {
    background: Fourth,
    title: 'Financial Poker',
    subtitle: '',
    description:
      'Bring your poker face and portfolio management skills to live financial poker',
    active: false,
    linkTo: '',
  },
  {
    background: Fifth,
    title: 'Candle Stick',
    subtitle: '',
    description:
      'Game and learn candlestick trading strategy in this jackpot tournament',
    active: false,
    linkTo: '',
  },
  {
    background: First,
    title: 'Midas Trader',
    subtitle: '',
    description: 'Market 1X2 – you know where the prices are going? Prove it!',
    active: false,
    linkTo: '',
  },*/
];

export const SLOTS_GAMES = [
  {
    background: Second,
    title: 'Treasure Island',
    subtitle: '',
    description: 'Market top and flop jackpot tournament',
    active: false,
    linkTo: '',
  },
  {
    background: Third,
    title: 'Market Runner',
    subtitle: '',
    description:
      'Jump and run on each price tick, are you heading north, south or staying put?',
    active: false,
    linkTo: '',
  },
  {
    background: Fourth,
    title: 'Financial Poker',
    subtitle: '',
    description:
      'Bring your poker face and portfolio management skills to live financial poker',
    active: false,
    linkTo: '',
  },
  {
    background: Fifth,
    title: 'Candle Stick',
    subtitle: '',
    description:
      'Game and learn candlestick trading strategy in this jackpot tournament',
    active: false,
    linkTo: '',
  },
  {
    background: First,
    title: 'Midas Trader',
    subtitle: '',
    description: 'Market 1X2 – you know where the prices are going? Prove it!',
    active: false,
    linkTo: '',
  },
];

export const SPORTS_BETTING_GAMES = [
  {
    background: Fifth,
    title: 'Esports',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Sixth,
    title: 'Baseball',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Seventh,
    title: 'Football',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Eight,
    title: 'Tennis',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
];
export const GAMES = {
  pumpDump: {
    id: '61817de6a9695acd029ffef3',
    slug: 'pump-dump',
    name: `Pump and Dump`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/7kdomu0n/show'
  },
  elonGame: {
    id: '614381d74f78686665a5bb76',
    slug: 'elon-game',
    name: `Elon Game`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/bf0vgm9e/show'
  },
  alpacaWheel: {
    id: '618a81ded90fd22298859bc4',
    slug: 'alpaca-wheel',
    name: `Alpaca Wheel`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/L04wbsrn/show'
  },
  plinko: {
    id: '618a821bd90fd22298859bc5',
    slug: 'plinko',
    name: `Plinko`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/gre6zwo2/show',
    outcomesByRisk: [
      [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
      [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170]
    ]
  },
  mines: {
    id: '619cc432121e61d6f06338c9',
    slug: 'mines',
    name: `Mines`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/w32sLogm/show'
  },
  cannon: {
    id: '61a09b35121e61d6f06338ca',
    slug: 'cannon',
    name: 'cannon',
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL
  }
};


export const EXTERNAL_GAMES = [
  {
    GameCategory: 'JetX',
    GameName: 'XGames',
    TechnicalName: 'JetX',
    TechnicalCategory: 'JetX'
  },
  {
    GameCategory: 'Games',
    GameName: 'Cappadocia'
  },
  {
    GameCategory: 'Games',
    GameName: 'Balloon',
  },
  {
    GameCategory: 'XGames',
    GameName: 'JetX3',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Viking',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Aztec',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Birds',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Casino',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Galaxy',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Cowboy',
  },
  {
    GameCategory: 'Slots',
    GameName: 'BookOfWin',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Christmas',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Sport',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Dota',
  },
  {
    GameCategory: 'Slots',
    GameName: 'FunFruit',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Pharaon',
  },
  {
    GameCategory: 'Slots',
    GameName: 'DonutCity',
  },

  {
    GameCategory: 'Slots',
    GameName: 'Samurai',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Football',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Argo',
  },
  {
    GameCategory: 'Slots',
    GameName: 'BankJob',
  },
  {
    GameCategory: 'Slots',
    GameName: 'MoonStone',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Apollo',
  },
  {
    GameCategory: 'Slots',
    GameName: 'Evolution',
  },


  {
    GameCategory: 'Casino Games',
    GameName: 'Virtual Roulette',
    TechnicalName: 'VirtualRoulette',
    TechnicalCategory: 'Games'
  },
  {
    GameCategory: 'Casino Games',
    GameName: 'Virtual Burning Roulette',
    TechnicalName: 'VirtualBurningRoulette',
    TechnicalCategory: 'Games'
  },
  {
    GameCategory: 'Casino Games',
    GameName: 'Bonus Roulette',
    TechnicalName: 'BonusRoulette',
    TechnicalCategory: 'Games'
  },
  /*
  {
    GameCategory: 'Casino Games',
    GameName: 'Personal Roulette',
    TechnicalName: 'AnimationRoulette',
    TechnicalCategory: 'GamesLobby'
  },
  */
  {
    GameCategory: 'Casino Games',
    GameName: 'SicBo',
    TechnicalName: 'SicBo',
    TechnicalCategory: 'Games'
  },
  {
    GameCategory: 'Casino Games',
    GameName: 'Virtual Classic Roulette',
    TechnicalName: 'VirtualClassicRoulette',
    TechnicalCategory: 'Roulette'
  },
  {
    GameCategory: 'Casino Games',
    GameName: 'BlackJack',
    TechnicalName: 'Blackjack',
    TechnicalCategory: 'Games'
  },
  /*
  {
    GameCategory: 'Keno',
    GameName: 'French Keno',
    TechnicalName: 'ClassicKeno',
    TechnicalCategory: 'Keno'
  },*/
  {
    GameCategory: 'Keno',
    GameName: 'Russian Keno',
    TechnicalName: 'RussianKeno',
    TechnicalCategory: 'Keno'
  },
  {
    GameCategory: 'Keno',
    GameName: 'VIP Keno',
    TechnicalName: 'VipKeno',
    TechnicalCategory: 'Keno'
  },
  {
    GameCategory: 'Other Games',
    GameName: 'Lucky Seven',
    TechnicalName: 'LuckySeven',
    TechnicalCategory: 'Games'
  },
  {
    GameCategory: 'Other Games',
    GameName: 'Triple Seven',
    TechnicalName: 'TripleSeven',
    TechnicalCategory: 'Games'
  },
  /*
  {
    GameCategory: 'Other Games',
    GameName: 'Wheel of Light',
    TechnicalName: 'WheelOfLightDeluxe',
    TechnicalCategory: 'Games'
  },
  */
  {
    GameCategory: 'Other Games',
    GameName: 'Space Lotto',
    TechnicalName: 'SpaceLotto',
    TechnicalCategory: 'Games'
  },
  {
    GameCategory: 'Other Games',
    GameName: 'Zodiac Scratch',
    TechnicalName: 'ZodiacScratch',
    TechnicalCategory: 'Games'
  },
  {
    GameCategory: 'Other Games',
    GameName: 'Gem Stones',
    TechnicalName: 'GemStones',
    TechnicalCategory: 'Games'
  },
  /*
  {
    GameCategory: 'Other Games',
    GameName: 'Scratch&Win Deluxe',
    TechnicalName: 'LuckyDoubleDeluxe',
    TechnicalCategory: 'SweetCandy'
  }*/
];
