import React  from 'react';
import styles from './styles.module.scss';
import Input  from '../Input';

const TokenNumberInput = ({ value, setValue, ...props }) => {
    return (
        <div className={styles.tokenNumberInputContainer}>
            <Input
                className={styles.input}
                type={'number'}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                {...props}
            />
            <span className={styles.eventTokenLabel}>EVNT</span>
        </div>
    );
};

export default TokenNumberInput;