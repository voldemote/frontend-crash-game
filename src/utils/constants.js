import { ethers } from 'ethers';

const environment = process.env.REACT_APP_ENVIRONMENT || 'staging';
const netWorkTypes = { ETH: 'Ethereum', POLY: 'Polygon' };
const networkIds = {
  mainPolygon: '0x89',
  mainEthereum: '0x1',
  mumbia: '0x13881',
  kovan: '0x2a',
  rinkeby: '0x4',
};


const getNetworkOnEnviroment = () => {
  switch (environment) {
    case 'production':
      return {
        [networkIds.mainPolygon]: 'Polygon',
        [networkIds.mainEthereum]: 'Ethereum',
      };
    case 'staging':
      return {
        [networkIds.mumbia]: 'Polygon',
        [networkIds.kovan]: 'Ethereum',
      };
    case 'development':
      return {
        [networkIds.mumbia]: 'Polygon',
        [networkIds.kovan]: 'Ethereum',
      };
    default:
      return {
        [networkIds.mumbia]: 'Polygon',
        [networkIds.kovan]: 'Ethereum',
      };
  }
};

export const toBN = ethers.BigNumber.from;
export const ZERO = toBN('0');
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const IS_IN_IFRAME = window.parent !== window;
export const SWITCH_NETWORKS = getNetworkOnEnviroment();
export const NETWORK_TYPES = netWorkTypes;

// export const SWITCH_NETWORKS =
//   environment !== 'staging'
//     ? {
//         '0x89': 'Polygon',
//         '0x1': 'Ethereum',
//       }
//     : {
//         '0x13881': 'Polygon', //Mumbai
//         '0x2a': 'Ethereum', //Kovan
//       };
