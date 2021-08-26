import _ from 'lodash';

import Icon from '../Icon';

import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import HighlightType from '../Highlight/HighlightType';
import { PopupActions } from '../../store/actions/popup';

const WelcomeView = ({ closed, user, hidePopup }) => {
  const renderHeadline = () => {
    const name = _.get(user, 'name');

    return <span className={styles.welcomeHeadline}>Welcome, {name} ❤️</span>;
  };

  const renderWelcomeText = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <span className={styles.welcomeTextHeadline}>
          1.000 EVNT
          <span className={styles.welcomeTextHeadlineUnderline}></span>
        </span>
        <span className={styles.welcomeTextText}>
          Free for full Wallfair experience!
        </span>
        <span className={styles.welcomeTextText}>
          Refer a friend and get additional 50 EVNT.
        </span>
      </div>
    );
  };

  const renderStartTradingButton = () => {
    return (
      <Button
        highlightType={HighlightType.highlightHomeCtaBet}
        withoutBackground={true}
        onClick={hidePopup}
      >
        Start Trading
      </Button>
    );
  };

  return (
    <div className={styles.welcomeContainer}>
      <span className={styles.welcomeConfettiLeft}>
        <Icon iconType={IconType.confettiLeft} iconTheme={null} />
      </span>
      <span className={styles.welcomeConfettiRight}>
        <Icon iconType={IconType.confettiRight} iconTheme={null} />
      </span>
      {renderHeadline()}
      {renderWelcomeText()}
      {renderStartTradingButton()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);
