import React, {useEffect,useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectHistory, selectStakes } from 'store/selectors/wallfair';
import { numberWithCommas, shortenAddress } from 'utils/common';

const DepositRow = ({ data, hideSecondaryColumns = false }) => {
  const { wFair, network, address, date, txHash } = data;
  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <p>{wFair}</p>
          </div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            <p>{network}</p>
          </div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>{address}</div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            <p className={styles.rewardMulti}>{date}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
            <p className={styles.reward}>{txHash}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const formateRowList = (stakes) => {
return Object.keys(stakes && stakes)?.map(lockAddress => {
  return {
    wFair: numberWithCommas(Math.floor(stakes[lockAddress][1])),
    network: '',
    address: '',
    date: new Date(stakes[lockAddress][2] * 1000).toLocaleDateString('en-US'),
    txHash: shortenAddress(lockAddress),
  };
});

}

const DepositTable = ({
  className,
  hideSecondaryColumns = false,
}) => {
  const historyData = useSelector(selectHistory);
  const stakes = useSelector(selectStakes);
  const [depositRows, setDepositRows] = useState([]);


  useEffect(() => {
    setDepositRows(formateRowList(stakes));
  }, [stakes]);

  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>WFAIR</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>NETWORK</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>ADDRESS</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>DATE</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>TX HASH</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {depositRows?.map((row, index) => (
          <DepositRow data={row} key={index} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(DepositTable);
