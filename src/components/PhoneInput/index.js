import React from 'react';
import style from './styles.module.scss';

const PhoneInput = ({ value, inputProps, onChange, enableClickOutside, enableSearch }) => {
    return (
        <PhoneInput
            containerStyle={style.phoneInputContainer}
            inputStyle={style.phoneInput}
            dropdownStyle={style.phoneInputDropdown}
            searchStyle={style.phoneInputSearch}
            value={value}
            inputProps={inputProps}
            onChange={onChange}
            enableClickOutside={enableClickOutside}
            enableSearch={enableSearch}
        />
    );
};

export default PhoneInput;
