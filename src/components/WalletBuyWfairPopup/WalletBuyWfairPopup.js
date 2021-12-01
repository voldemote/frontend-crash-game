import React, { useState } from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect, useSelector, useDispatch } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { UserActions } from '../../store/actions/user';
import TabOptions from 'components/TabOptions';
import Grid from '@material-ui/core/Grid';
import DepositTab from './Tabs/DepositTab';

const BuyWithFiatTab = () => {
  const { email } = useSelector(state => state.authentication);
  let transak = {
    apiKey: '82fbd931-e077-46d2-87aa-272b72d4962c', // Your API Key
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'MATIC',
    cryptoCurrencyCode: 'MATIC',
    walletAddress: '0x71a62c90E152557B68a8C8C6c5a8560117eBf288', // Our backend wallet (should not be changeable)
    disableWalletAddressForm: true,
    networks: 'ethereum,mainnet,polygon,kovan',
    themeColor: '7879f1', // App theme color
    countryCode: 'DE', // INR/GBP
    email, // Your customer's email address
    hideMenu: true,
    // redirectURL: window.location.origin,
    // hostURL: window.location.origin,
    partnerCustomerId: '615bf607f04fbb15aa5dd367', // Internal user id (mongo db)
  };

  const transakQueryParams = Object.keys(transak)
    .map(key => transak[key] && `${key}=${transak[key]}`)
    .join('&');

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

const RenderTabs = ({ type = 'BUYWITHFIAT' }) => {
  const selectTabsComponent = type => {
    switch (type) {
      case 0:
        return <BuyWithFiatTab />;
      case 1:
        return <DepositTab />;
      default:
        return <BuyWithFiatTab />;
    }
  };

  return selectTabsComponent(type);
};

const RequestTokensPopup = ({ hidePopup, requestTokens }) => {
  const [activeTab, setActiveTab] = useState({
    name: 'BUY WITH FIAT',
    index: 0,
  });
  const tabOptions = [
    { name: 'BUY WITH FIAT', index: 0 },
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
        <RenderTabs type={activeTab.index} />
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
