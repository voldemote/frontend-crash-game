import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { formatToFixed } from 'helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import { PieChart } from 'react-minimal-pie-chart';
import { GeneralActions } from 'store/actions/general';
import _ from 'lodash';
import IconType from 'components/Icon/IconType';
import Icon from '../Icon';

const WalletBalance = ({
  balance,
  liquidFundsPercentage,
  investedFundsPercentage,
  overallFundsTotal,
  openPositions,
  handleMyTradesVisible,
  setOpenDrawer,
}) => {
  const goToMyTrades = () => {
    setOpenDrawer('profile');
    handleMyTradesVisible(true);
  };

  return (
    <div className={styles.walletBalance}>
      <div className={styles.walletBalanceHeading}>
        <p className={styles.walletBalanceTitle}>total balance</p>
        <div className={styles.goToMyTrades} onClick={goToMyTrades}>
          <p className={styles.goToMyTradesText}>Go to my Trades</p>
          <Icon
            className={styles.goToMyTradesIcon}
            iconType={IconType.arrowTopRight}
          />
        </div>
      </div>
      <div className={styles.walletBalanceContent}>
        <div className={styles.walletBalanceItem}>
          <div className={styles.overallFunds}>
            <div className={styles.overallFundsAmount}>
              <PieChart
                data={[
                  {
                    title: 'InvestedFunds',
                    value: investedFundsPercentage,
                    color: '#69ffa5',
                  },
                  {
                    title: 'LiquidFunds',
                    value: liquidFundsPercentage,
                    color: '#3570ff',
                  },
                ]}
                lineWidth={14}
                startAngle={270}
              />
              <p className={styles.overallFundsTotal}>
                {formatToFixed(overallFundsTotal)}
              </p>
              <p className={styles.overallFundsTitle}>{TOKEN_NAME}</p>
            </div>
          </div>
        </div>
        <div className={styles.walletBalanceSum}>
          <div className={styles.walletBalanceItem}>
            <div className={styles.availableWfairs}>
              <div className={styles.availableWfairsHeadline}>
                <div className={styles.availableWfairsDot} />
                Available wfairs
              </div>
              <div className={styles.availableWfairsAmount}>
                <p className={styles.availableWfairsTotal}>
                  {formatToFixed(balance)}
                </p>
                <p className={styles.availableWfairsTitle}>{TOKEN_NAME}</p>
              </div>
            </div>
          </div>
          <div className={styles.walletBalanceItem}>
            <div className={styles.liquidFunds}>
              <div className={styles.liquidFundsHeadline}>
                <div className={styles.liquidFundsDot} />
                Open positions
              </div>
              <div className={styles.liquidFundsAmount}>
                <p className={styles.liquidFundsTotal}>
                  {formatToFixed(openPositions)}
                </p>
                <p className={styles.liquidFundsTitle}>{TOKEN_NAME}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const authentication = state.authentication;
  const balance = +authentication.balance;
  const investmentAmount = authentication.totalInvestmentAmount;
  const openPositions = authentication.totalOpenTradesAmount;
  const overallFundsTotal = balance + investmentAmount;
  const liquidFundsPercentage = (100 * balance) / overallFundsTotal;
  const investedFundsPercentage = (100 * investmentAmount) / overallFundsTotal;

  return {
    balance,
    liquidFundsPercentage,
    investedFundsPercentage,
    overallFundsTotal,
    openPositions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMyTradesVisible: bool => {
      dispatch(GeneralActions.setMyTradesVisible(bool));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletBalance);
