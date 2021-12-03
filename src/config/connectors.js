import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
// import { TrezorConnector } from '@web3-react/trezor-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { currentChainId, currentNetwork, networkInfo } from './config';

const urls = Object.values(networkInfo).reduce(
  (obj, n) => Object.assign(obj, { [n.chainId]: n.url }),
  {}
);
const chainIds = Object.values(networkInfo).map(i => i.chainId);

export const network = async () => {
  const currentId = await currentChainId();
  new NetworkConnector({
    urls,
    defaultChainId: currentId,
  });
};

export const gnosisSafe = new SafeAppConnector(chainIds);

export const injected = new InjectedConnector({
  supportedChainIds: chainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: urls,
  qrcode: true,
});

// export const walletlink = new WalletLinkConnector({
//   url: currentNetwork.url,
//   appName: 'Wallfair Contributor Dashboard',
//   appLogoUrl: `https://${window.location.host}/favicon.ico`,
//   supportedChainIds: chainIds,
// });

// export const trezor = new TrezorConnector({
//   chainId: currentChainId,
//   url: currentNetwork.url,
//   pollingInterval: POLLING_INTERVAL,
//   manifestEmail: 'info@wallfair.io',
//   manifestAppUrl: `https://${window.location.host}`,
// });
