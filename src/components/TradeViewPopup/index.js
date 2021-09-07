import _ from 'lodash';

import styles from './styles.module.scss';
import { connect } from 'react-redux';
import BetView from '../BetView';

const TradeViewPopup = ({ betId, eventId, openBets }) => {
  return (
    <div className={styles.tradeViewContainer}>
      <BetView
        betId={betId}
        eventId={eventId}
        openBets={openBets}
        closed={false}
        showEventEnd={true}
        initialSellTab={false}
        isTradeViewPopup={true}
      />
    </div>
  );
};

export default connect(null, null)(TradeViewPopup);
