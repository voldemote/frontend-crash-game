import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import lightModeLogo from '../data/images/logo-lightmode.svg';
import InputBox from '../components/InputBox';
import StepBar from '../components/StepBar';
import CodeField from '../components/CodeField';

const titleList = [
  {id: 0, text: `Verify your <br /> phone number`},
  {id: 1, text: `Code <br /> Verification`},
  {id: 2, text: `What is your <br /> First Name?`},
  {id: 3, text: `What about your <br /> E-Mail address?`},
];

const descriptionList = [
  {id: 0, text: 'We’ll send you a SMS with a 6-digit-code to verify your number.'},
  {id: 1, text: 'Enter your Code here'},
  {id: 2, text: 'Call me...'},
  {id: 3, text: ''},
];

const confirmBtnList = [
  {id: 0, text: 'Send verification code'},
  {id: 1, text: 'Verify'},
  {id: 2, text: 'Go to last step'},
  {id: 3, text: 'Start trading!'},
];

const codeFieldLength = 6;

const Authentication = () => {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const validation = () => {
      switch (step) {
        case 0:
          if (country && phoneNumber) setConfirm(true);
          else setConfirm(false);
          break;
        case 1:
          if (code.length === codeFieldLength) setConfirm(true);
          else setConfirm(false);
          break;
        case 2:
          if (firstName) setConfirm(true);
          else setConfirm(false);
          break;
        case 3:
          if (email) setConfirm(true);
          else setConfirm(false);
          break;
        default:
      }
    };

    validation();
  });

  const onConfirm = () => {
    if (step < 3) {
      if (confirm) {
        setStep(step + 1);
        setConfirm(false);
      } else alert('Please fill all field!!!');
    }
  };

  return (
    <Background>
      <Logo src={lightModeLogo} alt="" />

      <StepBarWrapper>
        <StepBar size={4} step={step}/>
      </StepBarWrapper>

      <Wrapper>
        <Heading dangerouslySetInnerHTML={{ __html: titleList.find((item) => (item.id === step)).text}} />

        <Description>
          {descriptionList.find((item) => (item.id === step)).text}
        </Description>

        <InputBoxWrapper>
          {step === 0 &&
            <InputBox
              type="number"
              hasCountry={true}
              placeholder="phone number"
              setValue={setPhoneNumber}
              value={phoneNumber}
              phone={country}
              setPhone={setCountry}
            />
          }

          {step === 1 &&
            <CodeField fieldLength={codeFieldLength} value={code} setValue={setCode}/>
          }

          {step === 2 &&
            <InputBox
              type="text"
              placeholder="John"
              value={firstName}
              setValue={setFirstName}
            />
          }

          {step === 3 &&
            <InputBox
              type="text"
              placeholder="john.doe@gmail.com"
              value={email}
              setValue={setEmail}
            />
          }
        </InputBoxWrapper>

        {step === 1 && (
          <>
            <Label>Didn't you received any code?</Label>

            <Resend>Resend a new code</Resend>
          </>
        )}

        <ConfirmButton onClick={onConfirm}>{confirmBtnList.find((item) => (item.id === step)).text}</ConfirmButton>
      </Wrapper>
    </Background>
  );
};

// Styled components
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  width: 100%;
`;

const Logo = styled.img`
  margin-bottom: 30px;
  width: 250px;
`;

const StepBarWrapper = styled.div`
  margin-top: 30px;
  width: 350px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 40%;
  min-width: 350px;
`;

const Heading = styled.p`
  width: 100%;
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: normal;
`;

const Description = styled.p`
  margin-top: 30px;
  width: 100%;
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
`;

const InputBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  min-width: 350px;
`;

const Label = styled.p`
  margin-top: 30px;
  width: 100%;
  color: #0e092773;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
`;

const Resend = styled.span`
  width: 100%;
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  
  &:hover {
    cursor: pointer;
    color: #0e092773;
  }
`;

const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  padding: 15px;
  width: 300px;
  background-color: #E2FF54;
  color: black;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    cursor: pointer;
    background-color: #f6ff54;
  }
`;

export default Authentication;
