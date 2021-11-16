import Button from 'components/Button';
import HighlightTheme from 'components/Highlight/HighlightTheme';
import HighlightType from 'components/Highlight/HighlightType';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles }) => (
  <Button
    onClick={onClick}
    withoutBackground={true}
    highlightType={HighlightType.highlightModalButton}
    highlightTheme={HighlightTheme.fillPink}
    className={styles.signInButton}
    disabledWithOverlay={true}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [] }) => {
  const { initGoogleLogin, initFacebookLogin } = useSocialLogins();
  const iconProps = {
    className: styles.buttonIcon,
  };

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
        <Icon iconType={IconType.google} {...iconProps} />
        <span>Sign in with Google</span>
      </LoginButton>
      <LoginButton styles={styles} onClick={initFacebookLogin}>
        <Icon iconType={IconType.facebook} {...iconProps} />
        <span>Sign in with Facebook</span>
      </LoginButton>
    </>
  );
};

export default SocialLogin;
