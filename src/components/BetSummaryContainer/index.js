import ProfileContainer from '../ProfileContainer';
import React from 'react';
import RippedTicketContainer from '../RippedTicketContainer';
import styles from './styles.module.scss';
import TimeLeftCounter from '../../components/TimeLeftCounter';
import classNames from 'classnames';
import SummaryRowContainer from '../SummaryRowContainer';

const BetSummaryContainer = ({
  className,
  containerClassName,
  containerImage,
  marketQuestion,
  endDate,
  summaryRows,
  onClick,
}) => {
  const renderEventEndDate = () => {
    if (endDate) {
      return (
        <div className={styles.summaryTimeLeftContainer}>
          <span>End of Trade:</span>
          <TimeLeftCounter endDate={endDate} />
        </div>
      );
    }

    return null;
  };

  const getHeaderImageStyle = () => {
    return {
      backgroundImage: 'url("' + containerImage + '")',
    };
  };

  const renderHeader = () => {
    if (containerImage) {
      return (
        <div
          className={styles.headerImageContainer}
          style={getHeaderImageStyle()}
        ></div>
      );
    }

    return <ProfileContainer />;
  };

  return (
    <RippedTicketContainer
      className={classNames(
        styles.summaryTicketContainer,
        containerImage ? styles.summaryTicketContainerWithContainerImage : null,
        containerClassName
      )}
      onClick={onClick}
    >
      {renderHeader()}
      <span className={styles.summaryTicketHeadline}>{marketQuestion}</span>
      <SummaryRowContainer className={className} summaryRows={summaryRows} />
      {renderEventEndDate()}
    </RippedTicketContainer>
  );
};

export default BetSummaryContainer;
