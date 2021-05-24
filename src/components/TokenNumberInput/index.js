import React      from 'react';
import styles     from './styles.module.scss';
import Input      from '../Input';
import classNames from 'classnames';

const TokenNumberInput = ({ value, setValue, className, ...props }) => {
    return (
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
                onChange={(event) => setValue(event.target.value)}
                {...props}
            />
            <span className={styles.eventTokenLabel}>
                EVNT
            </span>
        </div>
    );
};

export default TokenNumberInput;