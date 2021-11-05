import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import ContentFooter from 'components/ContentFooter';

import './swiper.scss';
import React from 'react'; //workaround for swiper module

const Activities = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.globalStats}>
          <div className={styles.statsBlock}>
            <div className={styles.statItem}>
              <div className={styles.statItemHead}>
                <span>5</span> Game bets
              </div>
              <div className={styles.statItemHint}>last 24 hours</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statItemHead}>
                <span>5</span> Game bets
              </div>
              <div className={styles.statItemHint}>last week</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statItemHead}>
                <span>5</span> Game bets
              </div>
              <div className={styles.statItemHint}>all time</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statItemHead}>
                <span>5</span> Game trades volume
              </div>
              <div className={styles.statItemHint}>last 24 hours</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statItemHead}>
                <span>5</span> Game trades volume
              </div>
              <div className={styles.statItemHint}>last week</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statItemHead}>
                <span>5</span> Game trades volume
              </div>
              <div className={styles.statItemHint}>all time</div>
            </div>
          </div>
        </div>

        <ActivitiesTracker
          showCategories={true}
          activitiesLimit={50}
          className={
            styles.activitiesTrackerContainerFull + ' activities-tracker-swiper'
          }
        />
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Activities;
