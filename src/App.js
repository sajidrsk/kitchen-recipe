import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./css/app.scss";
import { AuthContextProvider } from "./contexts/auth-context";
import { RecipeContextProvider } from "./contexts/recipe-context";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import PrivateRoute from "./PrivateRoutes";

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} preventDuplicate>
      <AuthContextProvider>
        <RecipeContextProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </Router>
        </RecipeContextProvider>
      </AuthContextProvider>
    </SnackbarProvider>
  );
}

export default App;
