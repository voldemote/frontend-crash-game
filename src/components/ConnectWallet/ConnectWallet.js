import React ,{ useState} from 'react';
import { connect } from 'react-redux';
import Option from './Option';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import Loader from '../Loader/Loader';
import { SUPPORTED_WALLETS } from '../../config/wallets';
import { isMobile } from 'react-device-detect';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { injected } from '../../config/connectors';
import { isMetamask } from '../../utils/detection';




import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';


import styles from './styles.module.scss';

const WALLET_VIEWS = {
  OPTIONS: 'OPTIONS',
  ACCOUNT: 'ACCOUNT',
  PENDING: 'PENDING',
};

function isUserRejected (error) {
  return (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    (error.message && error.message === 'User denied account authorization')
  );
}

function getErrorMessage (error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (isUserRejected(error)) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return error.message || 'Unknown error';
  }
}



const ConnectWallet = (props) => {
  const [walletError, setWalletError] = useState('');
  const { active, account, connector, activate, error } = useWeb3React();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [pendingError, setPendingError] = useState(false);
  const [, setPendingWallet] = useState(undefined);



  const tryActivation = async connector => {
  setPendingWallet(connector);
  setWalletView(WALLET_VIEWS.PENDING);
  if (
    connector instanceof WalletConnectConnector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    connector.walletConnectProvider = undefined;
  }
  connector &&
    activate(connector, undefined, true).catch(error => {
      if (isUserRejected(error)) {
        setPendingError(true);
        setWalletError('');
      } else {
        const message = getErrorMessage(error);
        setPendingError(true);
        setWalletError(message);
      }
    });
};




  const getOptions = () => {
  return Object.keys(SUPPORTED_WALLETS).map(key => {
    const option = SUPPORTED_WALLETS[key];
    if (isMobile) {
      if (option.mobile) {
        return (
          <Option
            id={`connect-${key}`}
            header={option.name}
            key={key}
            link={option.href}
            active={option.connector === connector}
            icon={option.iconURL}
            onClick={() => {
              setPendingError(false);
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
          />
        );
      }
      return null;
    }

    // overwrite injected when needed
    if (option.connector === injected) {
      // don't show injected if there's no injected provider
      // @ts-ignore
      if (!(window.web3 || window.ethereum)) {
        return null;
      }
      // don't return metamask if injected provider isn't metamask
      else if (option.name === 'MetaMask' && !isMetamask) {
        return null;
      }
      // likewise for generic
      else if (option.name === 'Injected' && isMetamask) {
        return null;
      }
    }

    // return rest of options
    return (
      !isMobile &&
      !option.mobileOnly && (
        <Option
          id={`connect-${key}`}
          header={option.name}
          key={key}
          link={option.href}
          active={option.connector === connector}
          icon={option.iconURL}
          onClick={() => {
            setPendingError(false);
            option.connector === connector
              ? setWalletView(WALLET_VIEWS.ACCOUNT)
              : !option.href && tryActivation(option.connector);
          }}
        />
      )
    );
  });
};

const getContentWithOptions = () => {
  return <div className={styles.optionsWrap}>{getOptions()}</div>;
};

const getContentLoading = () => {
  if (walletError) {
    return (
      <div className={classNames(styles.optionsWrap, styles.optionsError)}>
        <strong>{`Something went wrong`}</strong>
        <span>
          {`Message: `}
          {walletError}
        </span>
      </div>
    );
  }

  if (pendingError) {
    return getContentWithOptions();
  }

  return (
    <div className={styles.optionsWrap}>
      <Loader />
    </div>
  );
};




  const getModalHeader = () => {
  if (walletError) return null;
  return (
    <>
      <div
        className={styles.modalHeaderDesc}
      >{`Please select a wallet to connect to this app`}</div>
    </>
  );
};

const getModalContent = () => {
  if (error) {
    return (
      <span>
        {error instanceof UnsupportedChainIdError
          ? 'WRONG NETWORK'
          : 'ERROR IN MODAL'}
      </span>
    );
  }

  if (account && walletView === WALLET_VIEWS.ACCOUNT) {
    return <span>account details</span>;
  }

  return (
    <>
      {walletView === WALLET_VIEWS.PENDING
        ? getContentLoading()
        : getContentWithOptions()}
    </>
  );
};




  return (
    <div className={styles.walletsContainer}>
      {getModalHeader()}
      {getModalContent()}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

const mapStateToProps = state => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
