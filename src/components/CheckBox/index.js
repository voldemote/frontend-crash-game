import React from 'react';
import styles from './styles.module.scss';
import ErrorHint from '../ErrorHint';
import classNames from 'classnames';

const CheckBox = ({ className, checked, setChecked, text, errorText }) => {
  const onClick = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div
        className={classNames(styles.checkboxContainer, className)}
        onClick={onClick}
      >
        <input
          className={styles.checkbox}
          type={'checkbox'}
          checked={checked}
        />
        {text}
      </div>
      <ErrorHint errorText={errorText} />
    </>
  );
};

export default CheckBox;
