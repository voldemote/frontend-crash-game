import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

const EventTradesContainer = ({
  className,
  fullWidth = true,
  underlineInactive = false,
  eventViews,
  currentIndex,
  setCurrentIndex,
}) => {
  const renderAll = () => {
    return _.map(eventViews, renderEventTradesViews);
  };

  const onClick = index => {
    return () => {
      setCurrentIndex(index);
    };
  };

  const renderEventTradesViews = (viewOptions, index) => {
    const isCurrent = index === currentIndex;
    const name = _.get(
      viewOptions,
      'name',
      _.isString(viewOptions) ? viewOptions : null
    );
    const counter = _.get(viewOptions, 'counter');
    const showCounter = _.get(viewOptions, 'showCounter');

    return (
      <div
        key={index}
        className={classNames(
          styles.eventViews,
          isCurrent ? styles.selected : null,
          underlineInactive ? styles.underlineInactive : null
        )}
        onClick={onClick(index)}
      >
        <div className={styles.textBlock}>
          <span className={styles.name}>{name}</span>
          {showCounter && (
            <span className={styles.tradeCounter}>{counter}</span>
          )}
        </div>
        <span className={styles.line}></span>
      </div>
    );
  };

  return (
    <div
      className={classNames(
        styles.eventTradesContainer,
        fullWidth ? styles.fullWidthSwitches : null,
        className
      )}
    >
      {renderAll()}
    </div>
  );
};

export default EventTradesContainer;
