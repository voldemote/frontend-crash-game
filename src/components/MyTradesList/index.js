import styles from './styles.module.scss';
import _ from 'lodash';
import StateBadge from '../StateBadge';
import classNames from 'classnames';
import { formatToFixed } from '../../helper/FormatNumbers';

const MyTradesList = ({ bets, withStatus = false }) => {
  const renderBets = () => {
    return _.map(bets, (item, index) => {
      const negativeOutcome = item.investmentAmount > item.outcomeValue;
      const outcomePercentage = negativeOutcome
        ? `-${formatToFixed(
            (item.outcomeAmount / item.investmentAmount) * 100
          )}% `
        : `+${formatToFixed(
            (item.investmentAmount / item.outcomeAmount) * 100
          )}% `;

      return (
        <div key={index} className={styles.betItem}>
          <img src={item.imageUrl} className={styles.eventImg} />
          <div className={styles.betInfo}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                {item.marketQuestion}
                {withStatus && (
                  <StateBadge
                    state={item.status}
                    withoutBackground={true}
                    withoutText={true}
                    className={styles.status}
                  />
                )}
              </div>
              <div className={styles.subtitle}>
                {item.endDate} | Your Prediction: {item.outcomeValue}
              </div>
            </div>
            <div className={styles.numbersContainer}>
              <div className={styles.value}>
                <span
                  className={classNames(
                    styles.percentage,
                    negativeOutcome ? styles.negative : null
                  )}
                >
                  {outcomePercentage}
                </span>
                {item.outcomeAmount}
              </div>
              <div className={styles.invested}>
                Invested: {item.investmentAmount}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return <>{renderBets()}</>;
};

export default MyTradesList;
