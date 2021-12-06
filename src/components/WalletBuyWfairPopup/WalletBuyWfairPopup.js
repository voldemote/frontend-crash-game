import React, { useState } from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect, useSelector, useDispatch } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { UserActions } from '../../store/actions/user';
import TabOptions from 'components/TabOptions';
import Grid from '@material-ui/core/Grid';
import DepositTab from './Tabs/DepositTab';
import BuyWithFiatTab from './Tabs/BuyWithFiatTab';
import BuyWithCrypto from './Tabs/BuyWithCrypto';

const RenderTabs = ({ type = 0 , hidePopup}) => {
  const selectTabsComponent = type => {
    switch (type) {
      case 0:
        return <BuyWithFiatTab hidePopup={hidePopup}/>;
      case 1:
        return <BuyWithCrypto />;
      case 2:
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
    { name: 'BUY WITH CRYPTO', index: 1 },
    { name: 'DEPOSIT', index: 2 },
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestTokensPopup);
