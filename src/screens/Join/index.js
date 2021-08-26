import Authentication from '../../components/Authentication';
import classNames from 'classnames';
import darkModeLogo from '../../data/images/logo-demo.svg';
import Icon from '../../components/Icon';
import IconTheme from '../../components/Icon/IconTheme';
import IconType from '../../components/Icon/IconType';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import useWindowDimensions from '../../components/hoc/useWindowDimensions';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthState from '../../constants/AuthState';
import { useHistory } from 'react-router';

const Join = ({ authState }) => {
  const history = useHistory();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (authState === AuthState.LOGGED_IN) {
      history.push(Routes.home);
    }
  }, []);

  const shouldShowWelcomeScreen = () => {
    return width >= 768;
  };

  const shouldShowAuthScreen = () => {
    return width >= 768 || !shouldShowWelcomeScreen();
  };

  const goBackHome = () => {
    history.push(Routes.home);
  };

  return (
    <div className={styles.welcomeContainer}>
      <Icon
        width={30}
        height={30}
        className={styles.closeButton}
        iconType={IconType.deleteInput}
        iconTheme={IconTheme.primary}
        onClick={goBackHome}
      />
      <div
        className={classNames(
          styles.welcomeContentContainer,
          shouldShowWelcomeScreen() ? null : styles.hidden
        )}
      >
        <div className={styles.welcomeContentOverlay}></div>
        <div className={styles.welcomeContent}>
          <img className={styles.welcomeLogo} src={darkModeLogo} alt="" />
          <h1 className={styles.welcomeTitle}>
            Hello, we are <br />
            WallFair!
            <br />
            Simple betting <br /> for{' '}
            <span className={styles.welcomeTitleHighlight}> everyone</span>
            <br />
            on anything.
          </h1>
        </div>
      </div>
      <div
        className={classNames(
          styles.welcomeAuthContainer,
          shouldShowAuthScreen() ? null : styles.hidden
        )}
      >
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

export default connect(mapStateToProps, null)(Join);
