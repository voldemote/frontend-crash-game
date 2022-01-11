const { GAMES, EXTERNAL_GAMES } = require('../constants/Games');
const _ = require('lodash');

export const getGameById = gameTypeId => {
  return _.find(GAMES, { id: gameTypeId });
};

export const getExternalGames = () => {
  return EXTERNAL_GAMES.map((game)=> {
    game.id = ObjectId(game.TechnicalName);
    return game;
  })
}

export const ObjectId = (gamename) => {
  const encoded = new Buffer(gamename).toString('hex').substring(0,23)
  const fill = 24 - encoded.length
  return encoded + ' '.repeat(fill).replace(/./g, (v, i) =>
    ((parseInt(encoded[(i*2)%encoded.length], 16) + parseInt(i*2, 16))%16).toString(16)
  )
}

export const prepareEvoplayGames = (evoplayGames,gamesCategory) => {
  const output = [];
  for (let key in evoplayGames) {
    const gameInfo = evoplayGames[key];
    const catSubType = gameInfo.game_sub_type;
    const name = gameInfo.name;
    let translatedCat = null;

    if(catSubType === 'Slot') {
      translatedCat = 'Slot Games';
    }

    if(catSubType === 'Instant' || catSubType === 'socketgames') {
      translatedCat = 'Instant Win Games';
    }
    if (gamesCategory === "Card Games") {
      if (catSubType === 'Blackjack' || catSubType === 'Baccarat' || catSubType === 'Poker' || (catSubType === 'Table' && name.indexOf('Poker') > -1)) {
        translatedCat = 'Card Games';
      }
    } else if (gamesCategory === "Poker") {
      if (catSubType === 'Poker' || (catSubType === 'Table' && name.indexOf('Poker') > -1) ) {
        translatedCat = 'Poker Games';
      } 
    } else if (gamesCategory === "Blackjack") {
      if (catSubType === 'Blackjack') {
        translatedCat = 'Blackjack Games';
      }   
    } else if (gamesCategory === "Roulette") {
      if (catSubType === 'Roulette') {
        translatedCat = 'Roulette Games';
      }
    } else if (name.indexOf('Keno') > -1) {
        translatedCat = 'Keno Games';
    } else {
      if (catSubType === 'Blackjack' || catSubType === 'Table' || catSubType === 'Baccarat' || catSubType === 'Roulette' || catSubType === 'Poker') {
        translatedCat = 'Casino Games';
      }
    }
    

    const gameEntry = {
      GameProvider: 'evoplay',
      TechnicalName: gameInfo.name,
      TechnicalCategory: gameInfo.name,
      GameCategory: translatedCat || catSubType,
      absolute_name: gameInfo.absolute_name,
      gameKey: key,
      _cfg: gameInfo
    }

    output.push(gameEntry);
  }

  return output;
}
