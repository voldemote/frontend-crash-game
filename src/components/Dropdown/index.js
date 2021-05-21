import ErrorHint     from '../ErrorHint';
import React         from 'react';
import ReactDropdown from 'react-dropdown';
import styles        from './styles.module.scss';
import 'react-dropdown/style.css';

const Dropdown = ({ options, value, errorText, setValue, placeholder, ...rest }) => {

    const onChange = ({ value }) => {
        if (setValue) {
            setValue(value);
        }
    };

    return (
        <>
            <div className={styles.dropdownContainer}>
                <ReactDropdown
                    className={styles.dropdown}
                    menuClassName={styles.dropdownMenu}
                    controlClassName={styles.dropdownControl}
                    placeholderClassName={styles.dropdownPlaceholder}
                    arrowClassName={styles.dropdownArrow}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    options={options}
                    {...rest}
                />
                <ErrorHint errorText={errorText} />
            </div>
        </>
    );
};

export default Dropdown;
