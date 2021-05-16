import Authentication      from '../../components/Authentication';
import Button              from '../../components/Button';
import ButtonTheme         from '../../components/Button/ButtonTheme';
import classNames          from 'classnames';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';
import Link                from '../../components/Link';
import Routes              from '../../constants/Routes';
import styles              from './styles.module.scss';
import useWindowDimensions from '../../helper/WindowDimensionsHook';
import { useState }        from 'react';

const Welcome = () => {
    const { width }                                 = useWindowDimensions();
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

    const shouldShowWelcomeScreen = () => {
        return width >= 768 || showWelcomeScreen;
    };

    const shouldShowAuthScreen = () => {
        return width >= 768 || !shouldShowWelcomeScreen();
    };

    const onLetsTradeClick = () => {
        setShowWelcomeScreen(false);
    };

    return (
        <div className={styles.welcomeContainer}>
            <div
                className={classNames(
                    styles.welcomeContentContainer,
                    shouldShowWelcomeScreen() ? null : styles.hidden,
                )}
            >
                <div className={styles.welcomeContentOverlay}>
                </div>
                <div className={styles.welcomeContent}>
                    <img
                        className={styles.welcomeLogo}
                        src={darkModeLogo}
                        alt=""
                    />
                    <h1 className={styles.welcomeTitle}>
                        Hello, we are <br />WallFair!
                        <br />
                        Simple betting <br /> for{' '}
                        <span className={styles.welcomeTitleHighlight}> everyone</span>
                        <br />
                        and everything.
                    </h1>
                    <Button
                        theme={ButtonTheme.welcomeScreenButton}
                        onClick={onLetsTradeClick}
                    >
                        Let's trade!
                    </Button>
                    <p className={styles.welcomeSmallPrint}>
                        By continuing I accept the <Link to={Routes.termsAndConditions}>
                        Terms and Conditions
                    </Link> and <Link to={Routes.privacyPolicy}>
                        Privacy Policy
                    </Link>.
                        Also I confirm that I am over 18 years old.
                    </p>
                </div>
            </div>
            <div
                className={classNames(
                    styles.welcomeAuthContainer,
                    shouldShowAuthScreen() ? null : styles.hidden,
                )}
            >
                <Authentication />
            </div>
        </div>
    );
};

export default Welcome;
