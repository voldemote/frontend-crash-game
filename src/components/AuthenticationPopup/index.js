import classNames from 'classnames';
import Authentication from 'components/Authentication';
import styles from './styles.module.scss';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_KEY } from 'constants/Api';


const AuthenticationPopup = ({ authenticationType, preloadEmailSignUp }) => {

  return (
    <div className={classNames(styles.registration, authenticationType === 'login' && styles.portraitBg)}>
      <h2 className={styles.title}>
        {authenticationType === 'register' ? 'Final Step' : 'Login'}
      </h2>
      <div className={classNames(styles.form, authenticationType === 'login' && styles.loginForm)}>
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
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
