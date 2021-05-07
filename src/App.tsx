// Imports from React-Router-Dom
import { ConnectedRouter }         from 'connected-react-router';
import { Provider }                from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

// Import of pages
import Welcome        from './pages/Welcome';
import Authentication from './pages/Authentication';

// Imports for styling
import GlobalStyle       from './themes/GlobalStyle';
import theme             from './themes/theme';
import styled            from 'styled-components';
import store             from './store';
import { history }       from './store';
import { ThemeProvider } from 'styled-components';

const App = () => {
    return (
        <Provider store={store()}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <ConnectedRouter history={history}>
                    <StyledApp>
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
                    </StyledApp>
                </ConnectedRouter>
            </ThemeProvider>
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

// Styled components
const StyledApp = styled.div`
  width: 100%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1px * ${vh}) * 100);
`;

export default App;
