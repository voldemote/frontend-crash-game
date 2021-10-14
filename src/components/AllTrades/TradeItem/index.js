import styles from '../../MyTradesList/styles.module.scss';
import { Link } from 'react-router-dom';
import StateBadge from '../../StateBadge';
import moment from 'moment';
import classNames from 'classnames';
import { calculateGain } from '../../../helper/Calculation';
import BetState from 'constants/BetState';

const isFinalizedTrade = status =>
  [BetState.closed, BetState.canceled, BetState.resolved].includes(status);

const getGain = item => {
  let gain = { value: '', negative: false };

  if (
    isFinalizedTrade(item.status) &&
    item.finalOutcome &&
    parseInt(item.finalOutcome) !== item.outcome
  ) {
    gain = {
      value: '-100%',
      negative: true,
    };
  } else if (item.status === BetState.canceled) {
    gain = {
      value: 'Refund',
      negative: false,
    };
  } else {
    gain = calculateGain(
      item.investmentAmount,
      item.tradeStatus === 'sold' ? item.soldAmount : item.outcomeAmount
    );
  }

  return gain;
};

const TradeItem = ({ trade }) => {
  const gain = getGain(trade);

  return (
    <div className={styles.betItem}>
      <img src={trade.imageUrl} className={styles.eventImg} alt="" />
      <div className={styles.betInfo}>
        <div className={styles.titleContainer}>
          <Link
            to={`/trade/${trade.eventSlug}/${trade.betSlug}`}
            className={styles.titleLink}
            onClick={() => {}}
          >
            <div className={styles.title}>
              {trade.marketQuestion}
              {/*{withStatus && (*/}
              {/*  <StateBadge*/}
              {/*    state={trade.status}*/}
              {/*    withoutBackground={true}*/}
              {/*    withoutText={true}*/}
              {/*    className={styles.status}*/}
              {/*  />*/}
              {/*)}*/}
            </div>
          </Link>
          <div className={styles.subtitle}>
            {moment(trade.date).format('DD.MM.YYYY')} | Your Prediction:{' '}
            {trade.outcomeValue}
          </div>
        </div>
        <div className={styles.numbersContainer}>
          <div className={styles.value}>
            <span
              className={classNames(
                styles.percentage,
                trade.status === BetState.canceled ? styles.zeroPadding : null,
                gain.negative ? styles.negative : null
              )}
            >
              {gain.value}
            </span>
            {trade.status !== BetState.canceled &&
              (trade.tradeStatus === 'sold'
                ? trade.soldAmount
                : trade.outcomeAmount)}
          </div>
          <div className={styles.small}>Invested: {trade.investmentAmount}</div>
          {/*{allowCashout &&*/}
          {/*trade.sellAmount &&*/}
          {/*!isFinalizedTrade(trade.status) && (*/}
          {/*  <>*/}
          {/*    <div className={styles.small}>*/}
          {/*      Sell amount: {trade.sellAmount}*/}
          {/*    </div>*/}
          {/*    <button*/}
          {/*      className={styles.betCashoutButton}*/}
          {/*      onClick={() =>*/}
          {/*        showPulloutBetPopup(*/}
          {/*          trade.betId,*/}
          {/*          trade.outcomes.find(*/}
          {/*            ({ name }) => name === trade.outcomeValue*/}
          {/*          ).index,*/}
          {/*          trade.sellAmount*/}
          {/*        )*/}
          {/*      }*/}
          {/*      data-tracking-id="wallet-cashout"*/}
          {/*    >*/}
          {/*      Cashout*/}
          {/*    </button>*/}
          {/*  </>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default TradeItem;
