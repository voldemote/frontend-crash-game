import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import {connect} from 'react-redux';
import {PopupActions} from 'store/actions/popup';
import moment from 'moment';
import {getGameDetailById} from '../../api/crash-game';
import PopupTheme from '../Popup/PopupTheme';
import classNames from 'classnames';
import React from "react";

import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';

const roundToTwo = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const getReadableAmount = amount => {
  const one = 10000;
  return roundToTwo(+amount / one);
};


const FairnessPopup = ({hidePopup, showPopup, data}) => {


  const handleCrashFactorChange = async (gameHash, type) => {
    // const response = await getGameDetailById(gameHash, gameTypeId, type).catch(err => {
    //   console.error('getGameDetailById err', err);
    // });
    // const details = response?.data || null;
    //
    // if (details.match) {
    //   showPopup(PopupTheme.lastGamesDetail, {
    //     maxWidth: true,
    //     data: {
    //       details,
    //     },
    //   });
    // } else {
    //   hidePopup();
    // }
  };

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo}/>
      <div className={styles.title}>
        <Icon
          className={styles.balanceIcon}
          iconType={IconType.balanceScaleSolid}
          iconTheme={IconTheme.black}
          height={18}
          width={18}
        /> Fairness
      </div>
      <div className={styles.separator}></div>
      <div className={styles.content}>
        <div className={classNames("global-link-style", styles.verificationTool)}><a
          href={"https://jsfiddle.net/fx1dev/ezx8vp6a/show"} target={"_blank"} rel="noreferrer"><b>Single Game
          Verification Tool</b></a></div>


        {/*<h3 className={classNames(styles.seedsRotateTitle)}>Seeds</h3>*/}
        <div className={classNames(styles.seedsRotateForm)}>
          SEEDS FORM
        </div>
      <div>
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

export default connect(null, mapDispatchToProps)(FairnessPopup);
