import Icon from '../Icon';
import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const ErrorHint = ({ className, errorText }) => {
  if (errorText && errorText.length) {
    return (
      <div className={classNames(styles.errorTextContainer, className)}>
        <Icon className={styles.errorTextIcon} iconType={IconType.attention} />
        <span>{errorText}</span>
      </div>
    );
  }

  return null;
};

export default ErrorHint;
