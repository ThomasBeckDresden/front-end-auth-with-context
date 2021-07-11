import React from "react";
import Authentication from "./components/Authentication";
import Admin from "./components/Admin";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Switch>
        <Route path="/auth">
          <Authentication />
        </Route>
        <ProtectedRoute path="/admin" component={Admin} />
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </UserProvider>
  );
};

export default App;
