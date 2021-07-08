import React from "react";

import { Route, Redirect } from "react-router-dom";

// component is given an alias as Component with the object destructuring syntax
// so that React knows that it’s a component
// (remember: all components are capitalized in react so that it can differentiate them from html tags)

// The rest parameter syntax here is used to pass react-router's properties further down the line
const ProtectedRoute = ({ component: Component, me, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        // conditionally either return the correct component based on some logic (do we have context about the user?)
        // or redirect somewhere else
        me ? (
          // we’re using the render props functionality given to us by react-router dom
          // to render a component and pass it some props. I’m spreading the props directly
          // inside the component we’re given
          // this is how I can pass directly the history/location/match objects
          <Component {...props} me={me} />
        ) : (
          // Rendering a <Redirect> will navigate to a new location.
          // The new location will override the current location in the history stack.
          <Redirect
            to="/auth"
            // Another syntax can also be:

            // to={{
            //   pathname: "/auth",
            //   state: { from: props.location },
            // }}

            // The 'to' param of Redirect doesn't only work with a string but you can also provide
            // it as an object. In this case we give it a pathname of /auth, as well as a state
            // object with the location where they came from.
            // This would prove useful if the user can log in from multiple places.
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
