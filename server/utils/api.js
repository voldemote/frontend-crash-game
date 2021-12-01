const axios = require('axios').default;

module.exports = {
  getCoinMarketAppConversion: async () => {
    const config = {
      headers: {
        'X-CMC_PRO_API_KEY': '738616cf-f902-4b79-8056-a556178ec202',
      },
    };
    const apiPath =
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=usd&symbol=WFAIR';
    await axios.get(apiPath, config).then(response => {
      const { WFAIR } = response.data.data;
      console.log('-------------->>>>>>>WFAIR', WFAIR);
      return response;
    });
  },
};
