import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

const LiveBadge = ({className}) => {
  return (
    <span className={classNames(className, styles.liveBadge)}>
      <span></span>
      Live
    </span>
  );
};

export default LiveBadge;
