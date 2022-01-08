import styles from './styles.module.scss';
import {connect, useDispatch} from 'react-redux';
import {PopupActions} from 'store/actions/popup';
import React, {useState, useEffect} from "react";
import classNames from 'classnames';
import { trackWalletAddWfair } from 'config/gtm';
import PopupTheme from '../Popup/PopupTheme';

const SelectGameModePopup = ({hidePopup, showPopup, user, gameMode, setGameMode}) => {
  const dispatch = useDispatch();

  const hasBalance = (parseFloat(user?.balance) || 0) > 1;

  const handleRealPlayClick = ()=> {
    if(hasBalance) {
      setGameMode('real');
    } else {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    }
  }

  const handleFunPlayClick = ()=> {
    setGameMode('demo');
  }

  return (
    <div className={styles.popupContent}>

      <div className={styles.content}>
        <div className={classNames(styles.button, styles.buttonRealPlay)} onClick={handleRealPlayClick}>
            REAL PLAY
        </div>
        <div className={styles.separator}></div>
        <div className={classNames(styles.button, styles.buttonFunPlay)} onClick={handleFunPlayClick}>
           FUN PLAY
        </div>
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
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(SelectGameModePopup);
