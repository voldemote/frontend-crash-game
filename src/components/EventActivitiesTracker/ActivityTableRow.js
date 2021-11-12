import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';
import medalCoin from '../../data/icons/medal-coin.png';
import { toNumericString } from 'helper/FormatNumbers';
import classNames from 'classnames';
import { GAMES } from 'constants/Games';

const UserLink = props => {
  const { userId, username } = props;
  return (
    <a
      className={'global-link-style'}
      target={'_blank'}
      href={`${window.location.origin}/user/${userId}`}
      rel="noreferrer"
    >
      {username || 'User'}
    </a>
  );
};

const ActivityTableRow = ({ data, type, gameLabel, hideSecondaryColumns = false }) => {
  gameLabel = gameLabel ?? (Object.values(GAMES).find(g => g.id.indexOf(data.gameId) > -1))?.name ?? "Game";
  const {
    userId,
    username,
    stakedAmount: stakedAmountRaw,
    rewardAmount: rewardAmountRaw,
    crashFactor,
  } = data;
  const stakedAmount = Number.parseInt(stakedAmountRaw);
  const rewardAmount = Number.parseInt(rewardAmountRaw);
  return (
    <div className={styles.messageItem}>
      {type === 'lost' ? (
        <Grid container>
          <Grid item xs>
            <div className={classNames(styles.messageFirst, styles.messageLeft)}>
              <p>{gameLabel}</p>
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <div className={styles.messageCenter}>
              <p>{userId}</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classNames(styles.messageCenter)}>
              {toNumericString(stakedAmount)} {TOKEN_NAME}
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <div className={styles.messageCenter}>
              <p className={styles.rewardMulti}>{crashFactor}x</p>
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <div className={classNames(styles.messageLast, styles.messageRight)}>
              <p className={'global-cashout-loss'}>
                -{toNumericString(stakedAmount)} {TOKEN_NAME}
              </p>
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs>
            <div className={classNames(styles.messageFirst, styles.messageLeft)}>
              <p>{gameLabel}</p>
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <div className={styles.messageCenter}>
              <p>
                {username ? (
                  <UserLink userId={userId} username={username} />
                ) : (
                  userId
                )}
              </p>
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <div className={styles.messageCenter}>
              {toNumericString(stakedAmount)} {TOKEN_NAME}
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <div className={styles.messageCenter}>
              <p className={styles.rewardMulti}>{crashFactor}x</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classNames(styles.messageLast, styles.messageRight)}>
              <p className={styles.reward}>
                {toNumericString(rewardAmount)} {TOKEN_NAME}
              </p>
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ActivityTableRow;
