import _ from 'lodash';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Authentication from '../Authentication';

const JoinPopup = () => {
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

export default JoinPopup;
