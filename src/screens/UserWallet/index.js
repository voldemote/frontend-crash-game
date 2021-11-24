import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import { useLocation, useParams } from 'react-router-dom';
import { useIsMount } from 'components/hoc/useIsMount';
import { connect, useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../../components//Popup/PopupTheme';
import { RosiGameActions } from 'store/actions/rosi-game';

import State from '../../helper/State';
import { getTradeById } from '../../api';
import alpacaActivities from '../../data/images/alpaca-activities.svg';
import EventActivitiesTracker from '../../components/EventActivitiesTracker';
import TabOptions from 'components/TabOptions';
import ActivityTable from 'components/EventActivitiesTracker/ActivityTable';
import useRosiData from 'hooks/useRosiData';
import UserWalletTables from 'components/UserWalletTables';
import classNames from 'classnames';

const UserWallet = ({
  tags,
  setOpenDrawer,
  fetchTags,
  showPopup,
  events,
  refreshHighData,
  refreshLuckyData,
  connected,
  userId,
  refreshMyBetsData,
  showWalletBuyWfairPopup,
}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);

  const { balance, currency, toNextRank } = useSelector(selectUser);

  const dispatch = useDispatch();
  const { highData, luckyData, myBetsData } = useRosiData();

  const activityData = {
    DEPOSITS: [],
    WITHDRAWALS: [],
    BETS: myBetsData ? myBetsData : [],
  };

  const [activityTab, setActivityTab] = useState({
    name: 'DEPOSITS',
    index: 0,
  });
  const [activityTabOptions, setActivityTabOptions] = useState([
    { name: 'DEPOSITS', index: 0 },
    { name: 'WITHDRAWALS', index: 1 },
  ]);

  const handleActivitySwitchTab = ({ index }) => {
    setActivityTab(activityTabOptions[index]);
  };

  useEffect(() => {
    refreshMyBetsData({ userId: userId || '6152b82b2a1ac4fa41b4c663' });
    if (userId) {
      setActivityTabOptions([
        { name: 'DEPOSITS', index: 0 },
        { name: 'WITHDRAWALS', index: 1 },
        { name: 'BETS', index: 2 },
      ]);
    }
  }, [dispatch, connected, refreshMyBetsData, userId]);

  useEffect(() => {
    // if (isMount) {
    //   fetchTags();
    //   renderBetApprovePopup();
    //   handleRefPersistent();
    // }
  }, []);

  const renderCategoriesAndLeaderboard = () => {
    return (
      <div className={styles.activities}>
        <Grid item xs={12}>
          <div className={styles.activityWrapper}>
            <TabOptions
              options={activityTabOptions ? activityTabOptions : []}
              className={styles.tabLayout}
            >
              {option => (
                <div
                  className={
                    option.index === activityTab.index
                      ? styles.tabItemSelected
                      : styles.tabItem
                  }
                  onClick={() => handleActivitySwitchTab(option)}
                >
                  {option.name}
                </div>
              )}
            </TabOptions>
            <div className={styles.activityContainer}>
              <UserWalletTables
                type={activityTab.name}
                rowData={activityData}
              />
            </div>
          </div>
        </Grid>
      </div>
    );
  };

  const renderCurrentBalanceSection = () => {
    const balanceFixed = formatToFixed(balance, 0, true);
    let fontStyling = styles.font50;

    if (balanceFixed.length > 18) {
      fontStyling = styles.font20;
    } else if (balanceFixed.length > 13) {
      fontStyling = styles.font30;
    }
    return (
      <div className={styles.currentBalanceSection}>
        <Grid container alignContent="center">
          <Grid container justifyContent="flex-end" item lg={6} md={6} xs={12}>
            <div className={styles.currentBlanceCard}>
              <p className={styles.currentbalanceHeading}>Current balance</p>
              <p
                className={classNames(styles.currentbalanceWFair, fontStyling)}
              >
                {balanceFixed}
              </p>
              <p className={classNames(styles.currentbalanceWFair)}>
                {currency}
              </p>
            </div>
          </Grid>

          <Grid
            container
            justifyContent="flex-start"
            item
            lg={6}
            md={6}
            xs={12}
          >
            <div className={styles.currentBlanceDiscription}>
              <p className={styles.noWFairNoProblem}>No WFAIR? No problem!</p>
              <button
                className={styles.buyWFairButton}
                onClick={showWalletBuyWfairPopup}
              >
                Buy WFAIR!
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderStatusTableSection = () => {};

  return (
    <BaseContainerWithNavbar>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {renderCurrentBalanceSection()}
          {renderStatusTableSection()}
          {renderCategoriesAndLeaderboard()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.event.tags,
    events: state.event.events,
    connected: state.websockets.connected,
    userId: state.authentication.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshMyBetsData: data => dispatch(RosiGameActions.fetchMyBetsData(data)),
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserWallet);
