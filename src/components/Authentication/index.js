import AuthState                 from '../../constants/AuthState';
import CodeInputFields           from '../CodeInputFields';
import InputBox                  from '../InputBox';
import Link                      from '../Link';
import Routes                    from '../../constants/Routes';
import StepsContainer            from '../StepsContainer';
import styles                    from './styles.module.scss';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect }               from 'react-redux';
import { requestSms }            from '../../store/actions/authentication';
import { useEffect, useState }   from 'react';
import { useIsMount }            from '../hoc/useIsMount';

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
    { id: 2, text: null },
    { id: 3, text: null },
];

// Array of Button texts for the different signup steps
const confirmBtnList = [
    { id: 0, text: 'Send verification code' },
    { id: 1, text: 'Verify' },
    { id: 2, text: 'Go to last step' },
    { id: 3, text: 'Start trading!' },
];

const codeFieldLength = 6;

const Authentication = ({ authState, requestSms, verifySms, setName, setEmail, loading }) => {
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

    const isMount = useIsMount();

    const [country, setCountry]         = useState('49');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode]               = useState([]);
    const [firstName, setFirstName]     = useState('');
    const [email, setInputEmail]        = useState('');
    const [error, setError]             = useState(null);

    const phoneNumberIsValid = () => {
        return country && phoneNumber && phoneNumber.length > 3;
    };

    const codeIsValid = () => {
        return code.length === codeFieldLength;
    };

    const emailIsValid = () => {
        return email && email.length >= 4;
    };

    const nameIsValid = () => {
        return firstName && firstName.length >= 3;
    };

    const validateInput = () => {
        switch (step) {
            case 0:
                if (phoneNumberIsValid()) {
                    setError(null);
                } else {
                    setError('Please enter a valid phone number!');
                }

                break;
            case 1:
                if (codeIsValid()) {
                    setError(null);
                } else {
                    setError('Please enter a valid code!');
                }

                break;
            case 2:
                if (nameIsValid()) {
                    setError(null);
                } else {
                    setError('Please enter your name!');
                }

                break;
            case 3:
                if (emailIsValid()) {
                    setError(null);
                } else {
                    setError('Please enter a valid email!');
                }

                break;
        }
    };

    useEffect(
        () => {
            if (!isMount) {
                validateInput();
            }
        },
        [country, phoneNumber, code, firstName],
    );

    const resendRequestSms = () => {
        requestSms();
    };

    const onConfirm = () => {
        validateInput();

        switch (step) {
            case 0:
                if (phoneNumberIsValid()) {
                    const phone = country + phoneNumber;

                    requestSms({ phone });
                }

                break;

            case 1:
                if (codeIsValid()) {
                    const smsToken = code;

                    verifySms({ smsToken });
                }

                break;
            case 2:
                if (nameIsValid()) {
                    const name = firstName;

                    setName({ name });
                }

                break;
            case 3:
                if (emailIsValid()) {
                    setEmail({ email });
                }

                break;
        }
    };

    const getAuthenticationContentDescriptionStyle = () => {
        if (step !== 2) {
            return {
                marginTop: 25,
            };
        }

        return {
            marginTop: 65,
        };
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

    const renderDescription = () => {
        let description = descriptionList.find(
            (item) => item.id === step,
        );

        if (description) {
            description = description.text;
        }

        if (description && description.length) {
            return (
                <p
                    className={styles.authenticationDescription}
                    style={getAuthenticationContentDescriptionStyle()}
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
            );
        }

        return null;
    };

    const renderInputBoxes = () => {
        return (
            <div
                className={styles.authenticationInputBoxContainer}
            >
                {step === 0 && (
                    <InputBox
                        type="number"
                        hasCountry={true}
                        placeholder="phone number"
                        errorText={error}
                        setValue={setPhoneNumber}
                        value={phoneNumber}
                        country={country}
                        setCountry={setCountry}
                    />
                )}
                {step === 1 && (
                    <CodeInputFields
                        fields={codeFieldLength}
                        required={true}
                        autoFocus={true}
                        onComplete={onConfirm}
                        onChange={setCode}
                    />
                )}
                {step === 2 && (
                    <InputBox
                        invitationText={'Call me'}
                        errorText={error}
                        placeholder="John"
                        value={firstName}
                        setValue={setFirstName}
                    />
                )}
                {step === 3 && (
                    <InputBox
                        errorText={error}
                        placeholder="john.doe@gmail.com"
                        value={email}
                        setValue={setInputEmail}
                    />
                )}
            </div>
        );
    };

    const renderTermsAgreement = () => {
        return (
            <p className={styles.authenticationTermsAgreement}>
                By continuing I accept the <Link to={Routes.termsAndConditions}>
                Terms and Conditions
            </Link> and <Link to={Routes.privacyPolicy}>
                Privacy Policy
            </Link>.
                Also I confirm that I am over 18 years old.
            </p>
        );
    };

    const getButtonContent = () => {
        const buttonContent = confirmBtnList.find(
            (item) => item.id === step,
        ).text;

        return buttonContent;
    };

    const getHeadline = () => {
        let headline = titleList.find(
            (item) => item.id === step,
        );

        if (headline) {
            headline = headline.text;
        }

        return headline;
    };

    return (
        <StepsContainer
            size={4}
            step={step}
            buttonContent={getButtonContent()}
            headline={getHeadline()}
            buttonDesktopMargin={true}
            onButtonClick={onConfirm}
            buttonDisabled={loading}
            renderFooter={renderTermsAgreement}
        >
            {renderDescription()}
            {renderInputBoxes()}
            {renderResendCodeContainer()}
        </StepsContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authState: state.authentication.authState,
        loading:   state.authentication.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestSms: (phone) => {
            dispatch(AuthenticationActions.requestSms(phone));
        },
        verifySms:  (smsToken) => {
            dispatch(AuthenticationActions.verifySms(smsToken));
        },
        setName:    (name) => {
            dispatch(AuthenticationActions.setName(name));
        },
        setEmail:   (email) => {
            dispatch(AuthenticationActions.setEmail(email));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Authentication);
