import Icon from '../Icon';
import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import IconTheme from '../Icon/IconTheme';

const HeaderWithHeadline = ({ headline }) => {
  const history = useHistory();

  const backIconClick = () => {
    history.goBack();
  };

  return (
    <div className={styles.headerWithHeadlineContainer}>
      <Icon
        className={styles.backIcon}
        iconTheme={IconTheme.primary}
        iconType={IconType.arrowLeft}
        onClick={backIconClick}
      />
      <h2>{headline}</h2>
      <span></span>
    </div>
  );
};

export default HeaderWithHeadline;
