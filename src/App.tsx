import AlertBox                    from './components/AlertBox';
import Authentication              from './screens/Authentication';
import PrivacyPolicy               from './screens/PrivacyPolicy';
import Routes                      from './constants/Routes';
import store                       from './store';
import styles                      from './styles.module.scss';
import TermsAndConditions          from './screens/TermsAndConditions';
import Welcome                     from './screens/Welcome';
import { ConnectedRouter }         from 'connected-react-router';
import { history }                 from './store';
import { Provider }                from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

const configuredStore = store();

const App = () => {
    return (
        <Provider store={configuredStore}>
            <ConnectedRouter history={history}>
                <div className={styles.appContainer}>
                    <AlertBox />
                    <Switch>
                        <Route
                            exact
                            path={Routes.welcome}
                            component={Welcome}
                        />
                        <Route
                            exact
                            path={Routes.termsAndConditions}
                            component={TermsAndConditions}
                        />
                        <Route
                            exact
                            path={Routes.privacyPolicy}
                            component={PrivacyPolicy}
                        />
                        <Route
                            exact
                            path={Routes.authentication}
                            component={Authentication}
                        />
                        <Redirect to={Routes.welcome} />
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    );
};

// Calculating height for mobile screens
let vh = window.innerHeight * 0.01;

// Recalculating after resizing screen
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

export default App;
