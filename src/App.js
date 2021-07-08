import React, { useEffect, useState, useCallback } from "react";
import Authentication from "./components/Authentication";
import Admin from "./components/Admin";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "./utils/auth";
import client from "./utils/client";
import { getToken } from "./utils/auth";

const App = () => {
  const history = useHistory();

  // State used to hold the login/password of the user
  const [credentials, setCredentials] = useState();

  // State used to hold the context of the logged in user
  const [me, setMe] = useState();

  // Function to handle both input fields in Authentication.js
  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  // We call this function when the user clicks on
  // sign in, triggering the login function in our auth utilities
  // We receive true or undefined, which we store/check with isAuthenticated
  const handleAuthentication = async () => {
    const isAuthenticated = await login(credentials);
    if (isAuthenticated) {
      toast.success("🦄 Login success!");
      // When the user successfully logs in, we ask the back-end
      // for some more context about the user; if we get some, we push the
      // user to a specific part of the app
      getContext();
    }
  };

  const getContext = useCallback(async () => {
    try {
      // This route is dedicated to getting 'context' about the user
      // In the back-end, you can decide what's useful to send back
      // to the front-end at this point
      // (eg: username, id, email, other info you need to use/display later on)
      // This route does **not** have to be called /me in the back-end
      // The state does **not** have to be called me in the front-end
      const { data } = await client.get("/auth/me");
      if (data) {
        // if we get some data back at this point; it means the token
        // with which we made the query was valid, and the user
        // is correctly logged in
        console.log(data);

        // We set the user context in a state that we can pass down the line
        setMe(data);

        // We move the user where we want
        history.push("/admin");
      }
    } catch (e) {
      console.log("User not logged in:", e.message);
    }
  }, [history]);

  useEffect(() => {
    // When the user arrives in the app, we check if a token is
    // on the machine; and if so, we try to get some context about the user
    // Being already authenticated (eg: having a valid token) would
    // push the user to a specific route instead of staying on the authentication page
    if (getToken()) {
      getContext();
    }
  }, [getContext]);

  return (
    <>
      <Switch>
        <Route path="/auth">
          <Authentication
            onSetCredentials={handleSetCredentials}
            onAuth={handleAuthentication}
          />
        </Route>
        <ProtectedRoute path="/admin" component={Admin} me={me} />
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
