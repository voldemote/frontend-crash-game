import { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { FormGroup, InputLabel } from '../../Form';
import InputBox from 'components/InputBox';
import DropdownComplex from '../../DropdownComplex';
import Button from '../../Button';
import BirthdayField from '../../BirthdayField';
import CheckBox from 'components/CheckBox';
import HighlightType from '../../Highlight/HighlightType';
import { COUNTRIES, NOT_ALLOWED_COUNTRIES } from 'constants/Countries';
import ReactTooltip from 'react-tooltip';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const EmailSignUp = ({ styles, signUp, errorState }) => {

  let fooRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let pwConfirmRef = useRef(null);
  let acceptRef = useRef(null);
  let genericRef = useRef(null);
  let birthRef = useRef(null);
  let countryRef = useRef(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [email, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState();
  const [legalAuthorizationAgreed, setLegalAuthorizationAgreed] =
    useState(false);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();

    if (errorState) {
      setSubmitInProgress(false);
      fooRef.current = genericRef;
      setError(errorState);
      ReactTooltip.show(fooRef);
      handleReCaptchaVerify();
    }

    return () => {
      setError(null);
    };
  }, [errorState, fooRef]);

  const birthdayIsValid = () => {
    const currentYear = new Date().getFullYear();
    const isOver18 =
      currentYear - birthYear > 17 && currentYear - birthYear < 100;
    return (
      birthDay >= 1 &&
      birthDay <= 31 &&
      birthMonth >= 1 &&
      birthMonth <= 12 &&
      isOver18
    );
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return;

    const token = await executeRecaptcha('join');
    if (!token) return handleReCaptchaVerify();

    setRecaptchaToken(token);
  }, [executeRecaptcha]);

  const emailIsValid = () => {
    const regExpression = /^[a-z0-9+._-]+@[a-z0-9+._-]+$/;
    return regExpression.test(String(email).toLowerCase());
  };

  const passwordIsValid = () => {
    return password && password.length >= 8 && password.length <= 255;
  };

  const passwordsMatch = () => {
    return passwordConfirmation && password === passwordConfirmation;
  };

  const onConfirm = () => {
    const error = validateInput();
    if (error) return;
    setSubmitInProgress(true);

    const birthDate = `${birthMonth}/${birthDay}/${birthYear}`;
    const refLocalStorage = localStorage.getItem('urlParam_ref');
    signUp({
      email,
      password,
      passwordConfirm: passwordConfirmation,
      birth: birthDate,
      country: country?.value ? country.value : country,
      ref: refLocalStorage,
      recaptchaToken,
    });
  };

  const validateInput = (options) => {
    let error;
    if (!legalAuthorizationAgreed) {
      error = 'Confirm that you agree with Terms and Conditions';
      fooRef = acceptRef;
    }
    if (!birthdayIsValid()) {
      error = 'You need to be at least 18 years old to use the platform';
      fooRef = birthRef;
    }
    if (!passwordsMatch()) {
      error = 'Passwords do not match';
      fooRef = pwConfirmRef;
    }
    if (!passwordIsValid()) {
      error = 'Your password needs to be 8 characters long';
      fooRef = pwRef;
    }

    if (!emailIsValid()) {
      error = 'Not a valid email address';
      fooRef = emailRef;
    }
    if (emailIsValid() && options && options.emailOnly) {
      error = undefined;
      ReactTooltip.hide(emailRef);
    }

    setError(error);
    if (error) {
      ReactTooltip.show(fooRef);
    }

    return error;
  };

  const renderBirthdayInputFields = () => {
    return (
      <FormGroup
        className={styles.formGroup}
        data-tip
        ref={(ref) => (birthRef = ref)}
        data-event="none"
        data-event-off="dblclick"
      >
        <InputLabel className={styles.inputLabel}>
          Please enter your date of birth:
        </InputLabel>
        <div className={styles.inputForm}>
          <BirthdayField
            className={styles.birthInputBox}
            placeholder="DD"
            maxValue={31}
            value={birthDay}
            setValue={setBirthDay}
          />
          <BirthdayField
            className={styles.birthInputBox}
            placeholder="MM"
            maxValue={12}
            value={birthMonth}
            setValue={setBirthMonth}
          />
          <BirthdayField
            className={styles.birthInputBox}
            placeholder="YYYY"
            maxValue={2050}
            value={birthYear}
            setValue={setBirthYear}
          />
        </div>
      </FormGroup>
    );
  };

  const renderCountryInputField = () => {
    return (
      <div ref={(ref) => (countryRef = ref)} className={styles.formGroup}>
        <InputLabel className={styles.inputLabel}>
          Select your country
        </InputLabel>
        <div className={styles.inputForm}>
          <DropdownComplex
            options={COUNTRIES}
            placeholder={''}
            setValue={setCountry}
            value={country}
            className={styles.select}
            ref={(ref) => (countryRef = ref)}
          />
        </div>
      </div>
    );
  };

  const renderLegalAuthorizationAgreementCheckBox = () => {
    const legalAuthorizationAgreementText = (
      <p
        ref={(ref) => (acceptRef = ref)}
        data-tip
        data-event="none"
        data-event-off="dblclick"
        className={styles.authenticationLegalAuthorizationAgreementText}
      >
        I have read and agree to the{' '}
        <a
          href="https://files.wallfair.io/wallfair_t_and_c.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions
        </a>
      </p>
    );
    const notAllowed = NOT_ALLOWED_COUNTRIES.findIndex(
      (c) => c.value === country?.value || c.value === country
    );
    return !birthdayIsValid() ? (
      <span className={styles.errorText}>
        You need to be above 18 years old in order to use this system
      </span>
    ) : notAllowed >= 0 ? (
      <span className={styles.errorText}>
        Users in this country are currently unable to access Wallfair services.
      </span>
    ) : (
      <CheckBox
        className={styles.authenticationLegalAuthorizationAgreementCheckBox}
        checked={legalAuthorizationAgreed}
        setChecked={setLegalAuthorizationAgreed}
        text={legalAuthorizationAgreementText}
      />
    );
  };

  return (
    <form
      className={styles.authenticationInputBoxContainer}
      onSubmit={onConfirm}
    >
      {errorState && (
        <div
          ref={(ref) => (genericRef = ref)}
          data-tip
          data-event="none"
          data-event-off="dblclick"
          className={styles.errorBox}
        >
          {errorState}
        </div>
      )}

      <ReactTooltip
        getContent={() => error}
        place="bottom"
        effect="solid"
        type="error"
        backgroundColor={'#ff0000'}
        className={styles.stepsTooltipError}
      />

      <FormGroup
        className={styles.formGroup}
        data-tip
        ref={(ref) => (emailRef = ref)}
        data-event="none"
        data-event-off="dblclick"
      >
        <InputLabel className={styles.inputLabel}>E-Mail address</InputLabel>
        <InputBox
          type="email"
          className={styles.inputBox}
          placeholder="john.doe@gmail.com"
          value={email}
          disabled={submitInProgress}
          setValue={(e) => {
            setInputEmail(e.trim().toLowerCase());
          }}
          onConfirm={onConfirm}
          onBlur={() => validateInput({ emailOnly: true })}
        />
      </FormGroup>
      <FormGroup
        className={styles.formGroup}
        data-tip
        ref={(ref) => (pwRef = ref)}
        data-event="none"
        data-event-off="dblclick"
      >
        <InputLabel className={styles.inputLabel}>Password</InputLabel>
        <InputBox
          type="password"
          className={styles.inputBox}
          placeholder="***********"
          value={password}
          setValue={setPassword}
          disabled={submitInProgress}
          onConfirm={onConfirm}
        />
      </FormGroup>
      <FormGroup
        className={styles.formGroup}
        data-tip
        ref={(ref) => (pwConfirmRef = ref)}
        data-event="none"
        data-event-off="dblclick"
      >
        <InputLabel className={styles.inputLabel}>Confirm Password</InputLabel>
        <InputBox
          type="password"
          className={styles.inputBox}
          placeholder="***********"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
          disabled={submitInProgress}
          onConfirm={onConfirm}
        />
      </FormGroup>

      {renderBirthdayInputFields()}
      {renderCountryInputField()}
      {renderLegalAuthorizationAgreementCheckBox()}

      <Button
        onClick={onConfirm}
        withoutBackground={true}
        highlightType={HighlightType.highlightAuthButton}
        className={styles.submitButton}
        disabled={submitInProgress || !legalAuthorizationAgreed}
        disabledWithOverlay={true}
      >
        <span>Sign Up</span>
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authentication.loading,
    errorState: state.authentication.error,
    popupVisible: state.popup.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => {
      dispatch(AuthenticationActions.signUp(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUp);
