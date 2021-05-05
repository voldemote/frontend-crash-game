import React, { useEffect, useState } from 'react';
import styled, {css} from 'styled-components';

import InputBox from 'components/InputBox';
import StepBar from 'components/StepBar';
import CodeField from 'components/CodeField';
import { NextBtn } from 'themes/CommonStyle';

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
  const [country, setCountry] = useState('49');
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
      <Wrapper>
        <StepBarWrapper>
          <StepBar size={4} step={step}/>
        </StepBarWrapper>

        <Heading dangerouslySetInnerHTML={{ __html: titleList.find((item) => (item.id === step)).text}} />

        <Description step={step}>
          {descriptionList.find((item) => (item.id === step)).text}
        </Description>

        <InputBoxWrapper step={step}>
          {step === 0 &&
            <InputBox
              type="number"
              hasCountry={true}
              placeholder="phone number"
              setValue={setPhoneNumber}
              value={phoneNumber}
              country={country}
              setCountry={setCountry}
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
      </Wrapper>

      <ConfirmButton onClick={onConfirm}>{confirmBtnList.find((item) => (item.id === step)).text}</ConfirmButton>
    </Background>
  );
};

// Styled components
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 30px;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    padding: 40px 20px;
  }
`;

const StepBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 0 62px;
  width: 100%;
`;

const Heading = styled.p`
  margin-top: 50px;
  width: 100%;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.bold};
  font-size: 36px;
  line-height: 39.6px;
  letter-spacing: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    font-size: 30px;
    line-height: 35px;
  }
`;

const Description = styled.p`
  margin-top: 30px;
  padding-right: 40px;
  width: 100%;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  
  ${props => props.step !== 2 && css`
    margin-top: 30px;
  `}
  
  ${props => props.step === 2 && css`
    margin-top: 65px;
  `}
`;

const InputBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  
  ${props => props.step === 0 && css`
    margin-top: 55px;
  `}
  
  ${props => props.step === 1 && css`
    margin-top: 40px;
  `}
  
  ${props => props.step === 2 && css`
    margin-top: 10px;
  `}
  
  ${props => props.step === 3 && css`
    margin-top: 68px;
  `}
`;

const Label = styled.p`
  margin-top: 41px;
  width: 100%;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0;
  text-align: center;
  opacity: 0.246;
`;

const Resend = styled.span`
  margin-top: 1px;
  width: 100%;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  text-align: center;
  
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const ConfirmButton = styled(NextBtn)`
  margin-bottom: 200px;
  width: 300px;
  
  @media (max-width: ${props => props.theme.breakpoints.xs}px) {
    width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    margin-bottom: 50px;
  }
`;

export default Authentication;
