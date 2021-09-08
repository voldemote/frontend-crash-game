import React, { useEffect } from 'react';
import _ from 'lodash';
import ReactCanvasConfetti from 'react-canvas-confetti';
import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import classNames from 'classnames';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

let animationInstance;
const BetApproveView = ({ closed, hidePopup }) => {
  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.6 },
        particleCount: Math.floor(1000 * particleRatio),
      });
  };

  const startAnimation = () => {
    makeShot(0.35, {
      spread: 60,
      startVelocity: 55,
      decay: 0.9,
    });

    makeShot(0.2, {
      spread: 90,
      decay: 0.9,
    });

    makeShot(0.35, {
      spread: 120,
      decay: 0.95,
      scalar: 0.8,
    });

    makeShot(0.3, {
      spread: 150,
      startVelocity: 25,
      decay: 0.99,
      scalar: 1.2,
    });

    makeShot(0.3, {
      spread: 120,
      decay: 1,
      startVelocity: 45,
    });
  };

  const getInstance = instance => {
    animationInstance = instance;
  };

  useEffect(() => {
    !closed && startAnimation();
  }, [closed]);

  return (
    <div className={styles.approveBetContainer}>
      <span className={styles.approveBetHeadline}>
        <img src={LogoSplash} className={styles.logo} />
        Congratulations!
      </span>
      <span className={styles.betPostedHeadline}>
        Your Bet Has Been <br />
        Posted
      </span>
      <div className={styles.betButtonContainer}>
        <Button
          className={classNames(styles.betButton)}
          highlightType={HighlightType.highlightHomeCtaBet}
          disabledWithOverlay={false}
          onClick={hidePopup}
        >
          Keep Going
        </Button>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      debugger;
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(BetApproveView);
