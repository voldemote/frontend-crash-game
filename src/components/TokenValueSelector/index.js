import React      from 'react';
import styles     from './styles.module.scss';
import _          from 'lodash';
import classNames from 'classnames';

const TokenValueSelector = ({ className, values, onSelect }) => {
    const renderValue = (value, index) => {
        return (
            <div
                className={styles.tokenValueSelectorBox}
                onClick={() => onSelect(value)}
                key={index}
            >
                <span className={styles.value}>
                    {value}
                </span>
                <span className={styles.label}>
                    EVNT
                </span>
            </div>
        );
    };

    return (
        <div
            className={classNames(
                styles.tokenValueSelector,
                className,
            )}
        >
            {
                _.map(values, renderValue)
            }
        </div>
    );
};

export default TokenValueSelector;