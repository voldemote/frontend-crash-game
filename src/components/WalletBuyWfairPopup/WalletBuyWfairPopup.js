import React, { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import ClickEvent from '../../helper/ClickEvent';
import { UserActions } from '../../store/actions/user';
import TabOptions from 'components/TabOptions';
import Grid from '@material-ui/core/Grid';
import QrcodeImage from '../../data/images/qrcode-image.svg';
import CopyIcon from '../../data/icons/copy-icon.svg';
import EthereumLogo from '../../data/images/ethereum_logo.svg';
import PolygonLogo from '../../data/images/polygon-logo.svg';
import TextUtil from 'helper/Text';

const BuyWithFiatTab = () => {
  const { email } = useSelector(state => state.authentication);
  let transak = {
    apiKey: '82fbd931-e077-46d2-87aa-272b72d4962c', // Your API Key
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'MATIC',
    cryptoCurrencyCode: 'MATIC',
    walletAddress: '0xB56AE8254dF096173A27700bf1F1EC2b659F3eC8', // Our backend wallet (should not be changeable)
    disableWalletAddressForm: true,
    networks: 'ethereum,mainnet,polygon',
    themeColor: '7879f1', // App theme color
    countryCode: 'DE', // INR/GBP
    email, // Your customer's email address
    hideMenu: true,
    // redirectURL: window.location.origin,
    // hostURL: window.location.origin,
    partnerCustomerId: '615bf607f04fbb15aa5dd367', // Internal user id (mongo db)
  };

  const transakQueryParams = Object.keys(transak).map(key => transak[key]&& `${key}=${transak[key]}`).join('&');

  return (
    <div className={styles.buyWithFiatTabContainer}>
      <iframe
        title="Transak On/Off Ramp Widget (Website)"
        src={`https://staging-global.transak.com?${transakQueryParams}`}
        frameBorder="no"
        allowtransparency="true"
        allowFullScreen=""
        className={styles.buyWithFiatTabIframe}
      ></iframe>
    </div>
  );
};
const DepositTab = () => {

  const walletAddress = '0xAef38fBFBF932D1AeF3B808Bc8fBd8Cd8E1f8BC5';
  const [hasCopiedSuccessfully, setHasCopiedSuccessfully] = useState(false);

  const copy = useCallback(() => {
    TextUtil.toClipboard(walletAddress).then(() => {
      setHasCopiedSuccessfully(true);
      setTimeout(setHasCopiedSuccessfully, 2000, false);
    });
  }, [walletAddress]);

  return (
    <div className={styles.depositTabContainer}>
      <div className={styles.depositHeader}>
        <img src={PolygonLogo} alt="Polygon-logo" />
        <img src={EthereumLogo} alt="Ethereum-logo" />
      </div>
      <div className={styles.copyhash}>
        <p className={styles.copyhashText}>{walletAddress}</p>
        <button type="button" onClick={copy} className={styles.copyButton} title="Copy address to clipboard">
          <img src={CopyIcon} alt="Clipboard Icon" />
          {hasCopiedSuccessfully && (
            <span className={styles.confirmation}>
              Copied to clipboard.
            </span>
          )}
        </button>
      </div>
      <div className={styles.qrCodeImg}>
        <img src={QrcodeImage} alt="QrCode" />
      </div>
      <p className={styles.firstDiscription}>Only send MATIC to this address, 1 confirmation(s) required. We do not accept BEP20 from Binance.</p>
  </div>
  );
};

const RenderTabs = ({ type = 'BUYWITHFIAT' }) => {
  const selectTabsComponent = type => {
    switch (type) {
      case 'BUYWITHFIAT':
        return <BuyWithFiatTab />;
      case 'DEPOSIT':
        return <DepositTab />;
      default:
        return <BuyWithFiatTab />;
    }
  };

  return selectTabsComponent(type);
};

const RequestTokensPopup = ({ hidePopup, requestTokens }) => {
  const [activeTab, setActiveTab] = useState({
    name: 'BUYWITHFIAT',
    index: 0,
  });
  const tabOptions = [
    { name: 'BUYWITHFIAT', index: 0 },
    { name: 'DEPOSIT', index: 1 },
  ];
  const handleSwitchTab = ({ index }) => {
    setActiveTab(tabOptions[index]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.activities}>
        <Grid item xs={12}>
          <div className={styles.activityWrapper}>
            <TabOptions options={tabOptions} className={styles.tabLayout}>
              {option => (
                <div
                  className={
                    option.index === activeTab.index
                      ? styles.tabItemSelected
                      : styles.tabItem
                  }
                  onClick={() => handleSwitchTab(option)}
                >
                  {option.name}
                </div>
              )}
            </TabOptions>
          </div>
        </Grid>
      </div>
    <div className={styles.activityContainer}>
        <RenderTabs type={activeTab.name} />
    </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    requestTokens: () => {
      dispatch(UserActions.requestTokens());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.walletBuyWfair &&
      state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestTokensPopup);
