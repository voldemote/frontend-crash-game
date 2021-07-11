import React      from 'react';
import styles     from './styles.module.scss';
import _          from 'lodash';
import classNames from 'classnames';

const TradeStateBadge = ({ state }) => {
    const getStateText = () => {
        return _.capitalize(state);
    };

    return (
        <span
            className={classNames(
                styles.tradeStateBadge,
                styles[state],
            )}
        >
            <span></span>
            {getStateText()}
        </span>
    );
};

export default TradeStateBadge;