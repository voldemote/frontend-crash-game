import _ from 'lodash';

import styles from './styles.module.scss';
import { connect } from 'react-redux';
import BetView from '../BetView';

const TradeViewPopup = ({ closed }) => {
  return (
    <div className={styles.tradeViewContainer}>
      <BetView
        closed={false}
        showEventEnd={true}
        initialSellTab={false}
        isTradeViewPopup={true}
      />
    </div>
  );
};

export default connect(null, null)(TradeViewPopup);
