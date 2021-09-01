import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import React from 'react';
import styles from './styles.module.scss';

const SwitchableContainer = ({
  className,
  fullWidth = true,
  whiteBackground = true,
  underlineInactive = false,
  switchableViews,
  currentIndex,
  setCurrentIndex,
  handleChartDirectionFilter,
}) => {
  const renderAll = () => {
    return _.map(switchableViews, renderSwitchableView);
  };

  const onClick = index => {
    return () => {
      setCurrentIndex(index);
      handleChartDirectionFilter(index);
    };
  };

  const renderSwitchableView = (viewOptions, index) => {
    const isCurrent = index === currentIndex;
    const name = _.get(
      viewOptions,
      'name',
      _.isString(viewOptions) ? viewOptions : null
    );
    const iconType = _.get(viewOptions, 'iconType');
    const iconTheme = _.get(viewOptions, 'iconTheme', IconTheme.primary);

    return (
      <div
        key={index}
        className={classNames(
          styles.switchableViews,
          isCurrent ? styles.selected : null,
          underlineInactive ? styles.underlineInactive : null
        )}
        onClick={onClick(index)}
      >
        <div className={styles.text}>
          {iconType && (
            <Icon width={'auto'} iconTheme={iconTheme} iconType={iconType} />
          )}
          <span>{name}</span>
        </div>
        <span className={styles.line}></span>
      </div>
    );
  };

  return (
    <div
      className={classNames(
        styles.switchableViewsContainer,
        fullWidth ? styles.fullWidthSwitches : null,
        whiteBackground ? styles.withWhiteBackground : null,
        className
      )}
    >
      {renderAll()}
    </div>
  );
};

export default SwitchableContainer;
