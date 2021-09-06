import styles from './styles.module.scss';
import _ from 'lodash';
import StateBadge from '../StateBadge';
import classNames from 'classnames';
import { formatToFixed } from '../../helper/FormatNumbers';
import { Link } from 'react-router-dom';

const MyTradesList = ({ bets, withStatus = false }) => {
  const renderBets = () => {
    return _.map(bets, (item, index) => {
      const negativeOutcome =
        _.toNumber(item.investmentAmount) > _.toNumber(item.outcomeAmount);
      const outcomePercentage = negativeOutcome
        ? `-${formatToFixed(
            (100 - item.outcomeAmount / item.investmentAmount) * 100
          )}% `
        : `+${formatToFixed(
            (item.investmentAmount / item.outcomeAmount) * 100
          )}% `;

      return (
        <div key={index} className={styles.betItem}>
          <img src={item.imageUrl} className={styles.eventImg} />
          <div className={styles.betInfo}>
            <div className={styles.titleContainer}>
              <Link to={`/trade/${item.slug}`} className={styles.titleLink}>
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
              </Link>
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
