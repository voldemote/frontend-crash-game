const axios = require('axios').default;
const _ = require('lodash');

// default routes, set meta values for static pages
let meta = {
  '/': {
    title: 'Wallfair',
    description: 'Fair, Social, Decentralized',
    image: 'https://app.wallfair.io/logo_512.png?v=3',
    keywords: 'Wallfair, casino, betting, esports, crypto',
  },
  // '/live-events/all': {
  //   title: 'Wallfair Live Events',
  //   description: 'High Energy, Live events',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords: 'wallfair, casino, live, events, betting, esports, gaming',
  // },
  // '/live-events': {
  //   title: 'Wallfair Live Events',
  //   description: 'Fast Paced Live-Events',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords:
  //     'wallfair, casino, live, events, esports, crypto, gaming, sports, betting',
  // },
  // '/events/all': {
  //   title: 'Wallfair Events',
  //   description: 'Intense, high-paced and hilarious events for everyone',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords:
  //     'wallfair, casino, events, politics, news, sports, esports, gaming, crypto',
  // },
  // '/events': {
  //   title: 'Wallfair Events',
  //   description: 'Will Harris take the 2024 US Election?',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords:
  //     'wallfair, Casino, Events, Harris, Biden, Trump, Crypto, Esports, Sports, Gaming',
  // },
  // '/games': {
  //   title: 'Wallfair Games',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords:
  //     'wallfair, casino, games betting, vegas, gambling, odds, roulette, crypto-casino',
  // },
  '/games/elon-game': {
    title: 'Wallfair Elon Game',
    description: 'To the Moon with Elon, big wins, tiny rocket',
    image: 'https://app.wallfair.io/images/seo/rosi-games-banner.png?v=3',
    keywords:
      'Wallfair, Casino, Games, Elon, Moon, Rocket, Crash, Crypto, Betting',
  },
  '/games/alpaca-wheel': {
    title: 'Wallfair Alpaca Wheel',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/alpacawheel-banner.png?v=3',
    keywords:
      'wallfair, Casino, Games, Wheel, Crypto, Betting',
  },
  '/games/pump-dump': {
    title: 'Wallfair Pump & Dump Game',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/pump-dump-banner.png?v=3',
    keywords:
      'wallfair, pump, dump, crash, Casino, Games, Crypto, Betting',
  },
  '/games/plinko': {
    title: 'Wallfair Plinko Game',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/plinko-banner.png?v=3',
    keywords:
      'wallfair, plinko, Casino, Games, Crypto, Betting',
  },
  '/games/mines': {
    title: 'Wallfair Mines Game',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/alpaca-mines-banner.png?v=3',
    keywords:
      'wallfair, mines, minesweeper, Games, Crypto, Casino, Betting',
  },
  '/games/alpacannon': {
    title: 'Wallfair Alpacannon Game',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/alpacannon-banner.png?v=3',
    keywords:
      'wallfair, dice, cannon, alpacannon, Games, Crypto, Casino, Betting',
  },
};

module.exports = {
  // Append routes
  appendRoutes: async (apiPath, listPaths = []) => {
    for (let listCounter = 0; listCounter < listPaths.length; listCounter++) {
      // quering api to get data
      const response = await axios.get(`${apiPath}${listPaths[listCounter]}`);
      if (response && response.data) {
        const dataKeys = Object.keys(response.data);
        dataKeys.forEach(key => {
          const singleEvent = response.data[key];
          const { slug, name, previewImageUrl, bets, tags } = singleEvent;

          const eventTags = _.map(tags, 'name') || [];
          const keywordsToUse = eventTags.length
            ? eventTags.join(', ')
            : meta['/'].keywords;

          const eventSlug = '/trade/' + slug;
          meta[eventSlug] = {
            title: name,
            description: name,
            image: previewImageUrl || meta['/'].image,
            keywords: keywordsToUse,
          };
          // Getting data from bets
          if (bets) {
            bets.forEach(singleBet => {
              const {
                marketQuestion,
                description,
                evidenceDescription,
                slug: betSlug,
              } = singleBet;
              meta[`${eventSlug}/${betSlug}`] = {
                title: marketQuestion,
                description: description ? description : evidenceDescription,
                image: previewImageUrl || meta['/'].image,
                keywords: `bets, ${keywordsToUse}`,
              };
            });
          }
        });
      }
    }
    return meta;
  },
  // Append routes
  appendRoutesForUser: async (apiPath, userId) => {
    const response = await axios.get(apiPath);
    if (response && response.data) {
      let data = response.data;
      const userName = data['username'] || 'alpaca';
      const aboutMe =
        data['aboutMe'] ||
        'This user has not provided an about info yet. How boring!';
      const photoUrl =
        data['profilePicture'] || 'https://app.wallfair.io/logo_192.png';
      const userTag = '/user/' + userId;
      meta[userTag] = {
        title: userName,
        description: aboutMe,
        image: photoUrl,
        keywords: 'wallfair, casino, users, profile, social, gaming, crypto',
      };
    }
    return meta;
  },
};
