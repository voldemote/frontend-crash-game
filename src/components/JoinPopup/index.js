import _ from 'lodash';

import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { LOGGED_IN } from 'constants/AuthState';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Authentication from '../Authentication';

const JoinPopup = ({ closed, user, hidePopup, authState }) => {
  const history = useHistory();

  useEffect(() => {
    if (authState === LOGGED_IN) {
      history.push(Routes.home);
    }
  }, []);

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContentContainer}>
        <div className={styles.welcomeContentOverlay}></div>
        <div className={styles.welcomeContent}></div>
      </div>
      <div className={classNames(styles.welcomeAuthContainer)}>
        <Authentication />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinPopup);
