import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { selectTotalUsers } from '../../../store/selectors/leaderboard';
import EmailSignUp from './EmailSignUp';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles }) => (
  <Button
    onClick={onClick}
    withoutBackground={true}
    highlightType={HighlightType.highlightAuthButton}
    className={styles.submitButton}
    disabledWithOverlay={true}
  >
    {children}
  </Button>
);

const Register = ({ styles }) => {
  // const totalUsers = useSelector(selectTotalUsers);

  const { initGoogleLogin, initFacebookLogin } = useSocialLogins();

  const [showEmailSignUp, setShowEmailSignup] = useState(false);
  
  return (
    <>
      <h2 className={styles.title}>Sign Up</h2>
      {/* <h3 className={styles.totalCount}>
        {totalUsers}/5000 slots available
        <span className={styles.underline}></span>
      </h3> */}
      {showEmailSignUp ? (
        <>
          <button
            className={styles.backToSignupOptions}
            onClick={() => setShowEmailSignup(false)}
          >
            Sign up using a different method
          </button>
          <EmailSignUp styles={styles} />
        </>
      ) : (
        <div className={styles.signUpOptions}>
          <LoginButton styles={styles} onClick={() => setShowEmailSignup(true)}>
            Sign up with e-mail
          </LoginButton>
          <LoginButton styles={styles} onClick={initGoogleLogin}>
            Sign in with Google
          </LoginButton>
          <LoginButton styles={styles} onClick={initFacebookLogin}>
            Sign in with Facebook
          </LoginButton>
        </div>
      )}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
