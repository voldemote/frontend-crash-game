import './styles.module.scss';
import BetCreation         from './screens/BetCreation';
import * as serviceWorker  from './serviceWorker';
import AlertBox            from './components/AlertBox';
import Home                from './screens/Home';
import Logout              from './screens/Logout';
import PrivacyPolicy       from './screens/PrivacyPolicy';
import Routes              from './constants/Routes';
import store               from './store';
import TermsAndConditions  from './screens/TermsAndConditions';
import Welcome             from './screens/Welcome';
import { ConnectedRouter } from 'connected-react-router';
import { history }                 from './store';
import { Provider }                from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

const configuredStore = store();

const App = () => {
    serviceWorker.register();

    return (
        <Provider store={configuredStore}>
            <ConnectedRouter history={history}>
                <AlertBox />
                <Switch>
                    <Route
                        exact
                        path={Routes.logout}
                        component={Logout}
                    />
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
                        path={Routes.home}
                        component={Home}
                    />
                    <Route
                        exact
                        path={Routes.betCreation}
                        component={BetCreation}
                    />
                    <Redirect to={Routes.welcome} />
                </Switch>
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
