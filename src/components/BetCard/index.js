import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { calculateTimeLeft } from '../../helper/Time';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';
import LiveBadge from 'components/LiveBadge';
import HotBetBadge from 'components/HotBetBadge';
import HotBetBadgeTheme from 'components/HotBetBadge/HotBetBadgeTheme';
const BetCard = ({
  betId,
  onClick,
  onBookmark = () => {},
  onBookmarkCancel = () => {},
  title,
  image,
  eventEnd,
  eventCardClass,
  outcomes,
  category,
  item,
  isBookmarked = false,
  tags,
}) => {
  eventEnd = new Date("2022-02-16");
  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const getStickerStyle = category => {
    const cat = EVENT_CATEGORIES.find(c => c.value === category);
    if (!cat) return {};
    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(eventEnd))
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(eventEnd)));
    }, 60000);

    return () => clearTimeout(timerId);
  }, [eventEnd]);

  return (
    <div className={styles.betCardContainer} onClick={onClick}>
      <div className={styles.picture} style={getEventCardStyle()} />
      <div className={classNames(styles.picture, styles.overlay)} />
      <div className={classNames(styles.betCard, eventCardClass)}>
      
        <div className={styles.badgeContainer}>
          {/* <LiveBadge className={styles.liveBadge} /> */}
          <HotBetBadge className={styles.hotBadge} theme={HotBetBadgeTheme.opacity05}>3,212 Trade Vol.</HotBetBadge>
        </div>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{title}</span>
          <div className={styles.tags}>
            {/* {tags &&  */}
            {
              ['esports', 'racing'].map(tag => <span>#{tag}</span>)
              //tags.map(tag => <span>{tag}</span>)
            }
          </div>
        </div>
      </div>
      
      {eventEnd && new Date(eventEnd) > new Date() ? (
        <div className={styles.timerContainer}>
          <div className={styles.contentWrapper}>
            <span className={styles.timerLabel}>Event end in:{' '}</span>
            <span className={styles.timerValue}>
              {timeLeft?.days || 0}
            </span>
            <span className={styles.timerUnit}>days{' '}</span>
            <span className={styles.timerValue}>
              {timeLeft?.hours || 0}
            </span>
            <span className={styles.timerUnit}>hrs{' '}</span>
            <span className={styles.timerValue}>
              {timeLeft?.minutes || 0}
            </span>
            <span className={styles.timerUnit}>min{' '}</span>
          </div>
        </div>
      ) : (
        <div className={styles.timerContainer}>
          <div className={styles.contentWrapper}>
            <span className={styles.timerLabel}>Event ended</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetCard;
