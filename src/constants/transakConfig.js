
const transakConfig = {
  apiKey: process.env.REACT_APP_TRANSAK_API_KEY || '82fbd931-e077-46d2-87aa-272b72d4962c', // Your API Key
  environment: process.env.REACT_APP_TRANSAK_ENVIROMENT || 'STAGING', // STAGING/PRODUCTION
  defaultCryptoCurrency: process.env.REACT_APP_TRANSAK_DEFAULT_CRYPTO_CURRENCY ||'MATIC',
  cryptoCurrencyCode: process.env.REACT_APP_TRANSAK_CRYPTO_CURRENCY_CODE || 'MATIC',
  walletAddress: process.env.REACT_APP_TRANSAK_WALLET_ADDRESS || '0x71a62c90E152557B68a8C8C6c5a8560117eBf288', // Our backend wallet (should not be changeable)
  networks: process.env.REACT_APP_TRANSAK_NETWORK ||'ethereum,mainnet,polygon,kovan',
  themeColor: '7879f1', // App theme color
  // hideMenu: true,
  // redirectURL: window.location.origin,
  // hostURL: window.location.origin,
  redirectURL: '',
  hostURL: window.location.origin,
//   partnerCustomerId: '615bf607f04fbb15aa5dd367', // Internal user id (mongo db)
  widgetHeight: '750px',
  widgetWidth: '500px',
};

export default transakConfig ;