import { ReactComponent as UserAvatarIcon } from './user-icon.svg';
import { inGameBets } from './fakeData';
import { TOKEN_NAME } from '../../constants/Token';
import styles from './styles.module.scss';

const InGameBets = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>In Game Bets</div>
      <div className={styles.total}>
        <div className={styles.label}>Total</div>
        <div className={styles.value}>2.700,50 {TOKEN_NAME}</div>
      </div>
      <div className={styles.bets}>
        {inGameBets.map(bet => (
          <div key={bet.username} className={styles.bet}>
            <div className={styles.user}>
              <UserAvatarIcon />
              {bet.username}
            </div>
            <span>
              {bet.tokens} {TOKEN_NAME}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InGameBets;
