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
  lockAddresses,
  currentChainId,
  currentNetwork,
} from '../../../config/config';
import WFairABI from '../../../config/abi/WFAIRToken.json';
import { resetState } from '../../../state/wallfair/slice';
import { switchMetaMaskNetwork } from '../../../utils/helpers/ethereum';
import { SWITCH_NETWORKS } from '../../../utils/constants';

const initialWalletType = "Ethereum";

const checkWalletType = () => {
  const networkId = Object.keys(SWITCH_NETWORKS).find(sn => sn === window.ethereum.chainId);
  console.log('------->SWITCH_NETWORKS[networkId]', SWITCH_NETWORKS[networkId])
    return SWITCH_NETWORKS[networkId];
}


const DepositTab = props => {
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState(
    '0x1154362C86e4352d018aDD5dF3E0E82E8e5e0ee6'
  );
  const [hasCopiedSuccessfully, setHasCopiedSuccessfully] = useState(false);
  const [walletType, setWalletType] = useState(checkWalletType());
  const { active, library, account, chainId } = useWeb3React();
  const [visibleWalletForm, setVisibleWalletForm] = useState(false);
  const [tokenAreaOpen, setTokenAreaOpen] = useState(false);
  const [hash, setHash] = useState('');
  const [balance, setBalance] = useState(0);
  const signer = library?.getSigner();

  const copy = useCallback(() => {
    TextUtil.toClipboard(walletAddress).then(() => {
      setHasCopiedSuccessfully(true);
      setTimeout(setHasCopiedSuccessfully, 2000, false);
    });
  }, [walletAddress]);

  useEffect(() => {
    dispatch(resetState());
    if (active) {
      setTokenAreaOpen(true);
    }
  }, [account, active, dispatch]);

  useEffect(async () => {
     const networkId = Object.keys(SWITCH_NETWORKS).find(sn => sn !== window.ethereum.chainId);
      await switchMetaMaskNetwork(networkId);

  }, [walletType]);

  useEffect(() => {
    if (chainId !== currentChainId) return;

    signer?.getAddress().then(address => {
      getBalanceWFAIR({ address: address, provider: library }).then(result => {
        setBalance(result);
      });
    });
  }, [account, library, signer, hash, chainId, setBalance]);

  console.log('walletType =>', walletType);

  return (
    <>
      <div className={styles.depositTabContainer}>
        <div className={styles.depositHeader}>
          <div
            className={classNames(
              walletType === 'Polygon'
                ? styles.activeButton
                : styles.inactiveButton
            )}
            onClick={() => {
              setWalletType('Polygon');
            }}
          >
            <img className={styles.imageSizePolygon} src={walletType === 'Polygon' ? PolygonLogoActive: PolygonLogo} alt="Polygon-logo" />
          </div>
          <div
            className={classNames(
              walletType === 'Ethereum'
                ? styles.activeButton
                : styles.inactiveButton
            )}
            onClick={() => {
              setWalletType('Ethereum');
            }}
          >
            <img className={styles.imageSizeEther} src={walletType === 'Ethereum' ? EthereumLogoActive: EthereumLogo} alt="Ethereum-logo" />
          </div>
        </div>

        {!!account && (
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
        )}
        {!visibleWalletForm && !account && (
          <div className={styles.connectWalletContainer}>
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
        {/* <div className={styles.qrCodeImg}>
          <img src={QrcodeImage} alt="QrCode" />
        </div> */}
        {visibleWalletForm && !active && <ConnectWallet />}
        {tokenAreaOpen && account && (
          <TokenTransfer
            provider={library}
            hash={hash}
            setter={setHash}
            showCancel={false}
            balance={balance}
            tranferAddress={walletAddress}
          />
        )}
        <p className={styles.firstDiscription}>
          Only send MATIC to this address, 1 confirmation(s) required. We do not
          accept BEP20 from Binance.
        </p>
      </div>
    </>
  );
};

const getBalanceWFAIR = async ({ address, provider }) => {
  const contract = new Contract(WFAIRAddress, WFairABI.abi, provider);
  const balance = await contract.balanceOf(address);

  return ethers.utils.formatEther(balance);
};

export default DepositTab;
