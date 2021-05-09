import Authentication              from './screens/Authentication';
import store                       from './store';
import styles                      from './styles.module.scss';
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
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={Welcome}
                        />
                        <Route
                            exact
                            path="/auth"
                            component={Authentication}
                        />
                        <Redirect to="/" />
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
