import 'react-phone-input-2/lib/style.css';
import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import styles from './styles.module.scss';

const PhoneInput = ({
  value,
  inputProps,
  onChange,
  onConfirm,
  enableClickOutside,
  enableSearch,
}) => {
  const getContainerStyle = () => {
    return {
      display: 'flex',
      alignItems: 'center',
      width: 100,
    };
  };

  const getInputStyle = () => {
    return {
      width: 100,
      height: 40,
      backgroundColor: '#f1f2f6',
      fontSize: 16,
      outline: 'none',
      border: 'none',
    };
  };

  const getDropdownStyle = () => {
    return {
      height: 300,
      width: 200,
      overflowY: 'auto',
      backgroundColor: 'white',
      borderRadius: 20,
    };
  };

  const getSearchStyle = () => {
    return {
      width: 140,
    };
  };

  return (
    <ReactPhoneInput
      containerStyle={getContainerStyle()}
      inputStyle={getInputStyle()}
      dropdownStyle={getDropdownStyle()}
      searchStyle={getSearchStyle()}
      placeholder={'+49'}
      buttonClass={styles.flagDropdownButton}
      value={value}
      inputProps={inputProps}
      onChange={onChange}
      enableClickOutside={enableClickOutside}
      enableSearch={enableSearch}
      onEnterKeyPress={onConfirm}
    />
  );
};

export default PhoneInput;
