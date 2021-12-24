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
