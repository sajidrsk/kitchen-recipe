import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./css/app.scss";
import { AuthContextProvider } from "./contexts/auth-context";
import { RecipeContextProvider } from "./contexts/recipe-context";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PrivateRoute from "./PrivateRoutes";

function App() {
  const response =false;
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000} preventDuplicate>
      <AuthContextProvider>
        <RecipeContextProvider>
          <Router>
            <Switch>
              <PrivateRoute auth={response} exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </RecipeContextProvider>
      </AuthContextProvider>
    </SnackbarProvider>
  );
}

export default App;
