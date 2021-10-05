import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import TimeLeftCounter from '../TimeLeftCounter';
import classNames from 'classnames';
import { getOutcomes } from 'api';
import moment from 'moment';
import { truncate } from 'lodash/string';

const BetCard = ({
  betId,
  onClick,
  title,
  image,
  eventEnd,
  eventCardClass,
  outcomes,
}) => {
  const happensWithin24h = moment(eventEnd).diff(moment(), 'h') <= 24;

  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const [outcomeValues, setOutcomeValues] = useState([
    ...outcomes.map(outcome => ({ ...outcome, amount: '...' })),
  ]);

  const roundOutcome = value => {
    return Math.min(100, Math.floor((1 / value) * 100));
  };

  useEffect(() => {
    const fetchOutcome = async () => {
      const result = await getOutcomes(betId, 1);
      if (result) {
        const populatedValues = result.data;
        const mergedData = outcomes.map(outcome => ({
          ...outcome,
          amount: roundOutcome(+populatedValues[outcome.index].outcome),
        }));
        setOutcomeValues(mergedData);
      }
    };

    fetchOutcome();
  }, []);

  function getGaugeWidth(amount = 1) {
    console.log(amount);
    return {
      width: `${amount}px`,
    };
  }

  return (
    <div className={styles.betCardContainer} onClick={onClick}>
      <div className={classNames(styles.betCard, eventCardClass)}>
        <>
          <span className={styles.section}>Wallfair</span>
          <div className={styles.header}>
            <div className={styles.titleContainer} title={title}>
              <span className={styles.title}>
                {truncate(title, { length: 62 })}
              </span>
            </div>
            <div className={styles.special}>
              <div className="star"></div>
              {eventEnd && happensWithin24h && (
                <div className={styles.timer}>
                  <TimeLeftCounter endDate={eventEnd} viewSeconds={true} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.outcomesContainer}>
            {outcomeValues.map(outcome => (
              <div className={styles.outcome}>
                <span className={styles.outcomeName} title={outcome.name}>
                  {outcome.name}
                </span>
                <div className={styles.visualization}>
                  <div
                    className={styles.gauge}
                    style={getGaugeWidth(outcome.amount)}
                  />
                </div>
                <span className={styles.amount} title="Likelihood of happening">
                  {outcome.amount}%
                </span>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default BetCard;
