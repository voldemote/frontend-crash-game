import React, { useState } from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { UserActions } from '../../store/actions/user';
import TabOptions from 'components/TabOptions';
import Grid from '@material-ui/core/Grid';
import DepositTab from './Tabs/DepositTab';
import BuyWithFiatManualTab from './Tabs/BuyWithFiatManualTab';
import BuyWithCrypto from './Tabs/BuyWithCrypto';
import BuyWithCryptoManual from './Tabs/BuyWithCryptoManual';
import { trackWalletBuywfairTab, trackWalletbuywithcryptoTab, trackWalletDepositTab } from 'config/gtm';

const showNewFeatures = process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';

const RenderTabs = ({ type = 0 , hidePopup}) => {
  const selectTabsComponent = type => {
    switch (type) {
      case 1:
      default:
        trackWalletDepositTab();
        return <DepositTab />;
      case 2:
        trackWalletBuywfairTab();
        // return <BuyWithFiatWallfairWebsiteTab hidePopup={hidePopup} />;
        // return <BuyWithFiatTab hidePopup={hidePopup} />;
        return <BuyWithFiatManualTab hidePopup={hidePopup} />;
      case 3:
        trackWalletbuywithcryptoTab();
        return <BuyWithCryptoManual />;
      case 0:
        trackWalletbuywithcryptoTab();
        return <BuyWithCrypto />;
    }
  };

  return selectTabsComponent(type);
};


const WalletBuyWfairPopup = ({ hidePopup, requestTokens }) => {
  const [activeTab, setActiveTab] = useState({
    name: 'DEPOSIT',
    index: 0,
  });
  const tabOptions = [
    { name: 'BUY WITH CRYPTO', index: 0 }, //cryptopay
    { name: 'DEPOSIT WFAIR', index: 1 },
    { name: 'BUY WITH EUR / USD', index: 2 },
    // { name: 'DEPOSIT CRYPTO', index: 3 }, //manual crypto transfer
  ].filter(({ index }) => showNewFeatures || index !== 3);
  
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
        <RenderTabs type={activeTab.index} hidePopup={hidePopup} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletBuyWfairPopup);
