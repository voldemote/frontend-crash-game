import * as ApiUrls from '../constants/Api';
import axios from 'axios';
import ContentTypes from '../constants/ContentTypes';
import {
  API_CURRENT_BY_GAME_TYPE_SIMPLE_GAMES,
  API_MINES_BET,
  API_MINES_CASHOUT,
  API_MINES_CHECK,
  API_MINES_CURRENT, API_MINES_LAST_CASHOUTS,
  API_MINES_START,
  CRASH_GAME_GET_VOLUME_BETS
} from '../constants/Api';
import {promises} from "stream";

const createInstance = (host, apiPath) => {
  return axios.create({
    baseURL: `${host}${apiPath}`,
    timeout: 30000,
    headers: {
      'content-type': ContentTypes.applicationJSON,
      accept: ContentTypes.applicationJSON,
    },
  });
};

class GameApi {
  constructor(host, token) {
    this.host = host;
    this.api = createInstance(host, '/');
    this.setToken(token);
  }

  setToken = token => {
    if (!token) return;
    const authentication = 'Bearer ' + token;

    this.api.defaults.headers.common['Authorization'] = authentication;
  };

  createTrade = payload => {
    return this.api.post(ApiUrls.API_WHEEL_BET, payload).catch(error => {
      console.log('[API Error] called: createTrade', error);
      throw error;
    });
  }

  createTradePlinko = payload => {
    return this.api.post(ApiUrls.API_PLINKO_BET, payload).catch(error => {
      console.log('[API Error] called: createTrade', error);
      throw error;
    });
  }

}

const Api = createInstance(ApiUrls.CRASH_GAMES_BACKEND_URL, '/');

const getSpinsAlpacaWheel = (gameTypeId) => {
  const callThis = ApiUrls.API_CURRENT_BY_GAME_TYPE_SIMPLE_GAMES.replace(':gameTypeId', gameTypeId);

  return Api.get(callThis).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const setToken = token => {
  const authentication = 'Bearer ' + token;
  Api.defaults.headers.common['Authorization'] = authentication;
};

const createTrade = payload => {
  return Api.post(ApiUrls.API_WHEEL_BET, payload).catch(error => {
    console.log('[API Error] called: createTrade', error);
    throw error;
  });
};

const getGameDetailById = (gameId, type) => {
  const gameUrl = ApiUrls.CRASH_GAME_API_GET_GAME_DETAILS.replace(
    ':gameId',
    gameId
  );

  return Api.get(gameUrl + (type ? `/${type}` : '')).catch(error => {
    console.log('[API Error] called: getGameDetailById', error);
  });
};

const transformUser = user => ({
  crashFactor: user.crashfactor,
  createdAt: user.created_at,
  gameMatch: user.game_match,
  gameHash: user.gamehash,
  stakedAmount: user.stakedamount,
  state: 2,
  userId: user.userid,
  username: user.username,
  rewardAmount: user.crashfactor * user.stakedamount,
});

const getLuckyUsers = () => {
  return Api.get(ApiUrls.API_TRADES_LUCKY).then(response => ({
    data: response.data.map(transformUser),
  }));
};

const getHighUsers = () => {
  return Api.get(ApiUrls.API_TRADES_HIGH).then(response => ({
    data: response.data.map(transformUser),
  }));
};

const getTotalBetsVolumeByRange = (range = '24h') => {
  const url = ApiUrls.CRASH_GAME_GET_VOLUME_BETS.replace(':range', range);
  return Api.get(url);
};

const createTradeMines = payload => {
  // console.log('PAYLOAD', payload);
  // console.log('URL', ApiUrls.API_MINES_BET);

  return new Promise((resolve, reject) => {
    const dummyData = {
      data: {
        gameTypeId: 'String',
        gameName: 'String',
        stakedAmount: 50,
        userId: 'String',
        minesCount: 20,
        gameHash: 'String',
        gameState: 0, //0 - started, 1 - ended
        matchId: 'String',
        tradeId: 'String',
        outcomes: 10 // length = minesCount
      }
    }
    resolve(dummyData)
  })

  // return this.api.post(ApiUrls.API_MINES_BET, payload).catch(error => {
  //   console.log('[API Error] called: createMinesTrade', error);
  //   throw error;
  // });
}

const checkCellMines = payload => {
  console.log('URL', ApiUrls.API_MINES_CHECK);
  console.log('payload', payload);

  return new Promise((resolve, reject) => {
    const dummyData = {
      data: {
        result: 0, // 0 - no mine, 1 - mine
        clientBoard: []// length = 25 0 - no mine, 1 - mine, 2 -
      }
    }
    resolve(dummyData)
  })
  //
  // return this.api.post(ApiUrls.API_MINES_CHECK, payload).catch(error => {
  //   console.log('[API Error] called: createMinesTrade', error);
  //   throw error;
  // });
}

const cashoutMines = payload => {
  console.log('URL', ApiUrls.API_MINES_CASHOUT);

  return new Promise((resolve, reject) => {
    const dummyData = {
      data: {
        test: 'test'
      }
    }
    resolve(dummyData)
  })

  // return this.api.post(ApiUrls.API_MINES_CASHOUT).catch(error => {
  //   console.log('[API Error] called: cashoutMines', error);
  //   throw error;
  // });
}

const getCurrentMines = () => {
  return new Promise((resolve, reject) => {
    const dummyData = {
      data: {
        gameTypeId: 'STRING',
        gameName: 'STRING',
        stakedAmount: 100,
        userId: 'STRING',
        minesCount: 10,
        gameHash: 'STRING',
        gameState: 0,
        matchId: 11,
        tradeId: 22,
        outcomes: [], // length = minesCount
        clientBoard: [], // length = 25 0 - no mine, 1 - mine,2 -hidden
        turn: 1
      }
    }
    resolve(dummyData)
  })

  // return this.api.get(ApiUrls.API_MINES_CURRENT).catch(error => {
  //   console.log('[API Error] called: getCurrentMines', error);
  //   throw error;
  // });
}

const getLastCashoutsMines = (gameTypeId) => {

  return new Promise((resolve, reject) => {
    const dummyData = {
      data: {
        lastCashouts: [
          {
            gameHash: 'HASH',
            cashout: -20
          },
          {
            gameHash: 'HASH',
            cashout: 35
          },
          {
            gameHash: 'HASH',
            cashout: 35
          },
          {
            gameHash: 'HASH',
            cashout: -50
          },
          {
            gameHash: 'HASH',
            cashout: 100
          },
        ]
      }
    }
    resolve(dummyData)
  })
  //
  // const callThis = ApiUrls.API_MINES_LAST_CASHOUTS.replace(':gameTypeId', gameTypeId);
  //
  // return Api.get(callThis).catch(error => {
  //   console.log('[API Error] called: getCurrentGameInfo', error);
  // });
};

export {
  GameApi,
  Api,
  setToken,
  createTrade,
  getSpinsAlpacaWheel,
  getGameDetailById,
  getLuckyUsers,
  getHighUsers,
  getTotalBetsVolumeByRange,
  createTradeMines,
  getLastCashoutsMines,
  getCurrentMines,
  cashoutMines,
  checkCellMines
};
