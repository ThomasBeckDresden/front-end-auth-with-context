import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { me } = useUserContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        me ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};

export default ProtectedRoute;
