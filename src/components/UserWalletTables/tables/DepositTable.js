import React, {useEffect,useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectHistory, selectStakes } from 'store/selectors/wallfair';
import { numberWithCommas, shortenAddress } from 'utils/common';
import Text from 'helper/Text';

const DepositRow = ({ data, hideSecondaryColumns = false }) => {
  const { amount, network_code, sender, created_at, transaction_hash } = data;
  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <p>{numberWithCommas(Text.formatByONEConstant(amount, 0))}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{network_code}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>{shortenAddress(sender)}</div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p className={styles.rewardMulti}>
              {new Date(created_at).toLocaleDateString('en-US')}
            </p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
            <p className={styles.reward}>{shortenAddress(transaction_hash)}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const DepositTable = ({
  className,
  hideSecondaryColumns = false,
  depositRows = [],
}) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>WFAIR</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>NETWORK</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>ADDRESS</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>DATE</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>TX HASH</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {depositRows?.map((row) => (
          <DepositRow data={row} key={row.id} />
        ))}
        {depositRows.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DepositTable);
