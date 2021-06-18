import React         from 'react';
import styles        from './styles.module.scss';
import Input         from '../Input';
import classNames    from 'classnames';
import _             from 'lodash';
import ErrorHint     from '../ErrorHint';
import { useState }  from 'react';
import { useEffect } from 'react';

const TokenNumberInput = ({ value, setValue, maxValue, errorText, className, ...props }) => {
    const onChange = (event) => {
        const value       = _.get(event, 'target.value', 0);
        const targetValue = _.toNumber(value);

        setValue(targetValue);
    };
    return (
        <>
            <div
                className={classNames(
                    styles.tokenNumberInputContainer,
                    className,
                )}
            >
                <Input
                    className={styles.input}
                    type={'number'}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                <span className={styles.eventTokenLabel}>
                    EVNT
                </span>
            </div>
            <ErrorHint
                className={styles.tokenNumberErrorHint}
                errorText={errorText}
            />
        </>
    );
};

export default TokenNumberInput;