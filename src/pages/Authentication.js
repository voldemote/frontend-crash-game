// Imports from React
import { useEffect, useState } from "react";

// Import of components
import InputBox from "../components/Authentication/InputBox";
import StepBar from "../components/Authentication/StepBar";
import ReactCodeInput from "react-verification-code-input";
import "../themes/codeFields.css";

// Imports for styling
import styled, { css } from "styled-components";
import { NextBtn } from "../themes/CommonStyle";

// Array of Headings for the different signup steps
const titleList = [
  { id: 0, text: `Verify your <br /> phone number` },
  { id: 1, text: `Code <br /> Verification` },
  { id: 2, text: `What is your <br /> First Name?` },
  { id: 3, text: `What about your <br /> E-Mail address?` },
];

// Array of Descriptions for the different signup steps
const descriptionList = [
  {
    id: 0,
    text: `We’ll send you a SMS with a 6-digit-code <br /> to verify your number.`,
  },
  { id: 1, text: "Enter your Code here" },
  { id: 2, text: "Call me..." },
  { id: 3, text: "" },
];

// Array of Button texts for the different signup steps
const confirmBtnList = [
  { id: 0, text: "Send verification code" },
  { id: 1, text: "Verify" },
  { id: 2, text: "Go to last step" },
  { id: 3, text: "Start trading!" },
];

const codeFieldLength = 6;

const Authentication = () => {
  // State for the Signup / Login State the user currently is on
  const [step, setStep] = useState(0);

  // State for the Area Code of the users telephone number
  const [country, setCountry] = useState("49");

  // State for the users telephone number
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for the code the user has to input to validate
  const [code, setCode] = useState([]);

  // State for the users First name that has to be given when signing up
  const [firstName, setFirstName] = useState("");

  // State for the users E-Mail Address that has to be given when signing up
  const [email, setEmail] = useState("");

  // State to check the inputs of the user and break the process if something is wrong
  const [confirm, setConfirm] = useState(false);

  // Using useEffect to validate the users Input on all steps
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

  // Function to handle the step bar
  const onConfirm = () => {
    if (step < 3) {
      if (confirm) {
        setStep(step + 1);
        setConfirm(false);
      } else alert("Please fill all field!!!");
    }
  };

  return (
    <StyledAuthentication>
      <AuthenticationContent>
        <AuthenticationContentStepBar>
          <StepBar size={4} step={step} />
        </AuthenticationContentStepBar>
        <AuthenticationContentHeading
          dangerouslySetInnerHTML={{
            __html: titleList.find((item) => item.id === step).text,
          }}
        />
        <AuthenticationContentDescription
          dangerouslySetInnerHTML={{
            __html: descriptionList.find((item) => item.id === step).text,
          }}
        />
        <AuthenticationContentInputBox step={step}>
          {step === 0 && (
            <InputBox
              type="number"
              hasCountry={true}
              placeholder="phone number"
              setValue={setPhoneNumber}
              value={phoneNumber}
              country={country}
              setCountry={setCountry}
            />
          )}
          {step === 1 && (
            <ReactCodeInput
              className="codeFields"
              fields={6}
              required={true}
              autoFocus={true}
              onComplete={(val) => setCode(val)}
            />
          )}
          {step === 2 && (
            <InputBox
              type="text"
              placeholder="John"
              value={firstName}
              setValue={setFirstName}
            />
          )}
          {step === 3 && (
            <InputBox
              type="text"
              placeholder="john.doe@gmail.com"
              value={email}
              setValue={setEmail}
            />
          )}
        </AuthenticationContentInputBox>
        {step === 1 && (
          <>
            <Label>Didn't you receive any code?</Label>
            <Resend>Resend a new code</Resend>
          </>
        )}
      </AuthenticationContent>
      <AuthenticationContentCTA onClick={onConfirm}>
        {confirmBtnList.find((item) => item.id === step).text}
      </AuthenticationContentCTA>
    </StyledAuthentication>
  );
};

// Styled components
const StyledAuthentication = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const AuthenticationContent = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const AuthenticationContentStepBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;

const AuthenticationContentHeading = styled.p`
  width: 100%;
  margin-top: 54px;
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 36px;
  line-height: 39.6px;
  letter-spacing: 0;
  color: ${(props) => props.theme.colors.primary};
`;

const AuthenticationContentDescription = styled.p`
  width: 100%;
  margin-top: 25px;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  color: ${(props) => props.theme.colors.primary};
  ${(props) =>
    props.step !== 2 &&
    css`
      margin-top: 30px;
    `}
  ${(props) =>
    props.step === 2 &&
    css`
      margin-top: 65px;
    `}
`;

const AuthenticationContentInputBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.step === 0 &&
    css`
      margin-top: 40px;
    `}
  ${(props) =>
    props.step === 1 &&
    css`
      margin-top: 40px;
    `}
  ${(props) =>
    props.step === 2 &&
    css`
      margin-top: 10px;
    `}
  ${(props) =>
    props.step === 3 &&
    css`
      margin-top: 68px;
    `}
`;

const Label = styled.p`
  width: 100%;
  margin-top: 41px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0;
  opacity: 0.246;
  color: ${(props) => props.theme.colors.primary};
`;

const Resend = styled.span`
  width: 100%;
  margin-top: 1px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const AuthenticationContentCTA = styled(NextBtn)`
  padding: 0 2rem;
  margin-top: 40px;
  border-radius: 10px;
`;

export default Authentication;
