import styles from './styles.module.scss';
import {PopupActions} from '../../store/actions/popup';
import {connect} from 'react-redux';
import PopupTheme from '../Popup/PopupTheme';
import _ from 'lodash';

const Spins = ({spins, showPopup, text}) => {
  //  onClick={e => handleCrashFactorClick(crash, e)}
  const displaySignedFormat = (value) => {
    const val = Math.floor(value);
    return val > 0 ? `+${val}` : val
  }
  return (
    <div className={styles.container}>
      <span className={styles.title}>{text ? text : 'Last Crashes'}</span>
      <div className={styles.crashes}>
        <div className={styles.overlay}></div>
        {spins?.map((spin, i) => {
         const spinType = spin?.type;

          return (
            <span key={`${spin.value}${i}`} className={styles.crash}>
              <span className={spinType === 'win' ? styles.reward :spinType === 'loss'? styles.lost : styles.even}>{displaySignedFormat(spin.value)}</span>
          </span>
          )
        })}
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

export default connect(null, mapDispatchToProps)(Spins);
