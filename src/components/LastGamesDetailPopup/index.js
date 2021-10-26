import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { useState } from 'react';
import Textarea from '../Textarea';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';

const LastGamesDetailsPopup = ({ hidePopup, data }) => {
  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>Game details</div>
      <div className={styles.subtitle}>
        <b>Id:</b> <span>{data?.crash}</span>
      </div>

      <div className={styles.content}>
        <div>
          <b>Crash factor:</b> <span>{data?.crash}</span>
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
