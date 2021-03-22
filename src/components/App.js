import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../css/app.scss";
import { AuthContextProvider } from "../contexts/auth-context";
import { RecipeContextProvider } from "../contexts/recipe-context";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";

function App() {
  return (
    <AuthContextProvider>
      <RecipeContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </RecipeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
