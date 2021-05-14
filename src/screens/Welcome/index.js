import Authentication from '../../components/Authentication';
import Button         from '../../components/Button';
import ButtonTheme    from '../../components/Button/ButtonTheme';
import darkModeLogo   from '../../data/images/logo-darkmode.svg';
import styles         from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import Link           from '../../components/Link';
import Routes         from '../../constants/Routes';

const Welcome = () => {
    const history = useHistory();

    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.welcomeContentContainer}>
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
                        onClick={() => history.push('/auth')}
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
            <div className={styles.welcomeAuthContainer}>
                <Authentication />
            </div>
        </div>
    );
};

export default Welcome;
