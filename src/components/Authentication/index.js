import AuthState                from '../../constants/AuthState';
import Button                   from '../Button';
import ButtonTheme              from '../Button/ButtonTheme';
import CodeInputFields          from '../CodeInputFields';
import InputBox                 from '../InputBox';
import StepBar                  from '../StepBar';
import styles                   from './styles.module.scss';
import { AuthorizationActions } from '../../store/actions/authorization';
import { connect }              from 'react-redux';
import { requestSms }           from '../../store/actions/authorization';
import { useEffect, useState }  from 'react';

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
            }
        };

        validation();
    });

    const resendRequestSms = () => {
        requestSms();
    };

    // Function to handle the step bar
    const onConfirm = () => {
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

    const getAuthenticationContentDescriptionStyle = () => {
        if (step !== 2) {
            return {
                marginTop: 30,
            };
        }

        return {
            marginTop: 65,
        };
    };

    const getInputBoxContainerStyle = () => {
        let marginTop = null;

        switch (step) {
            case 0:
            case 1:
                marginTop = 40;

                break;
            case 2:
                marginTop = 10;

                break;
            case 3:
                marginTop = 68;

                break;
        }

        return {
            marginTop: marginTop,
        };
    };

    const renderButton = () => {
        if (authState !== AuthState.LOGGED_IN) {
            return (
                <Button
                    theme={ButtonTheme.authenticationScreenButton}
                    onClick={onConfirm}
                >
                    {confirmBtnList.find((item) => item.id === step).text}
                </Button>
            );
        }

        return null;
    };

    const renderResendCodeContainer = () => {
        if (step === 1) {
            return (
                <>
                    <p className={styles.authenticationResendCodeLabel}>
                        Didn't you receive any code?
                    </p>
                    <span
                        className={styles.authenticationResendCodeAction}
                        onClick={resendRequestSms}
                    >
                        Resend a new code
                    </span>
                </>
            );
        }

        return null;
    };

    const renderInputBoxes = () => {
        return (
            <div
                className={styles.authenticationInputBoxContainer}
                style={getInputBoxContainerStyle()}
            >
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
            </div>
        );
    };

    return (
        <div className={styles.authenticationContainer}>
            <div className={styles.authenticationContentContainer}>
                <div className={styles.authenticationStepBarContainer}>
                    <StepBar
                        size={4}
                        step={step}
                    />
                </div>
                <p
                    className={styles.authenticationHeadline}
                    dangerouslySetInnerHTML={{
                        __html: titleList.find(
                            (item) => item.id === step,
                        ).text,
                    }}
                />
                <p
                    className={styles.authenticationDescription}
                    style={getAuthenticationContentDescriptionStyle()}
                    dangerouslySetInnerHTML={{
                        __html: descriptionList.find((item) => item.id === step).text,
                    }}
                />
                {renderInputBoxes()}
                {renderResendCodeContainer()}
            </div>
            {renderButton()}
        </div>
    );
};

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
