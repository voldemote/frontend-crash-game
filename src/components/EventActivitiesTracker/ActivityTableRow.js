import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';
import medalCoin from '../../data/icons/medal-coin.png';

const ActivityTableRow = ({ data }) => {
  const { userId, stakedAmount, rewardAmount, crashFactor } = data;
  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={styles.messageLeft}>
            <p>{'Elon Game'}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{userId}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageRight}>
            {stakedAmount} {TOKEN_NAME}
            <img src={medalCoin} alt="medal" />
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p className={styles.rewardMulti}>{crashFactor}x</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageLast}>
            <p className={styles.reward}>
              {rewardAmount} {TOKEN_NAME}
            </p>
            <img src={medalCoin} alt="medal" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ActivityTableRow;
