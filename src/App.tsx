// Imports from React-Router-Dom
import { ConnectedRouter }         from 'connected-react-router';
import { Provider }                from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

// Import of pages
import Welcome        from './screens/Welcome';
import Authentication from './screens/Authentication';

// Imports for styling
import style       from './styles.modules.scss';
import store       from './store';
import { history } from './store';

const configuredStore = store();

const App = () => {
    return (
        <Provider store={configuredStore}>
            <ConnectedRouter history={history}>
                <div className={style.appContainer}>
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
