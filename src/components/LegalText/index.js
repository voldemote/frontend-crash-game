import React from 'react';
import styles from './styles.module.scss';

const LegalText = ({ children }) => {
  return <div className={styles.legalText}>{children}</div>;
};

export default LegalText;
