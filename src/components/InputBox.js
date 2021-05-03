import React from 'react';
import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

import xCircle from '../data/icons/x-circle.svg';

const InputBox = ({type, placeholder, phone, setPhone, hasCountry, value, setValue}) => {

  return (
    <InputWrapper>
      {hasCountry &&
        <PhoneInput
          containerStyle={{display: 'flex', alignItems: 'center', width: 120}}
          inputStyle={{ width: 120, height: 40, backgroundColor: '#f1f2f6', fontSize: 12, outline: 'none', border: 'none' }}
          dropdownStyle={{height: 300, width: 200, overflowY: 'auto', backgroundColor: 'white', borderRadius: 20}}
          country='no'
          value={phone}
          inputProps={{ name: 'phoneNumber' }}
          onChange={(phone) => setPhone(phone)}
          enableClickOutside={true}
        />
      }

      <Input placeholder={placeholder} type={type} value={value} min={0} onChange={(e) => setValue(e.target.value)}/>
      <InputDeleteIcon src={xCircle} alt="x" onClick={() => setValue('')}/>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 15px 20px;
  width: 100%;
  height: 60px;
  background-color: #f1f2f6;
`;

const Input = styled.input`
  flex: 1;
  margin: 0 20px;
  border: none;
  min-width: 100px!important;
  color: #0e0927;
  background-color: #f1f2f6;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  
  &:focus {
    outline: none;
  }
`;

const InputDeleteIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 22px;
  
  &:hover {
    cursor: pointer;
  }
`;

export default InputBox;
