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
  const [credentials, setCredentials] = useState();
  const [me, setMe] = useState();

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuthentication = async () => {
    const isAuthenticated = await login(credentials);
    if (isAuthenticated) {
      getContext();
    }
    // else {
    //   toast.error("🦄 Authentication failed!");
    // }
  };

  const getContext = useCallback(async () => {
    try {
      const { data } = await client.get("/auth/me");
      if (data) {
        console.log(data);
        setMe(data);
        history.push("/admin");
        toast.success("🦄 Welcome back!");
      }
    } catch (e) {
      console.log("User not logged in:", e.message);
    }
  }, [history]);

  useEffect(() => {
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
        <ProtectedRoute
          path="/features"
          component={() => <h1>Features</h1>}
          me={me}
        />
        <Route path="/enterprise">
          <h1>Enterprise</h1>
        </Route>
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
