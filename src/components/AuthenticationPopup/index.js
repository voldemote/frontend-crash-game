import classNames from 'classnames';
import Authentication from 'components/Authentication';
import styles from './styles.module.scss';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_KEY } from 'constants/Api';


const AuthenticationPopup = ({ authenticationType, preloadEmailSignUp }) => {

  return (
    <div
      className={classNames(styles.registration)}
    >
      <div className={styles.form}>
        <GoogleReCaptchaProvider
          reCaptchaKey={RECAPTCHA_KEY}
          scriptProps={{
            async: true,
          }}
        >
          <Authentication
            authenticationType={authenticationType}
            preloadEmailSignUp={preloadEmailSignUp}
          />
        </GoogleReCaptchaProvider>
      </div>
    </div>
  );
};

export default AuthenticationPopup;
