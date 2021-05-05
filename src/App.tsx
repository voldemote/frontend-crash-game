import React from 'react';
// Imports from React-Router-Dom
import { Route, Redirect, Switch } from 'react-router-dom';
// @ts-ignore
import { ThemeProvider } from 'styled-components';

// Import of pages
import Welcome from './pages/Welcome';
import Authentication from './pages/Authentication';

// Imports for styling
import GlobalStyle from './themes/GlobalStyle';
import theme from 'themes/theme';

const App = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <div className="App">
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/auth" component={Authentication} />
          <Redirect to="/" />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
