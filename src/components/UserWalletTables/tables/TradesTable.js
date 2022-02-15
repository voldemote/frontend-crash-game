import React from "react";
import Grid from '@material-ui/core/Grid';
import classNames from "classnames";
import styles from '../styles.module.scss';
import { Link } from "react-router-dom";
import StateBadge from '../../StateBadge';
import moment from "moment";
import BetState from 'constants/BetState';
import { calculateGain } from '../../../helper/Calculation';
import { formatToFixed } from "helper/FormatNumbers";
import { connect } from "react-redux";
import { PopupActions } from '../../../store/actions/popup';
import PopupTheme from '../../Popup/PopupTheme';

const isFinalizedTrade = status =>
  [BetState.closed, BetState.canceled, BetState.resolved].includes(status);

const getGain = trade => {
  let gain = { value: '', negative: false };

  if (
    isFinalizedTrade(trade.bet.status) &&
    trade.bet.finalOutcome &&
    parseInt(trade.bet.finalOutcome) !== trade.outcomeIndex
  ) {
    gain = {
      value: '-100%',
      negative: true,
    };
  } else if (trade.bet.status === BetState.canceled) {
    gain = {
      value: 'Refund',
      negative: false,
    };
  } else {
    gain = calculateGain(
      trade.investmentAmount,
      trade.status === 'sold' ? trade.sellAmount : trade.outcomeTokens
    );
  }

  return gain;
};

const TradeRow = ({ data, allowCashout, showPulloutBetPopup }) => {
  const {
    bet,
    event,
    date,
    status,
    investmentAmount,
    outcomeTokens,
    sellAmount,
    outcomeIndex,
  } = data;
  const gain = getGain(data);

  return (
    <div className={styles.messageItem}>
      <Grid container alignItems="center">
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <Link to={`/trade/${event.slug}`} className={styles.titleLink}>
              <div className={styles.titleWithBadge}>
                {bet.question}
                {status === 'active' && (
                  <StateBadge
                    state={bet.status.toLowerCase()}
                    withoutBackground={true}
                    withoutText={true}
                    className={styles.status}
                  />
                )}
              </div>
            </Link>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{bet.outcome}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{formatToFixed(investmentAmount)}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>
              {formatToFixed(status === 'sold' ? sellAmount : outcomeTokens)}
            </p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <span
              className={classNames(
                styles.gain,
                gain.negative ? styles.negative : null
              )}
            >
              {gain.value}
            </span>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
            {moment(date).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        </Grid>
        {allowCashout && status === 'active' && !isFinalizedTrade(bet.status) && (
          <Grid item xs>
            <div
              className={classNames(styles.messageLast, styles.messageRight)}
            >
              <button
                className={styles.styledButton}
                onClick={() =>
                  showPulloutBetPopup(
                    bet.id,
                    outcomeIndex,
                    sellAmount,
                    bet.outcome
                  )
                }
                data-tracking-id="wallet-cashout"
              >
                Cashout
              </button>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const TradesTable = ({
  className,
  tradeRows = [],
  allowCashout,
  showPulloutBetPopup,
}) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>BET</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>YOUR PREDICTION</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>INVESTMENT AMOUNT</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>OUTCOME TOKENS</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>GAIN</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>DATE</p>
          </Grid>
          {allowCashout && (
            <Grid item xs>
              <p className={styles.titleLast}>CASHOUT</p>
            </Grid>
          )}
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {tradeRows?.map((row, index) => (
          <TradeRow
            data={row}
            allowCashout={allowCashout}
            showPulloutBetPopup={showPulloutBetPopup}
            key={index}
          />
        ))}
        {tradeRows.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPulloutBetPopup: (betId, outcome, amount, outcomeName) => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.pulloutApprove,
          options: {
            small: true,
            betData: {
              betId,
              outcome,
              amount,
              outcomeName,
            },
          },
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(TradesTable);
