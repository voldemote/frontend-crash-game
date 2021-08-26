import React from 'react';
import _ from 'lodash';

import styles from './styles.module.scss';

import { useState } from 'react';

import EventBetPill from '../EventBetPill';
import Icon from '../Icon';
import IconType from '../Icon/IconType';

const EventBetPillList = ({ event, bets }) => {
  const betPillPreviewCount = 3;
  const [showAllPills, setShowAllPills] = useState(false);
  const betsWithoutResolved = _.filter(
    bets,
    bet => !_.get(bet, 'finalOutcome', false)
  );

  const onShowAllClick = () => {
    setShowAllPills(true);
  };

  const renderBetPills = () => {
    const eventId = _.get(event, '_id');
    let betsToRender = betsWithoutResolved;

    if (!showAllPills) {
      betsToRender = _.slice(betsToRender, 0, betPillPreviewCount);
    }

    return _.map(betsToRender, (bet, betIndex) => {
      return (
        <EventBetPill
          key={eventId + '-' + betIndex}
          userId={bet.creator}
          bet={bet}
          eventId={eventId}
        />
      );
    });
  };

  const renderShowAllBetsText = () => {
    const size = _.size(betsWithoutResolved);

    if (!showAllPills && size > betPillPreviewCount) {
      const countDifference = size - 3;

      return (
        <div onClick={onShowAllClick} className={styles.showAllPillsText}>
          Show + {countDifference} event trades
          <Icon
            className={styles.showAllDropDownIcon}
            iconType={IconType.arrowDown}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderBetPills()}
      {renderShowAllBetsText()}
    </>
  );
};

export default EventBetPillList;
