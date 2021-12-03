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
import WFairABI from '../../../config/abi/WFAIRToken.json';
import { switchMetaMaskNetwork } from '../../../utils/helpers/ethereum';
import { SWITCH_NETWORKS } from '../../../utils/constants';
import QRCode from 'react-qr-code';
import { accountMapping } from 'api/third-party';
import { WallfairActions } from 'store/actions/wallfair';
import useWeb3Network from '../../../hooks/useWeb3Network';

const DepositTab = ({ user, resetState }) => {
  const [walletAddress, setWalletAddress] = useState(
    '0xB56AE8254dF096173A27700bf1F1EC2b659F3eC8'
  );
  const { active, library, account, chainId } = useWeb3React();
  const { currentNetwork, currentChainId } = useWeb3Network();
  const [visibleWalletForm, setVisibleWalletForm] = useState(false);
  const [tokenAreaOpen, setTokenAreaOpen] = useState(false);
  const [hash, setHash] = useState('');
  const [balance, setBalance] = useState(0);
  const signer = library?.getSigner();

  const sendAccountMappingCall = useCallback(() => {
    if(account && visibleWalletForm) {
      const accountMappingBody = {
        userId: user.userId,
        account: account,
      };
      accountMapping(accountMappingBody, user.token);
    }
  },[visibleWalletForm, account, user]);

  useEffect(() => {
    resetState()
    if (active) {
      setTokenAreaOpen(true);
      sendAccountMappingCall();
    }
  }, [account, active, resetState, sendAccountMappingCall]);

  useEffect(() => {
    if (currentNetwork && parseInt(chainId) === parseInt(currentChainId)) {
      signer?.getAddress().then(address => {
        getBalanceWFAIR({
          address,
          provider: library,
          contractAddress: currentNetwork.contractAddress,
        }).then(result => {
          setBalance(result);
        });
      });
    }
  }, [currentNetwork, library, signer, chainId, currentChainId])

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
                  'Polygon' === SWITCH_NETWORKS[notSelectedNetworkId]
                  ? styles.inactiveButton
                  : styles.activeButton
              )}
              onClick={async () => {
                const networkId = notSelectedNetworkId;
                if ('Polygon' === SWITCH_NETWORKS[networkId]) {
                  await switchMetaMaskNetwork(networkId);
                }
              }}
            >
              <img
                className={styles.imageSizePolygon}
                src={
                  notSelectedNetworkId &&
                  'Polygon' === SWITCH_NETWORKS[notSelectedNetworkId]
                    ? PolygonLogo
                    : PolygonLogoActive
                }
                alt="Polygon-logo"
              />
            </div>
            <div
              className={classNames(
                notSelectedNetworkId &&
                  'Ethereum' === SWITCH_NETWORKS[notSelectedNetworkId]
                  ? styles.inactiveButton
                  : styles.activeButton
              )}
              onClick={async () => {
                const networkId = notSelectedNetworkId;

                if ('Ethereum' === SWITCH_NETWORKS[networkId]) {
                  await switchMetaMaskNetwork(networkId);
                }
              }}
            >
              <img
                className={styles.imageSizeEther}
                src={
                  notSelectedNetworkId &&
                  'Ethereum' === SWITCH_NETWORKS[notSelectedNetworkId]
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
        {visibleWalletForm && !active && <ConnectWallet accountMapping={sendAccountMappingCall} />}
        {tokenAreaOpen && account && (
          <TokenTransfer
            provider={library}
            hash={hash}
            setter={setHash}
            showCancel={false}
            balance={balance}
            tranferAddress={walletAddress}
            contractAddress={currentNetwork?.contractAddress}
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

const getBalanceWFAIR = async ({ address, provider, contractAddress }) => {
  const contract = new Contract(contractAddress, WFairABI.abi, provider);
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
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
