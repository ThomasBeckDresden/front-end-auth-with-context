import React from "react";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, me, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        me ? (
          <Component {...props} me={me} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
