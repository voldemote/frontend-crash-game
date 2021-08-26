import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './styles.module.scss';

const StateBadge = ({ state, withoutBackground = false }) => {
  const getStateText = () => {
    return _.capitalize(state);
  };

  return (
    <span
      className={classNames(
        styles.stateBadge,
        styles[state],
        withoutBackground ? styles.withoutBackground : null
      )}
    >
      <span></span>
      {getStateText()}
    </span>
  );
};

export default StateBadge;
