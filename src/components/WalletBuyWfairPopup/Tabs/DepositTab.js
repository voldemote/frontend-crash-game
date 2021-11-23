import React, { useCallback, useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { useWeb3React } from '@web3-react/core';
import { connect, useSelector, useDispatch } from 'react-redux';
import TextUtil from 'helper/Text';
import classNames from 'classnames';
import EthereumLogo from '../../../data/images/ethereum_logo.svg';
import PolygonLogo from '../../../data/images/polygon-logo.svg';
import QrcodeImage from '../../../data/images/qrcode-image.svg';
import CopyIcon from '../../../data/icons/copy-icon.svg';
import ConnectWallet from 'components/ConnectWallet/ConnectWallet';

const DepositTab = props => {
  const walletAddress = '0xAef38fBFBF932D1AeF3B808Bc8fBd8Cd8E1f8BC5';
  const [hasCopiedSuccessfully, setHasCopiedSuccessfully] = useState(false);
  const [walletType, setWalletType] = useState('polygon');
  const { active, library, account, chainId } = useWeb3React();
  const [visibleWalletForm, setVisibleWalletForm] = useState(false);
  const dispatch = useDispatch();

  const copy = useCallback(() => {
    TextUtil.toClipboard(walletAddress).then(() => {
      setHasCopiedSuccessfully(true);
      setTimeout(setHasCopiedSuccessfully, 2000, false);
    });
  }, [walletAddress]);

  useEffect(() => {
    // dispatch(resetState());
  }, [account, active, dispatch]);

  return (
    <>
      <div className={styles.depositTabContainer}>
        <div className={styles.depositHeader}>
          <div
            className={classNames(
              walletType === 'polygon'
                ? styles.activeButton
                : styles.inactiveButton
            )}
            onClick={() => {
              setWalletType('polygon');
            }}
          >
            <img src={PolygonLogo} alt="Polygon-logo" />
          </div>
          <div
            className={classNames(
              walletType === 'ether'
                ? styles.activeButton
                : styles.inactiveButton
            )}
            onClick={() => {
              setWalletType('ether');
            }}
          >
            <img src={EthereumLogo} alt="Ethereum-logo" />
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
        {!visibleWalletForm && (
          <div className={styles.connectWalletContainer}>
            <button
              type="button"
              className={styles.connectWalletButton}
              onClick={() => setVisibleWalletForm(true)}
            >
              Connect Wallet
            </button>
          </div>
        )}
        {!!visibleWalletForm && <ConnectWallet />}
        <p className={styles.firstDiscription}>
          Only send MATIC to this address, 1 confirmation(s) required. We do not
          accept BEP20 from Binance.
        </p>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(null, mapDispatchToProps)(DepositTab);
