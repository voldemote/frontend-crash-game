import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { useState } from 'react';
import Textarea from '../Textarea';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';

const LastGamesDetailsPopup = ({ hidePopup, data }) => {
  const { details } = data;
  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>Game details</div>
      <div className={styles.separator}></div>
      <div className={styles.content}>
        <div>
          <b>Game ID:</b> <span>{details?.id}</span>
        </div>
        <div>
          <b>Game Hash:</b> <span>{details?.gamehash}</span>
        </div>
        <div>
          <b>Crash factor:</b> <span>{details?.crashfactor}</span>
        </div>
        <div>
          <b>Game duration (s):</b> <span>{details?.gamelengthinseconds}</span>
        </div>
        <div>
          <b>Sum invested:</b> <span>{details?.amountinvestedsum || 0}</span>
        </div>
        <div>
          <b>Sum rewarded:</b> <span>{details?.amountrewardedsum || 0}</span>
        </div>
        <div>
          <b>Total trades:</b> <span>{details?.numtrades || 0}</span>
        </div>
        <div>
          <b>Total cashouts:</b> <span>{details?.numcashouts || 0}</span>
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
