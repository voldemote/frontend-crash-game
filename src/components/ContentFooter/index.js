import { memo } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import LogoFooter from '../../data/icons/wfair-logo-footer.svg';

import classNames from 'classnames';
import { LeaderboardActions } from 'store/actions/leaderboard';
import { useCallback } from 'react';
import { GeneralActions } from 'store/actions/general';

const ContentFooter = ({ className = '', disclaimerHidden, setOpenDrawer }) => {
  const openLeaderboard = useCallback(event => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  }, []);

  return (
    <div className={styles.container}>
      <div className={classNames(styles.footer, className)}>
        <a
          href="https://wallfair.io/"
          target="_blank"
          rel="noreferrer"
          data-tracking-id="footer-wfair-logo"
        >
          <img src={LogoFooter} alt={'wallfair-alpha'} />
        </a>
        <div className={styles.links}>
          <a
            href="https://wallfair.medium.com"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-buy-wfair"
          >
            <p>Blog</p>
          </a>
          <a
            href="https://wallfair.io/about-us#career"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-career"
          >
            Career
          </a>
          <a
            href="https://github.com/wallfair-organization"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-source-code"
          >
            <p>Source Code</p>
          </a>

          <a
            data-tracking-id="footer-terms"
            href="https://files.wallfair.io/docs/terms-and-conditions.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <p>{'Terms & Conditions'}</p>
          </a>

          <a
            data-tracking-id="footer-terms"
            href="https://files.wallfair.io/docs/kyc-policy.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <p>{'KYC Policy'}</p>
          </a>

          <a
            data-tracking-id="footer-terms"
            href="https://files.wallfair.io/docs/responsible-gambling.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <p>{'Responsible Gambling'}</p>
          </a>

          <a
            data-tracking-id="footer-privacy"
            href="https://files.wallfair.io/docs/privacy_policy_alpacasino.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <p>Imprint</p>
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    disclaimerHidden: state.general.disclaimerHidden,
    leaderboardOpen: state.leaderboard.leaderboard.openDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLeaderboardDrawer: open => {
      dispatch(LeaderboardActions.handleDrawer({ open }));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(ContentFooter);
export default memo(Connected);
