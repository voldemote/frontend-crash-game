import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';
import PopupTheme from 'components/Popup/PopupTheme';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { selectTotalUsers } from '../../../store/selectors/leaderboard';
import AuthenticationType from '../AuthenticationType';
import EmailSignUp from './EmailSignUp';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles }) => (
  <Button
    onClick={onClick}
    withoutBackground={true}
    highlightType={HighlightType.highlightModalButton}
    className={styles.signInButton}
    disabledWithOverlay={true}
  >
    {children}
  </Button>
);

const Register = ({ styles, openLoginModal }) => {
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
            <Icon
              iconType={IconType.email}
              iconTheme={IconTheme.black}
              className={styles.buttonIcon}
            />
            Sign up with email
          </LoginButton>
          <LoginButton styles={styles} onClick={initGoogleLogin}>
            <Icon iconType={IconType.google} className={styles.buttonIcon} />
            Sign in with Google
          </LoginButton>
          <LoginButton styles={styles} onClick={initFacebookLogin}>
            <Icon iconType={IconType.facebook} className={styles.buttonIcon} />
            Sign in with Facebook
          </LoginButton>
          <div className={styles.alreadyHaveAnAccount}>
            Already have an account?{' '}
            <button type="button" onClick={openLoginModal}>
              Log in
            </button>
          </div>
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
    openLoginModal: () => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.auth,
          options: {
            authenticationType: AuthenticationType.login,
            small: true,
          },
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
