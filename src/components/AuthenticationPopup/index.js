import classNames from 'classnames';
import Authentication from 'components/Authentication';
import styles from './styles.module.scss';

const AuthenticationPopup = ({ authenticationType, preloadEmailSignUp }) => {

  return (
    <div className={classNames(styles.registration, authenticationType === 'login' && styles.portraitBg)}>
      <h2 className={styles.title}>
        {authenticationType === 'register' ? 'Final Step' : 'Login'}
      </h2>
      <div className={classNames(styles.form, authenticationType === 'login' && styles.loginForm)}>
          <Authentication
            authenticationType={authenticationType}
            preloadEmailSignUp={preloadEmailSignUp}
          />
      </div>
    </div>
  );
};

export default AuthenticationPopup;
