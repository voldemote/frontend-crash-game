import React      from 'react';
import styles     from './styles.module.scss';
import _          from 'lodash';
import classNames from 'classnames';

const TokenValueSelector = ({ className, values, activeValue, onSelect }) => {
    const onTokenValueClick = (value, enabled) => {
        if (enabled) {
            return () => onSelect(value);
        }
    };

    const renderValue = (valueObject, index) => {
        const value     = _.get(valueObject, 'value', valueObject);
        const isEnabled = _.get(valueObject, 'enabled', true);
        let isSelected  = false;

        // @TODO: was there a reason to not use strict equal?
        if (activeValue === value) {
            isSelected = true;
        }

        return (
            <div
                className={classNames(
                    styles.tokenValueSelectorBox,
                    isSelected ? styles.tokenValueSelectorBoxSelected : null,
                    !isEnabled ? styles.tokenValueSelectorBoxDisabled : null,
                )}
                onClick={onTokenValueClick(value, isEnabled)}
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
