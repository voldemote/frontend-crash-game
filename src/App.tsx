// Imports from React-Router-Dom
import { Route, Redirect, Switch } from "react-router-dom";

// Import of pages
import Welcome from "./pages/Welcome";
import Authentication from "./pages/Authentication";

// Imports for styling
import GlobalStyle from "./themes/GlobalStyle";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Switch>
        <Route exact path={"/"} component={Welcome} />
        <Route exact path={"/auth"} component={Authentication} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
