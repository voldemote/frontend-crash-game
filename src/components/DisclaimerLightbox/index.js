import styles from './styles.module.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import { useCallback, useState } from 'react';
// import { useLocation } from 'react-router';

const states = {
  HIDDEN: 'hidden',
  CLOSEDBYUSER: 'closedbyuser',
  ACTIVE: 'active',
};

const DisclaimerLightbox = ({ className = '' }) => {
  const [viewState, setViewState] = useState(states.ACTIVE);

  const handleClick = useCallback(async () => {
    setViewState(states.CLOSEDBYUSER);
  }, []);

  //TODO add view state to Redux

  return (
    <div
      className={classNames(
        styles.lightbox,
        className,
        viewState !== states.ACTIVE ? styles.hidden : styles.active
      )}
    >
      <Icon
        className={styles.closeButton}
        iconType={IconType.cross}
        onClick={handleClick}
      />
      <div className={styles.content}>
        <p>Disclaimer</p>
        <p>
          Wallfair.io serves informational, entertainment and educational
          purposes only. We neither plan to take custody of any user's or
          participant's fiat or cryptocurrency assets nor to host any events
          that have not been prepared by or agreed with the team of Wallfair. We
          use the Ethereum blockchain smart contracts as a tool for both
          visualizing data and market trends from on-chain activity, and
          interacting with the users directly. The users need to be of age (18+)
          and sound body and mind (meaning unaffected by addiction or substances
          causing loss of control or consciousness) to use the website. The
          participation in the events and trades on the website is voluntary and
          final and the availability of the platform may be affected by the
          online connection enabled by your local internet provider. All
          questions and doubts can be addressed to the team at
          hello@wallfair.io.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerLightbox;
