import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';
import { EVENT_STATES } from 'constants/EventStates';
import LiveBadge from '../LiveBadge';
import ViewerBadge from '../ViewerBadge';
import OfflineBadge from '../OfflineBadge';
import Tags from '../Tags';
import TimeLeftCounter from '../TimeLeftCounter';
import classNames from 'classnames';
import EmbedVideo from 'components/EmbedVideo';

const BetCard = ({
  onClick,
  title,
  organizer,
  image,
  state,
  viewers,
  tags,
  eventEnd,
  eventCardClass,
  streamUrl,
}) => {
  const isOnlineState = state === EVENT_STATES.ONLINE;
  const isOfflineState = state === EVENT_STATES.OFFLINE;

  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const [inHover, setHover] = useState(false);

  return (
    <div className={styles.betCardContainer} onClick={onClick}>
      <div
        className={classNames(styles.betCard, eventCardClass)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {isOnlineState && inHover ? (
          <>
            <EmbedVideo
              className={styles.eventVideoBackground}
              video={streamUrl}
              muted={true}
              controls={false}
            />
            <div className={styles.betCardVideoBackground}></div>
          </>
        ) : (
          <>
            <div
              className={styles.betCardBackgroundBlur}
              style={getEventCardStyle()}
            ></div>
            <div className={styles.betCardBackground}></div>
            <div>
              {isOnlineState && (
                <>
                  <LiveBadge />
                  <ViewerBadge viewers={viewers} />
                </>
              )}
              {isOfflineState && <OfflineBadge />}
            </div>
            <div
              className={classNames(styles.content, {
                // [styles.timerActive]: eventEnd,
              })}
            >
              <span className={styles.title}>
                {title}
                <br />
                {organizer}
              </span>
            </div>
            {eventEnd && (
              <div className={styles.timer}>
                <span className={styles.timerTitle}>Event ends in:</span>
                <span>
                  <TimeLeftCounter endDate={eventEnd} viewSeconds={true} />
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BetCard;
