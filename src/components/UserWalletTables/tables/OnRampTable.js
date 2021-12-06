import React, {useEffect,useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectHistory, selectStakes } from 'store/selectors/wallfair';
import { numberWithCommas, shortenAddress } from 'utils/common';
import Text from 'helper/Text';

const OnRampRow = ({ data, hideSecondaryColumns = false }) => {
  const { amount, network_code, fiat_amount, fiat_currency, created_at } = data;
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
            <p>{fiat_amount || 'No data'}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{fiat_currency || 'No data'}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{network_code}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p className={styles.rewardMulti}>
              {new Date(created_at).toLocaleDateString('en-US')}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const OnRampTable = ({
  className,
  hideSecondaryColumns = false,
  renderRow = [],
}) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>WFAIR</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>FIAT AMOUNT</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>FIAT CURRENCY</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>NETWORK</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>DATE</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {renderRow?.map((row) => (
          <OnRampRow data={row} key={row.id} />
        ))}
        {renderRow.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(OnRampTable);
