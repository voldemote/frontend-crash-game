import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import { connect, useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../../components//Popup/PopupTheme';
import { RosiGameActions } from 'store/actions/rosi-game';
import TabOptions from 'components/TabOptions';
import useRosiData from 'hooks/useRosiData';
import UserWalletTables from 'components/UserWalletTables';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { Contract, ethers } from 'ethers';

// import {
//   resetState,
//   setStakes,
//   setHistory,
// } from '../../state/wallfair/slice';
import {
  WFAIRAddress,
  lockAddresses,
  currentChainId,
  currentNetwork,
} from '../../config/config';
import WFairTokenLockABI from '../../config/abi/TokenLock.json';
import { ZERO } from '../../utils/constants';
import Loader from 'components/Loader/Loader';
import {WallfairActions} from 'store/actions/wallfair';
import { TransactionActions } from 'store/actions/transaction';

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
  showRequestTokenPopup,
  resetState,
  setStakes,
  setHistory,
  fetchWalletTransactions,
  isTransactionsFetchLoading,
  isTransactionsFetchError,
  transactions,
}) => {
  const { active, library, account, chainId } = useWeb3React();

  const { balance, currency } = useSelector(selectUser);
  const signer = library?.getSigner();
  const [stakesLoading, setStakesLoading] = useState(true);

  const { myBetsData } = useRosiData();

  const activityData = {
    DEPOSITS: transactions.deposit || [],
    WITHDRAWALS: transactions.withdrawal || [],
    ONRAMP: [...(transactions.transak || []), ...(transactions.onramp || [])] || [],
    BETS: myBetsData ? myBetsData : [],
  };

  const [activityTab, setActivityTab] = useState({
    name: 'DEPOSITS',
    index: 0,
  });
  const [activityTabOptions, setActivityTabOptions] = useState([
    { name: 'DEPOSITS', index: 0 },
    { name: 'WITHDRAWALS', index: 1 },
    { name: 'ONRAMP', index: 2 },
  ]);

  const handleActivitySwitchTab = ({ index }) => {
    setActivityTab(activityTabOptions[index]);
  };

  useEffect(() => {
    resetState();
  }, [account, active, resetState]);

  useEffect(() => {
    refreshMyBetsData({ userId: userId });
    if (userId) {
      setActivityTabOptions([
        { name: 'DEPOSITS', index: 0 },
        { name: 'WITHDRAWALS', index: 1 },
        { name: 'ONRAMP', index: 2 },
        { name: 'BETS', index: 3 },
      ]);
    }
  }, [connected, refreshMyBetsData, userId]);

  useEffect(() => {
    if (chainId !== currentChainId) {
      setStakesLoading(false);
      return;
    }
    signer?.getAddress().then((address) => {
      getStakeValues({
        address: address,
        provider: library,
        setStakes,
        setStakesLoading: setStakesLoading,
      });
      getHistory({
        address,
        chainId,
        setHistory,
        provider: library,
      });
    });
  }, [account, library, signer, chainId, setHistory, setStakes]);

  useEffect(() => {
    fetchWalletTransactions();
  }, [fetchWalletTransactions]);

  const renderCategoriesAndLeaderboard = () => {
    return (
      <div className={styles.activities}>
        <Grid item xs={12}>
          <div className={styles.activityWrapper}>
            <TabOptions
              options={activityTabOptions ? activityTabOptions : []}
              className={styles.tabLayout}
            >
              {(option) => (
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
              {stakesLoading || isTransactionsFetchLoading ? (
                <Loader />
              ) : (
                <UserWalletTables
                  type={activityTab.name}
                  rowData={activityData}
                  isError={isTransactionsFetchError}
                />
              )}
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
              <p className={styles.noWFairNoProblem}>No PFAIR? No problem!</p>
              <button
                className={styles.buyWFairButton}
                onClick={showWalletBuyWfairPopup}
              >
                Buy WFAIR!
              </button>
              <button
                className={styles.buyWFairButton}
                onClick={showRequestTokenPopup}
              >
                <span>Request test tokens</span>
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

const getHistory = async ({ address, setHistory, provider }) => {
  for (const lockAddress of lockAddresses) {
    const tokenLock = new Contract(
      lockAddress,
      WFairTokenLockABI.abi,
      provider
    );
    const filter = tokenLock.filters.LogRelease(address);
    const logs = await tokenLock.queryFilter(filter);
    if (logs.length > 0) {
      let dataArray = [];
      for (const entry of logs) {
        const block = await entry.getBlock();
        dataArray.push([
          entry.transactionHash,
          ethers.utils.formatEther(entry.args.amount),
          block.timestamp,
        ]);
      }
      setHistory(lockAddress,dataArray)
      // dispatch(
      //   WallfairActions.setHistory({
      //     lock: lockAddress,
      //     data: dataArray,
      //   })
      // );

      
    }
  }
};

const getStakeValues = async ({
  address,
  provider,
  setStakes,
  setStakesLoading,
}) => {
  // loop over all lock addresses
  for (const lockAddress of lockAddresses) {
    const tokenLock = new Contract(
      lockAddress,
      WFairTokenLockABI.abi,
      provider
    );
    const totalTokensOf = await tokenLock.totalTokensOf(address);

    if (totalTokensOf.gt(ZERO)) {
      const unlockedTokensOf = await tokenLock.unlockedTokensOf(address);
      const currentTime = Math.ceil(Date.now() / 1000);
      const tokensVested = await tokenLock.tokensVested(address, currentTime);
      // start timestamp in seconds
      const startTimestamp = await tokenLock.startTime();
      const vestingPeriod = await tokenLock.vestingPeriod();
      // this is when vesting ends
      const endTimestamp = startTimestamp.add(vestingPeriod);
      const amounts = [totalTokensOf, unlockedTokensOf, tokensVested].map(
        ethers.utils.formatEther
      );
      const timestamps = [startTimestamp, endTimestamp, vestingPeriod].map(t =>
        t.toString()
      );
      setStakes(lockAddress,amounts,timestamps)
      // dispatch(
      //   WallfairActions.setStakes({
      //     lock: lockAddress,
      //     data: [...amounts, ...timestamps],
      //   })
      // );
    }
  }

  // change loading state
  setStakesLoading(false);
};

const mapStateToProps = state => {
  return {
    tags: state.event.tags,
    events: state.event.events,
    connected: state.websockets.connected,
    userId: state.authentication.userId,
    isTransactionsFetchLoading: state.transaction.walletTransactions.isLoading,
    isTransactionsFetchError: state.transaction.walletTransactions.isError,
    transactions: state.transaction.walletTransactions.transactions,
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
    refreshMyBetsData: (data) =>
      dispatch(RosiGameActions.fetchMyBetsData(data)),
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
    showRequestTokenPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.requestTokens }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserWallet));
