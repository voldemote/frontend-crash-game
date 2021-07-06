import AuthState                 from '../../constants/AuthState';
import CodeInputFields           from '../CodeInputFields';
import InputBox                  from '../InputBox';
import Link                      from '../Link';
import Routes                    from '../../constants/Routes';
import StepsContainer            from '../StepsContainer';
import styles                    from './styles.module.scss';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect }               from 'react-redux';

import { useEffect, useState }   from 'react';
import { useIsMount }            from '../hoc/useIsMount';
import _                         from 'lodash';
import CheckBox                  from '../CheckBox';
import React                     from 'react';

// Array of Headings for the different signup steps
const titleList = [
    { id: 0, text: `Verify your <br /> phone number` },
    { id: 1, text: `Code <br /> Verification` },
    { id: 2, text: `How should we <br /> call you?` },
    { id: 3, text: `What about your <br /> E-Mail address?` },
];

// Array of Descriptions for the different signup steps
const descriptionList = [
    {
        id:   0,
        text: `We’ll send you an SMS with a 6-digit-code <br /> to verify your number.`,
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

const Authentication = ({ authState, step, requestSms, verifySms, setName, setEmail, phoneNumber, setPhoneNumber, country, setCountry, loading }) => {
    const isMount = useIsMount();

    const [code, setCode]                                         = useState([]);
    const [firstName, setFirstName]                               = useState('');
    const [username, setUsername]                                 = useState('');
    const [email, setInputEmail]                                  = useState('');
    const [legalAuthorizationAgreed, setLegalAuthorizationAgreed] = useState(false);
    const [error, setError]                                       = useState(null);

    const phoneNumberIsValid = () => {
        return country && phoneNumber && phoneNumber.length > 6;
    };

    const codeIsValid = () => {
        return code.length === codeFieldLength;
    };

    const emailIsValid = () => {
        return email && email.length >= 6;
    };

    const nameIsValid = () => {
        return firstName && firstName.length >= 3;
    };

    const usernameIsValid = () => {
        return username && username.length >= 3;
    };

    const validateInput = () => {
        // TODO: Suggestion: having either a string or an array for the type of error is not very stable code, we should fix that
        // also using a validation library like ZOD and a form library like react-final-form would make this a bit more consistent and reliable across forms
        let error = null;

        switch (step) {
            case 0:
                if (!phoneNumberIsValid()) {
                    error = 'Please enter a valid phone number!';
                }

                break;

            case 1:
                if (!codeIsValid()) {
                    error = 'Please enter a valid code!';
                }

                break;

            case 2:
                error = [];

                if (!usernameIsValid()) {
                    error[0] = 'Please enter a valid username!';
                }

                if (!nameIsValid()) {
                    error[1] = 'Please enter your name!';
                }

                break;

            case 3:
                error = [];

                if (!emailIsValid()) {
                    error[0] = 'Please enter a valid email!';
                }

                if (!legalAuthorizationAgreed) {
                    error[1] = 'Please agree that you\'re legally authorized!';
                }

                break;
        }

        setError(error);
    };

    useEffect(
        () => {
            if (!isMount) {
                validateInput();

                if (step === 1 && codeIsValid()) {
                    onConfirm();
                }
            }
        },
        [country, code],
    );

    const resendRequestSms = () => {
        requestSms();
    };

    const onConfirm = () => {
        validateInput();

        switch (step) {
            case 0:
                if (phoneNumberIsValid()) {
                    resendRequestSms();
                }

                break;

            case 1:
                if (codeIsValid()) {
                    const smsToken = code;

                    verifySms({ smsToken });
                }

                break;
            case 2:
                if (nameIsValid() && usernameIsValid()) {
                    setName(firstName, username);
                }

                break;
            case 3:
                if (emailIsValid() && legalAuthorizationAgreed) {
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
                        onConfirm={onConfirm}
                    />
                )}
                {step === 1 && (
                    <CodeInputFields
                        fields={codeFieldLength}
                        required={true}
                        autoFocus={true}
                        onChange={setCode}
                    />
                )}
                {step === 2 && (
                    <>
                        <InputBox
                            invitationText={'My name is...'}
                            errorText={_.get(error, 1)}
                            placeholder="John"
                            value={firstName}
                            setValue={setFirstName}
                        />
                        <InputBox
                            containerClassName={styles.usernameInputBox}
                            invitationText={'But you can call me...'}
                            errorText={_.get(error, 0)}
                            placeholder="john2021"
                            value={username}
                            setValue={setUsername}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <InputBox
                            errorText={_.get(error, 0)}
                            placeholder="john.doe@gmail.com"
                            value={email}
                            setValue={setInputEmail}
                        />
                        {renderLegalAuthorizationAgreementCheckBox()}
                    </>
                )}
            </div>
        );
    };

    const renderLegalAuthorizationAgreementCheckBox = () => {
        const legalAuthorizationAgreementText = (
            <p className={styles.authenticationLegalAuthorizationAgreementText}>
                Herewith I confirm to be legally authorized to access and distribute all content displayed in connection with the events I am planning to post and advertise on <Link to={'https://wallfair.io'}>wallfair.io</Link> and indemnify <Link to={'https://wallfair.io'}>wallfair.io</Link> with
                regard to all claims that may arise in connection hereto.
            </p>
        );

        return (
            <CheckBox
                className={styles.authenticationLegalAuthorizationAgreementCheckBox}
                checked={legalAuthorizationAgreed}
                setChecked={setLegalAuthorizationAgreed}
                text={legalAuthorizationAgreementText}
                errorText={_.get(error, 1)}
            />
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
        let buttonContent = confirmBtnList.find(
            (item) => item.id === step,
        );

        if (buttonContent) {
            buttonContent = buttonContent.text;
        }

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
    const authState = state.authentication.authState;
    let step        = 0;

    switch (authState) {
        case AuthState.LOGGED_OUT:
            step = 0;
            break;

        case AuthState.SMS_SENT:
            step = 1;
            break;

        case AuthState.SET_NAME:
            step = 2;
            break;

        case AuthState.SET_EMAIL:
            step = 3;
            break;

        case AuthState.LOGGED_IN:
            step = 4;
            break;

    }

    return {
        step,
        authState,
        loading:     state.authentication.loading,
        phoneNumber: state.authentication.phone,
        country:     state.authentication.country,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestSms:     () => {
            dispatch(AuthenticationActions.requestSms());
        },
        verifySms:      (smsToken) => {
            dispatch(AuthenticationActions.verifySms(smsToken));
        },
        setName:        (name, username) => {
            dispatch(AuthenticationActions.setName({ name, username }));
        },
        setEmail:       (email) => {
            dispatch(AuthenticationActions.setEmail(email));
        },
        setPhoneNumber: (phone) => {
            dispatch(AuthenticationActions.setPhone({ phone }));
        },
        setCountry:     (country) => {
            dispatch(AuthenticationActions.setCountry({ country }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Authentication);
