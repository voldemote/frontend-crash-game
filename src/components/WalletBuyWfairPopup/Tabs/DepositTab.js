import React, { useCallback, useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { useWeb3React } from '@web3-react/core';
import { connect, useSelector, useDispatch } from 'react-redux';
import TextUtil from 'helper/Text';
import classNames from 'classnames';
import EthereumLogoActive from '../../../data/icons/ethereum-logo-icon-active.svg';
import EthereumLogo from '../../../data/icons/ethereum-logo-icon.svg';
import PolygonLogoActive from '../../../data/icons/polygon-logo-active.svg';
import PolygonLogo from '../../../data/icons/polygon-logo.svg';
import QrcodeImage from '../../../data/images/qrcode-image.svg';
import CopyIcon from '../../../data/icons/copy-icon.svg';
import ConnectWallet from 'components/ConnectWallet/ConnectWallet';
import TokenTransfer from 'components/TokenTransfer';
import { Contract, ethers } from 'ethers';
import {
  WFAIRAddress,
  currentChainId,
  currentNetwork,
} from '../../../config/config';
import WFairABI from '../../../config/abi/WFAIRToken.json';
import { switchMetaMaskNetwork } from '../../../utils/helpers/ethereum';
import { SWITCH_NETWORKS, NETWORK_TYPES } from '../../../utils/constants';
import QRCode from 'react-qr-code';
import { accountMapping } from 'api/third-party';
import { WallfairActions } from 'store/actions/wallfair';
import Loader from 'components/Loader/Loader';

const DepositTab = ({ user, resetState }) => {
  const [walletAddress, setWalletAddress] = useState(
    '0xB56AE8254dF096173A27700bf1F1EC2b659F3eC8'
  );
  const [hasCopiedSuccessfully, setHasCopiedSuccessfully] = useState(false);
  // const [walletType, setWalletType] = useState('');
  const { active, library, account, chainId } = useWeb3React();
  const [visibleWalletForm, setVisibleWalletForm] = useState(false);
  const [tokenAreaOpen, setTokenAreaOpen] = useState(false);
  const [hash, setHash] = useState('');
  const [balance, setBalance] = useState(0);
  const [isLoadingTransferToken, setIsLoadingTransferToken] = useState(true);
  const signer = library?.getSigner();

  const copy = useCallback(() => {
    TextUtil.toClipboard(walletAddress).then(() => {
      setHasCopiedSuccessfully(true);
      setTimeout(setHasCopiedSuccessfully, 2000, false);
    });
  }, [walletAddress]);

  const sendAccountMappingCall = useCallback(() => {
    if (account && visibleWalletForm) {
      const accountMappingBody = {
        userId: user.userId,
        account: account,
      };
      accountMapping(accountMappingBody, user.token);
    }
  }, [visibleWalletForm, account, user]);

  useEffect(() => {
    resetState();
    if (active) {
      setTokenAreaOpen(true);
      sendAccountMappingCall();
    }
  }, [account, active, resetState, sendAccountMappingCall]);

  useEffect(() => {
    const updateWallet = async () => {
      const currentId = await currentChainId();
      console.log(currentId);
      if (parseInt(chainId) !== parseInt(currentId)) {
        return;
      }

      signer?.getAddress().then(address => {
        getBalanceWFAIR({ address: address, provider: library }).then(
          result => {
            setBalance(result);
            setIsLoadingTransferToken(false);
          }
        );
      });
    };
    updateWallet().catch(console.error);
  }, [account, library, signer, hash, chainId, setBalance]);

  const notSelectedNetworkId = Object.keys(SWITCH_NETWORKS).find(
    sn => sn !== window.ethereum?.chainId
  );

  return (
    <>
      <div className={styles.depositTabContainer}>
        {!!account && (
          <>
            <p>Select your preferred network</p>
            <div className={styles.depositHeader}>
              <div
                className={classNames(
                  notSelectedNetworkId &&
                    NETWORK_TYPES.POLY === SWITCH_NETWORKS[notSelectedNetworkId]
                    ? styles.inactiveButton
                    : styles.activeButton
                )}
                onClick={async () => {
                  const networkId = notSelectedNetworkId;
                  if (NETWORK_TYPES.POLY === SWITCH_NETWORKS[networkId]) {
                    setIsLoadingTransferToken(true);
                    await switchMetaMaskNetwork(networkId);
                  }
                  
                }}
              >
                <img
                  className={styles.imageSizePolygon}
                  src={
                    notSelectedNetworkId &&
                    NETWORK_TYPES.POLY === SWITCH_NETWORKS[notSelectedNetworkId]
                      ? PolygonLogo
                      : PolygonLogoActive
                  }
                  alt="Polygon-logo"
                />
              </div>
              <div
                className={classNames(
                  notSelectedNetworkId &&
                    NETWORK_TYPES.ETH === SWITCH_NETWORKS[notSelectedNetworkId]
                    ? styles.inactiveButton
                    : styles.activeButton
                )}
                onClick={async () => {
                  const networkId = notSelectedNetworkId;

                  if (NETWORK_TYPES.ETH === SWITCH_NETWORKS[networkId]) {
                    setIsLoadingTransferToken(true);
                    await switchMetaMaskNetwork(networkId);
                  }
                }}
              >
                <img
                  className={styles.imageSizeEther}
                  src={
                    notSelectedNetworkId &&
                    NETWORK_TYPES.ETH === SWITCH_NETWORKS[notSelectedNetworkId]
                      ? EthereumLogo
                      : EthereumLogoActive
                  }
                  alt="Ethereum-logo"
                />
              </div>
            </div>
          </>
        )}

        {/* {!!account && (
          <div className={styles.copyhash}>
            <p className={styles.copyhashText}>{walletAddress}</p>
            <button
              type="button"
              onClick={copy}
              className={styles.copyButton}
              title="Copy address to clipboard"
            >
              <img src={CopyIcon} alt="Clipboard Icon" />
              {hasCopiedSuccessfully && (
                <span className={styles.confirmation}>
                  Copied to clipboard.
                </span>
              )}
            </button>
          </div>
        )} */}
        {/* {!!account && (
          <div className={styles.qrCodeImg}>
            <QRCode value={walletAddress} size={120} />
          </div>
        )} */}
        {!visibleWalletForm && !account && (
          <div className={styles.connectWalletContainer}>
            <p>Please connect to your wallet in order to deposit WFAIR</p>
            <button
              type="button"
              className={styles.connectWalletButton}
              onClick={() => {
                setVisibleWalletForm(true);
                setTokenAreaOpen(true);
              }}
            >
              Connect Wallet
            </button>
          </div>
        )}
        {visibleWalletForm && !active && (
          <ConnectWallet accountMapping={sendAccountMappingCall} />
        )}
        {isLoadingTransferToken? (
          tokenAreaOpen && account && <Loader />
        ) : (
           tokenAreaOpen && account && 
          <TokenTransfer
            provider={library}
            hash={hash}
            setter={setHash}
            showCancel={false}
            balance={balance}
            tranferAddress={walletAddress}
            account={account}
          />
        )}
        {/* {!!account && (<p className={styles.firstDiscription}>
          Only send MATIC to this address, 1 confirmation(s) required. We do not
          accept BEP20 from Binance.
        </p>)} */}
      </div>
    </>
  );
};

const getBalanceWFAIR = async ({ address, provider }) => {
  const contractAddress = await WFAIRAddress();
  console.log('contractAddress', contractAddress);
  const contract = new Contract(contractAddress, WFairABI.abi, provider);
  if (contract) {
    return await contract
      .balanceOf(address)
      .then(balance => {
        return ethers.utils.formatEther(balance);
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  }
  return 0;
};

const mapStateToProps = state => {
  const user = state.authentication;

  return {
    user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetState: () => dispatch(WallfairActions.resetState()),
    setHistory: (lockAddress, dataArray) =>
      dispatch(
        WallfairActions.setHistory({
          lock: lockAddress,
          data: dataArray,
        })
      ),
    setStakes: (lockAddress, amounts, timestamps) =>
      dispatch(
        WallfairActions.setStakes({
          lock: lockAddress,
          data: [...amounts, ...timestamps],
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositTab);
