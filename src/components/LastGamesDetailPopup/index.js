import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import moment from 'moment';

const getReadableAmount = amount => {
  const one = 10000;
  return Math.round(((+amount / one) * 100) / 100);
};

const BetsTable = props => {
  const { bets } = props;
  return (
    <table className={styles.betsTable}>
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Bet amount</th>
          <th scope="col">Crash factor</th>
        </tr>
      </thead>
      <tbody>
        {bets.map((bet, index) => {
          return (
            <tr>
              <td>
                <a
                  className={'global-link-style'}
                  target={'_blank'}
                  href={`${window.location.origin}/user/${bet.userid}`}
                  rel="noreferrer"
                >
                  {bet.userid}
                </a>
              </td>
              <td>{getReadableAmount(bet.stakedamount)}</td>
              <td className={styles[`betState${bet.state}`]}>
                {bet.crashfactor}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const LastGamesDetailsPopup = ({ hidePopup, data }) => {
  const { details } = data;
  const { match, bets } = details;

  const matchDate = match?.created_at;

  const date = matchDate
    ? moment(matchDate).format('HH:mm:ss | DD/MM/YYYY')
    : '---';

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>Game details</div>
      <div className={styles.separator}></div>
      <div className={styles.gameDate}>
        <span>{date}</span>
      </div>
      <div className={styles.content}>
        <div>
          <b>Game ID:</b> <span>{match?.id}</span>
        </div>
        <div>
          <b>Game Hash:</b> <span>{match?.gamehash}</span>
        </div>
        <div>
          <b>Crash factor:</b> <span>{match?.crashfactor}</span>
        </div>
        <div>
          <b>Game duration (s):</b>{' '}
          <span>{match?.gamelengthinseconds / 1000}</span>
        </div>
        <div>
          <b>Sum invested:</b> <span>{getReadableAmount(500000) || 0}</span>
        </div>
        <div>
          <b>Sum rewarded:</b>{' '}
          <span>{getReadableAmount(match?.amountrewardedsum) || 0}</span>
        </div>
        <div>
          <b>Total trades:</b> <span>{match?.numtrades || 0}</span>
        </div>
        <div>
          <b>Total cashouts:</b> <span>{match?.numcashouts || 0}</span>
        </div>

        <div className={styles.betsTableContainer}>
          <BetsTable bets={bets} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(LastGamesDetailsPopup);
