import { nanoid } from 'nanoid';
import { ReactComponent as UserAvatarIcon } from './user-icon.svg';
import { TOKEN_NAME } from '../../constants/Token';
import styles from './styles.module.scss';

const calculateTotal = bets => {
  return bets.reduce((total, bet) => total + bet.amount, 0);
};

const GameBets = ({ label, bets }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{label}</div>
      <div className={styles.total}>
        <div className={styles.label}>Total</div>
        <div className={styles.value}>
          {calculateTotal(bets)} {TOKEN_NAME}
        </div>
      </div>
      <div className={styles.bets}>
        {bets.map(bet => (
          <div key={nanoid()} className={styles.bet}>
            <div className={styles.user}>
              <UserAvatarIcon />
              {bet.username}
            </div>
            <div>
              <span className={styles.crashFactor}>{bet.crashFactor}</span>
              <span className={styles.amount}>
                {bet.amount} {TOKEN_NAME}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBets;
