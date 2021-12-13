import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { PopupActions } from '../../../store/actions/popup';
import { FormGroup, InputLabel } from '../../Form';
import InputBox from 'components/InputBox';
import Button from '../../Button';
import CheckBox from 'components/CheckBox';
import HighlightType from '../../Highlight/HighlightType';
import ReactTooltip from 'react-tooltip';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import HighlightTheme from 'components/Highlight/HighlightTheme';
import Routes from 'constants/Routes';
import { Link } from 'react-router-dom';

const EmailSignUp = ({ styles, signUp, errorState, hidePopup, username }) => {

  const fooRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let pwConfirmRef = useRef(null);
  let acceptRef = useRef(null);
  let genericRef = useRef(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [email, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [legalAuthorizationAgreed, setLegalAuthorizationAgreed] =
    useState(false);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [executeRecaptcha]);

  useEffect(() => {
    ReactTooltip.rebuild();


    if (errorState) {
      setSubmitInProgress(false);
      fooRef.current = genericRef;
      setError(errorState);
      ReactTooltip.show(fooRef.current);
      handleReCaptchaVerify();
    } else if(error){
      ReactTooltip.show(fooRef.current);
    } else {
      ReactTooltip.hide();
    }

  }, [errorState, fooRef, error]);

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

  const onConfirm = async () => {
    const error = validateInput();
    if (error) return;
    setSubmitInProgress(true);

    if (!recaptchaToken) { 
      await handleReCaptchaVerify();
    }

    const refLocalStorage = localStorage.getItem('urlParam_ref');
    signUp({
      username,
      email,
      password,
      passwordConfirm: passwordConfirmation,
      ref: refLocalStorage,
      recaptchaToken,
    });

    hidePopup();
  };

  const validateInput = (options) => {
    let formError = null;
    let fieldRef = null;

    if (!emailIsValid()) {
      formError = 'Not a valid email address';
      fieldRef = emailRef.current;
    } else if (!passwordIsValid()) {
      formError = 'Your password needs to be 8 characters long';
      fieldRef = pwRef.current;
    } else if (!passwordsMatch()) {
      formError = 'Passwords do not match';
      fieldRef = pwConfirmRef.current;
    } else if (!legalAuthorizationAgreed) {
      formError = 'Confirm that you agree with Terms and Conditions';
      fieldRef = acceptRef.current;
    }

    setError(formError);
    fooRef.current = fieldRef;

    return formError;
  };

  const renderLegalAuthorizationAgreementCheckBox = () => {
    const legalAuthorizationAgreementText = (
      <p
        ref={(ref) => (acceptRef.current = ref)}
        data-tip
        data-event="none"
        data-event-off="dblclick"
        className={styles.authenticationLegalAuthorizationAgreementText}
      >
        <b>I am above 18 years of age</b> and have read and accepted the{' '}
        <Link
          className={'global-link-style'}
          to={Routes.terms}
          target="_blank"
          rel="noreferrer"
        >
          Terms &amp; Conditions
        </Link>
        {' '}and{' '}
        <Link
          className={'global-link-style'}
          to={Routes.privacy}
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </Link>
      </p>
    );
    return (
      <CheckBox
        className={styles.authenticationLegalAuthorizationAgreementCheckBox}
        checked={legalAuthorizationAgreed}
        setChecked={setLegalAuthorizationAgreed}
        text={legalAuthorizationAgreementText}
      />
    )
  };

  return (
    <form
      className={styles.authenticationInputBoxContainer}
      onSubmit={onConfirm}
    >
      {errorState && (
        <div
          ref={(ref) => (genericRef.current = ref)}
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
      <div className={styles.rowContainer}>
        <div>
          <FormGroup
            className={styles.formGroup}
            data-tip
            rootRef={(ref) => (emailRef.current = ref)}
            data-event="none"
            data-event-off="dblclick"
          >
            <InputLabel className={styles.inputLabel}>
              E-Mail address
            </InputLabel>
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
            rootRef={(ref) => (pwRef.current = ref)}
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
            rootRef={(ref) => (pwConfirmRef.current = ref)}
            data-event="none"
            data-event-off="dblclick"
          >
            <InputLabel className={styles.inputLabel}>
              Confirm Password
            </InputLabel>
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
        </div>
        <div>{renderLegalAuthorizationAgreementCheckBox()}</div>
      </div>
      <Button
        onClick={onConfirm}
        // withoutBackground={true}
        // highlightType={HighlightType.highlightModalButton}
        // highlightTheme={HighlightTheme.fillPink}
        className={styles.submitButton}
        disabled={submitInProgress || !legalAuthorizationAgreed}
        disabledWithOverlay={false}
      >
        Sign Up with E-mail
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authentication.loading,
    errorState: state.authentication.error,
    popupVisible: state.popup.visible,
    username: state.onboarding.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => {
      dispatch(AuthenticationActions.signUp(payload));
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUp);
