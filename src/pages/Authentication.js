// Imports from React
import { useEffect, useState } from 'react';

// Import of components
import InputBox       from '../components/Authentication/InputBox';
import StepBar        from '../components/StepBar';
import { connect }    from 'react-redux';
import { requestSms } from '../store/actions/authorization';

// Imports for styling
import styled, { css }          from 'styled-components';
import { NextBtn }              from '../themes/CommonStyle';
import CodeInputFields          from '../components/CodeInputFields';
import { AuthorizationActions } from '../store/actions/authorization';
import AuthState                from '../constants/AuthState';

// Array of Headings for the different signup steps
const titleList = [
    { id: 0, text: `Verify your <br /> phone number` },
    { id: 1, text: `Code <br /> Verification` },
    { id: 2, text: `What is your <br /> First Name?` },
    { id: 3, text: `What about your <br /> E-Mail address?` },
    { id: 4, text: `Logged in` },
];

// Array of Descriptions for the different signup steps
const descriptionList = [
    {
        id:   0,
        text: `We’ll send you a SMS with a 6-digit-code <br /> to verify your number.`,
    },
    { id: 1, text: 'Enter your Code here' },
    { id: 2, text: 'Call me...' },
    { id: 3, text: '' },
    { id: 4, text: 'You can start betting now!' },
];

// Array of Button texts for the different signup steps
const confirmBtnList = [
    { id: 0, text: 'Send verification code' },
    { id: 1, text: 'Verify' },
    { id: 2, text: 'Go to last step' },
    { id: 3, text: 'Start trading!' },
];

const codeFieldLength = 6;

const Authentication = ({ authState, requestSms, verifySms, setName, setEmail }) => {
    // State for the Signup / Login State the user currently is on
    const getStepByAuthState = () => {
        switch (authState) {
            case AuthState.LOGGED_OUT:
                return 0;
            case AuthState.SMS_SENT:
                return 1;
            case AuthState.SET_NAME:
                return 2;
            case AuthState.SET_EMAIL:
                return 3;
            case AuthState.LOGGED_IN:
                return 4;
        }
    };

    const step = getStepByAuthState();

    // State for the Area Code of the users telephone number
    const [country, setCountry] = useState('49');

    // State for the users telephone number
    const [phoneNumber, setPhoneNumber] = useState('');

    // State for the code the user has to input to validate
    const [code, setCode] = useState([]);

    // State for the users First name that has to be given when signing up
    const [firstName, setFirstName] = useState('');

    // State for the users E-Mail Address that has to be given when signing up
    const [email, setInputEmail] = useState('');

    // State to check the inputs of the user and break the process if something is wrong
    const [confirm, setConfirm] = useState(false);

    // Using useEffect to validate the users Input on all steps
    useEffect(() => {
        const validation = () => {
            switch (step) {
                case 0:
                    if (country && phoneNumber) {
                        setConfirm(true);
                    } else {
                        setConfirm(false);
                    }
                    break;
                case 1:
                    if (code.length === codeFieldLength) {
                        setConfirm(true);
                    } else {
                        setConfirm(false);
                    }
                    break;
                case 2:
                    if (firstName) {
                        setConfirm(true);
                    } else {
                        setConfirm(false);
                    }
                    break;
                case 3:
                    if (email) {
                        setConfirm(true);
                    } else {
                        setConfirm(false);
                    }
                    break;
                default:
            }
        };
        validation();
    });

    const resendRequestSms = () => {
        requestSms({});
    };

    // Function to handle the step bar
    const onConfirm = () => {
        console.debug(step, confirm);
        if (step <= 3) {
            if (confirm) {
                if (step === 0) {
                    const phone = country + phoneNumber;

                    requestSms({ phone });
                } else if (step === 1) {
                    const smsToken = code;

                    verifySms({ smsToken });
                } else if (step === 2) {
                    const name = firstName;

                    setName({ name });
                } else {
                    setEmail({ email });
                }
            } else {
                alert('Please fill all fields!');
            }
        }
    };

    return (
        <StyledAuthentication>
            <AuthenticationContent>
                <AuthenticationContentStepBar>
                    <StepBar
                        size={4}
                        step={step}
                    />
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
                        <CodeInputFields
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
                            setValue={setInputEmail}
                        />
                    )}
                </AuthenticationContentInputBox>
                {step === 1 && (
                    <>
                        <Label>Didn't you receive any code?</Label>
                        <Resend onClick={resendRequestSms}>Resend a new code</Resend>
                    </>
                )}
            </AuthenticationContent>
            {authState !== AuthState.LOGGED_IN && (
                <AuthenticationContentCTA onClick={onConfirm}>
                    {confirmBtnList.find((item) => item.id === step).text}
                </AuthenticationContentCTA>
            )}
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

function mapStateToProps (state) {
    return {
        authState: state.authorization.authState,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestSms: (phone) => {
            dispatch(AuthorizationActions.requestSms(phone));
        },
        verifySms:  (smsToken) => {
            dispatch(AuthorizationActions.verifySms(smsToken));
        },
        setName:    (name) => {
            dispatch(AuthorizationActions.setName(name));
        },
        setEmail:   (email) => {
            dispatch(AuthorizationActions.setEmail(email));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Authentication);
