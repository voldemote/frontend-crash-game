import classNames from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import { useEffect, useState } from 'react';
import AuthenticationType from '../AuthenticationType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles, disabled }) => (
  <Button
    onClick={onClick}
    className={classNames(styles.signInButton)}    
    // disabled={disabled}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [], signUp = true, authenticationType, disabled, validateInput }) => {
  const {
    initGoogleLogin,
    initFacebookLogin,
    initTwitchLogin,
    initDiscordLogin,
    isVisible
  } = useSocialLogins();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const cb = () => {
      const isSmall = window.innerWidth < 768;
      if (isMobile !== isSmall) {
        setIsMobile(isSmall);
      }
    };
    window.addEventListener('resize', cb)
   return () => window.removeEventListener('resize', cb)
  }, [])

  const showNewFeatures =
    process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';
  const iconProps = {
    className: styles.buttonIcon,
  };
  const isRegistration = authenticationType === AuthenticationType.register
  const prefixText = isRegistration ? "Sign up" : "Login";

  const login = (provider, ToSAccepted) => () => {
    validateInput({tosOnly: true});

    return !disabled && {
      'google': initGoogleLogin,
      'facebook': initFacebookLogin,
      'twitch': initTwitchLogin,
      'discord': initDiscordLogin,
    }[provider]({tosAccepted: ToSAccepted});
  }

  const showLarge = (signUp && !isMobile);

  return (
    <div
      className={classNames(
        styles.socialContainer,
        showLarge && styles.verticalContainer
      )}
    >
      {prepend.map(({ content, onClick }) => (
        <LoginButton
          styles={styles}
          onClick={onClick}
          className={classNames(
            styles.loginButton,
            disabled && styles.disabled
          )}
        >
          {content}
        </LoginButton>
      ))}
      {isVisible.google &&
        (showLarge ? (
          <LoginButton
            styles={styles}
            onClick={login('google', isRegistration)}
            signUp={signUp}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.google}
              {...iconProps}
            />
            <p>Sign up with Google</p>
          </LoginButton>
        ) : (
          <button
            className={styles.socialCircleButton}
            onClick={login('google', isRegistration)}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.google}
              {...iconProps}
            />
          </button>
        ))}
      {isVisible.twitch &&
        (showLarge ? (
          <LoginButton
            styles={styles}
            onClick={login('twitch', isRegistration)}
            signUp={signUp}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.twitch}
              {...iconProps}
            />
            <p>Sign up with Twitch</p>
          </LoginButton>
        ) : (
          <button
            className={styles.socialCircleButton}
            onClick={login('twitch', isRegistration)}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.twitch}
              {...iconProps}
            />
          </button>
        ))}
      {isVisible.discord &&
        (showLarge ? (
          <LoginButton
            styles={styles}
            onClick={login('discord', isRegistration)}
            signUp={signUp}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.discord}
              {...iconProps}
            />
            <p>Sign up with Discord</p>
          </LoginButton>
        ) : (
          <button
            className={styles.socialCircleButton}
            onClick={login('discord', isRegistration)}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.discord}
              {...iconProps}
            />
          </button>
        ))}
    </div>
  );
};

export default SocialLogin;
