import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { me } = useContext(UserContext);
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
