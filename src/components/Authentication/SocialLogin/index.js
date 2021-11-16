import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
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

const SocialLogin = ({ styles, prepend = [] }) => {
  const { initGoogleLogin, initFacebookLogin } = useSocialLogins();

  return (
    <>
      {
        prepend.map(({ content, onClick }) => (
          <LoginButton styles={styles} onClick={onClick}>
            {content}
          </LoginButton>
        ))
      }
      <LoginButton styles={styles} onClick={initGoogleLogin}>
        <Icon iconType={IconType.google} className={styles.buttonIcon} />
        Sign in with Google
      </LoginButton>
      <LoginButton styles={styles} onClick={initFacebookLogin}>
        <Icon iconType={IconType.facebook} className={styles.buttonIcon} />
        Sign in with Facebook
      </LoginButton>
    </>
  );
};

export default SocialLogin;
