import style from './styles.module.scss';
import { LeaderboardActions } from '../../store/actions/leaderboard';
import _ from 'lodash';
import LeaderboardItem from '../LeaderboardItem';
import { connect, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { LOGGED_IN } from 'constants/AuthState';
import { selectLeaderboard } from 'store/selectors/leaderboard';
import { selectUser } from 'store/selectors/authentication';

const Leaderboard = ({
  fetchLeaderboard,
  fetch = false,
  setMissingAmount = () => {},
  small = false,
}) => {
  const LIMIT = small ? 5 : 10;
  const SKIP_FOR_CURRENT = small ? 1 : 3;
  const LIMIT_FOR_CURRENT = small ? 5 : 5;

  const [fetched, setFetched] = useState(false);

  const leaderboard = useSelector(selectLeaderboard);

  const users = _.get(leaderboard, 'users', []);
  const usersWithCurrent = _.get(leaderboard, 'usersWithCurrent', []);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (fetch && !fetched) {
      fetchLeaderboard(
        0,
        LIMIT,
        user.authState === LOGGED_IN,
        SKIP_FOR_CURRENT,
        small ? 1 : LIMIT_FOR_CURRENT
      );
      setMissingAmount(getMissingWinnerAmount());
      setFetched(true);
    }
  }, [fetch, fetched]);

  const getMissingWinnerAmount = () => {
    const first = users[0];
    if (users.length == 0 || first._id === user.userId) return 0;
    return first.amountWon - user.amountWon;
  };

  const onLeaderboardLoad = () => {
    fetchLeaderboard(
      users.length,
      LIMIT,
      false,
      SKIP_FOR_CURRENT,
      LIMIT_FOR_CURRENT
    );
  };

  const onAfterCurrentLeaderboardLoad = () => {
    const last = usersWithCurrent[usersWithCurrent.length - 1];
    const skip =
      small && usersWithCurrent.length === 1 ? last.rank : last.rank - 1;
    fetchLeaderboard(skip, 0, true, SKIP_FOR_CURRENT, LIMIT_FOR_CURRENT);
  };

  return (
    <div className={style.leaderboardTable}>
      <div className={style.tableHeadings}>
        <p className={style.rankingHeading}>RANKING</p>
        <p className={style.userHeading}>USER</p>
        <p className={style.tokenHeading}>TOKENS WON</p>
      </div>
      <div className={style.leaderboardRanking}>
        {users &&
          users.map(u => {
            return (
              <LeaderboardItem
                user={u}
                isCurrentUser={u._id === user.userId}
                key={u.rank}
                showLoadButton={users[users.length - 1] === u}
                onLoad={() => onLeaderboardLoad()}
              />
            );
          })}
        {usersWithCurrent &&
          usersWithCurrent.map(u => {
            return (
              <LeaderboardItem
                user={u}
                isCurrentUser={u._id === user.userId}
                key={u.rank}
                showLoadButton={
                  usersWithCurrent[usersWithCurrent.length - 1] === u
                }
                onLoad={() => onAfterCurrentLeaderboardLoad()}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLeaderboard: (
      skip,
      limit,
      fetchAfterCurrent = false,
      skipForCurrent,
      limitForCurrent
    ) => {
      dispatch(
        LeaderboardActions.fetchAll({
          skip,
          limit,
          fetchAfterCurrent,
          skipForCurrent,
          limitForCurrent,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(Leaderboard);
