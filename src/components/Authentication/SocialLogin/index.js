import classNames from 'classnames';
import Button from 'components/Button';
import HighlightTheme from 'components/Highlight/HighlightTheme';
import HighlightType from 'components/Highlight/HighlightType';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';
import AuthenticationType from '../AuthenticationType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles, signUp }) => (
  <Button
    onClick={onClick}
    className={signUp ? styles.signInButton : styles.socialButton}    
    withoutPadding={!signUp}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [], signUp = true, authenticationType }) => {
  const {
    initGoogleLogin,
    initFacebookLogin,
    initTwitchLogin,
    initDiscordLogin,
    isVisible
  } = useSocialLogins();

  const showNewFeatures =
    process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';
  const iconProps = {
    className: styles.buttonIcon,
  };

  const prefixText = authenticationType === AuthenticationType.register ? "Sign up" : "Login";

  return (
    <div className={classNames(styles.socialContainer, signUp && styles.verticalContainer)}>
      {prepend.map(({ content, onClick }) => (
        <LoginButton styles={styles} onClick={onClick}>
          {content}
        </LoginButton>
      ))}
      {isVisible.google && 
        <LoginButton styles={styles} onClick={initGoogleLogin} signUp={signUp}>
          <Icon className={styles.socialIcon} iconType={IconType.google} {...iconProps} />
          {signUp && <p>Sign up with Google</p>}
        </LoginButton>
      }
      {isVisible.twitch && 
        <LoginButton styles={styles} onClick={initTwitchLogin} signUp={signUp}>
          <Icon className={styles.socialIcon} iconType={IconType.twitch} {...iconProps} />
          {signUp && <p>Sign up with Twitch</p>}
        </LoginButton>
      }
      {isVisible.discord &&
        <LoginButton styles={styles} onClick={initDiscordLogin} signUp={signUp}>
          <Icon className={styles.socialIcon} iconType={IconType.discord} {...iconProps} />
          {signUp && <p>Sign up with Discord</p>}
        </LoginButton>
      }
    </div>
  );
};

export default SocialLogin;
