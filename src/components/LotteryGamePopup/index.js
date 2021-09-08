import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';

import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';

const LotteryGamePopup = ({ hidePopup, rewardId }) => {
  return (
    <div className={styles.reportEvent}>
      <img src={LogoSplash} className={styles.logo} alt="logo" />
      <p>Congratulations!</p>
      <div className={styles.title}>Your Number: {rewardId}</div>
      <div className={styles.subtitle}>
        You Have A Chance To Win Up To 5000 WFair
      </div>

      <div className={styles.content}>
        We Will Notify You About The Lottery Results!
      </div>

      <Button
        className={styles.sendButton}
        onClick={hidePopup}
        highlightType={HighlightType.highlightModalButton}
        disabled={false}
        disabledWithOverlay={false}
        withoutBackground={true}
      >
        Keep Going!
      </Button>
    </div>
  );
};

export default LotteryGamePopup;
