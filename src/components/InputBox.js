import React from 'react';
import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

import xCircle from 'data/icons/x-circle.svg';

const InputBox = ({type, placeholder, country, setCountry, hasCountry, value, setValue}) => {

  return (
    <InputWrapper>
      {hasCountry &&
        <PhoneInput
          containerStyle={{display: 'flex', alignItems: 'center', width: 100}}
          inputStyle={{ width: 100, height: 40, backgroundColor: '#f1f2f6', fontSize: 16, outline: 'none', border: 'none' }}
          dropdownStyle={{height: 300, width: 200, overflowY: 'auto', backgroundColor: 'white', borderRadius: 20}}
          searchStyle={{width: 140}}
          value={country}
          inputProps={{ name: 'phoneNumber' }}
          onChange={(country) => setCountry(country)}
          enableClickOutside={true}
          enableSearch={true}
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
  background-color: ${props => props.theme.colors.gray_light};
`;

const Input = styled.input`
  flex: 1;
  margin-right: 20px;
  border: none;
  min-width: 100px!important;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.gray_light};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  
  &:focus {
    outline: none;
  }
`;

const InputDeleteIcon = styled.img`
  position: absolute;
  right: 17px;
  top: 17px;
  width: 25px;
  height: 25px;
  
  &:hover {
    cursor: pointer;
  }
`;

export default InputBox;
