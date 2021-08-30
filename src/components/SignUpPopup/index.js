import _ from 'lodash';

import Icon from '../Icon';
import LogoMini from '../../data/images/logo.png';
import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
import { LOGGED_IN } from 'constants/AuthState';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router-dom';
import { TOKEN_NAME } from '../../constants/Token';

const SignUpPopup = ({ closed, user, hidePopup, authState }) => {
  const history = useHistory();

  const renderWelcomeText = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <img className={styles.logoMini} src={LogoMini} />
        <span className={styles.welcomeTextText}>Sign up and get</span>
        <span className={styles.welcomeTextHeadline}>
          5.000 {TOKEN_NAME} for free!
          <span className={styles.welcomeTextHeadlineUnderline}></span>
        </span>
      </div>
    );
  };

  const goToJoinPage = () => {
    if (authState !== LOGGED_IN) {
      history.push(Routes.join);
    }
  };

  const renderStartTradingButton = () => {
    return (
      <Button
        withoutBackground={true}
        className={styles.joinNowButton}
        onClick={goToJoinPage}
      >
        Join now
      </Button>
    );
  };

  return (
    <div className={styles.welcomeContainer}>
      <span className={styles.welcomeConfettiRight}>
        <Icon iconType={IconType.confettiRight} iconTheme={null} />
      </span>
      {renderWelcomeText()}
      {renderStartTradingButton()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPopup);
