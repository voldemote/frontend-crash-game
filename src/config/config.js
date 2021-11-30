import actions from './actions.json';

export const networkInfo = {
  mainnet: {
    chainId: 1,
    explorer: 'https://etherscan.io/',
    label: 'Mainnet',
    url: 'https://mainnet.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api.etherscan.io/api',
  },
  rinkeby: {
    chainId: 4,
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
    url: 'https://rinkeby.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api-rinkeby.etherscan.io/api',
  },
  localhost: {
    chainId: 1337,
    explorer: '',
    label: 'Local Network',
    url: 'http://localhost:8545',
    apiExplorer: 'https://api.etherscan.io/api',
  },
  goerli: {
    chainId: 5,
    explorer: 'https://goerli.etherscan.io/',
    label: 'Goerli',
    url: 'https://goerli.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api-goerli.etherscan.io/api',
  },
  polygon: {
    chainId: 137,
    explorer: 'https://polygonscan.com/',
    label: 'Polygon',
    url: 'https://polygon-rpc.com',
    apiExplorer: 'https://polygon-rpc.com',
  },
  mumbai: {
    chainId: 80001,
    explorer: 'https://rpc-mumbai.maticvigil.com/',
    label: 'Mumbai Testnet',
    url: 'https://polygonscan.com',
    apiExplorer: 'https://polygonscan.com',
  },
  kovan: {
    chainId: 42,
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
    url: 'https://kovan.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api-kovan.etherscan.io/api',
  }
};

// const currentChainSelected = window.ethereum.networkVersion
// const currentNetworkKey =
//   Object.keys(networkInfo).find(
//     value =>
//       parseInt(networkInfo[value].chainId) === parseInt(currentChainSelected)
//   ) || actions.network.name

export const currentChainId = actions.network.chainId;
export const currentNetwork = networkInfo[actions.network.name];

export const WFAIRAddress = actions.token.address;
export const lockAddresses = actions.locks.map(l => l.address);
export const lockInfo = Object.values(actions.locks).reduce(
  (obj, l) => Object.assign(obj, { [l.address]: { name: l.name } }),
  {}
);
