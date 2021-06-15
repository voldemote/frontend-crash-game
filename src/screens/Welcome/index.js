import Authentication      from '../../components/Authentication';
import Button              from '../../components/Button';
import ButtonTheme         from '../../components/Button/ButtonTheme';
import classNames          from 'classnames';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';
import Link                from '../../components/Link';
import Routes              from '../../constants/Routes';
import styles              from './styles.module.scss';
import useWindowDimensions from '../../components/hoc/useWindowDimensions';
import { useState }        from 'react';
import { useEffect }       from 'react';
import { connect }         from 'react-redux';
import AuthState           from '../../constants/AuthState';
import { useHistory }      from 'react-router';

const Welcome = ({ authState }) => {
    const history                                   = useHistory();
    const { width }                                 = useWindowDimensions();
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

    useEffect(() => {
        if (authState === AuthState.LOGGED_IN) {
            history.push(Routes.home);
        }
    }, []);

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
                        on anything.
                    </h1>
                    <Button
                        theme={ButtonTheme.welcomeScreenButton}
                        onClick={onLetsTradeClick}
                    >
                        Get Started!
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

const mapStateToProps = (state) => {
    return {
        authState: state.authentication.authState,
    };
};

export default connect(
    mapStateToProps,
    null,
)(Welcome);
