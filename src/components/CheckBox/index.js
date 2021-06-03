import React     from 'react';
import styles    from './styles.module.scss';
import ErrorHint from '../ErrorHint';

const CheckBox = ({ checked, setChecked, text, errorText }) => {
    const onClick = () => {
        setChecked(!checked);
    };

    return (
        <>
            <div
                className={styles.checkboxContainer}
                onClick={onClick}
            >
                <input
                    className={styles.checkbox}
                    type={'checkbox'}
                    checked={checked}
                />
                {text}
            </div>
            <ErrorHint errorText={errorText} />
        </>
    );
};

export default CheckBox;
