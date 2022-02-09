import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import Button from '../Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { OnboardingActions } from 'store/actions/onboarding';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';
import Routes from 'constants/Routes';

const PhonePopup = ({
  hidePopup = () => {},
  showOnboardingFlowNext,
}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState('49');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const len = phoneNumber?.length;
    // if(len < 3 || len > 25){
    //   setErrorMessage('Username length should be from 3 to 25 characters long');
    // } else {
      setErrorMessage('');
    // }
  }, [phoneNumber]);

  const sendVerification = async () => {
    let response;
    try {
      // response = await checkPhoneNumber(phoneNumber);
    } catch (err) {
      console.error('checkPhoneNumber err', err);
    }

    // const isUnique = _.get(response, 'data.isUnique', false);

    // if (isUnique) {
      setErrorMessage('');
      showOnboardingFlowNext(phoneNumber)
      hidePopup();
    // } else {
    //   setErrorMessage(
    //     <div>
    //       Problem <b>"{phoneNumber}"</b>.
    //     </div>
    //   );
    // }
  };

  // const skipUsername = () => {
  //   hidePopup();
  //   showOnboardingFlowNext('');
  // };

  return (
    <div className={styles.phonePopup}>
      <StepBar step={2} size={4} />
      <h2 className={styles.title}>Verify your phone number</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          We'll send you a SMS with a 6-digit code to verify your number
        </div>
        <InputBox
          className={styles.inputBox}
          placeholder="123 456 789"
          value={phoneNumber}
          setValue={setPhoneNumber}
          // onConfirm={onConfirm}
          hasCountry={true}
          setCountry={setCountry}
          country={country}
        />
        {!_.isEmpty(errorMessage) && (
          <div className={styles.errorHandLing}>{errorMessage}</div>
        )}
        <div className={styles.buttons}>

          <Button
            onClick={sendVerification}
            withoutBackground={true}
            className={styles.button}
            disabledWithOverlay={false}
            disabled={!!errorMessage}
            theme={ButtonTheme.primaryButtonXL}
          >
            Send verification code
          </Button>
        </div>
        <span className={styles.terms}>By continuing I accept the <a href={Routes.terms} target="_blank" rel="noreferrer">Terms and Conditions</a> and <a href={Routes.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>. Also I confirm that I am over 18 years old.</span>
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    showOnboardingFlowNext: phoneNumber => {
      dispatch(
        OnboardingActions.next({
            payload: {phoneNumber}
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(PhonePopup);
