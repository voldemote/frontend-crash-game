import React  from 'react';
import styles from './styles.module.scss';
import _      from 'lodash';

const TradeStateBadge = ({ state }) => {
    const getStateText = () => {
        return _.capitalize(state);
    };

    return (
        <span className={styles.tradeStateBadge}>
            <span></span>
            {getStateText()}
        </span>
    );
};

export default TradeStateBadge;