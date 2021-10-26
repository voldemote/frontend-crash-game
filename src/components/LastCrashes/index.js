import styles from './styles.module.scss';
import { PopupActions } from '../../store/actions/popup';
import { connect } from 'react-redux';
import PopupTheme from '../Popup/PopupTheme';
import { getGameDetailById } from '../../api/crash-game';
import _ from 'lodash';

const LastCrashes = ({ lastCrashes, showPopup }) => {
  const handleCrashFactorClick = async (crash, e) => {
    const response = await getGameDetailById('0').catch(err => {
      console.error("Can't get user by id:", err);
    });
    const details = response?.data || null;

    if (details) {
      showPopup(PopupTheme.lastGamesDetail, {
        small: true,
        data: {
          details,
          crash,
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Last Crashes</span>
      <div className={styles.crashes}>
        <div className={styles.overlay}></div>
        {lastCrashes.map((crash, i) => (
          /* Crash factors are not guaranteed to be unique, so create a unique key - crash + index */
          <span
            onClick={e => handleCrashFactorClick(crash, e)}
            key={`${crash}${i}`}
            className={styles.crash}
          >
            {crash.toFixed(2)}x
          </span>
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(LastCrashes);
