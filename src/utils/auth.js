import client from "./client";
import Cookies from "js-cookie";

const { REACT_APP_APP_NAME } = process.env;

// https://www.npmjs.com/package/js-cookie

// Read a cookie:
const getToken = () => Cookies.get(`${REACT_APP_APP_NAME}-auth-token`);

// Create a cookie, valid across the entire site:
const setToken = (data) =>
  Cookies.set(`${REACT_APP_APP_NAME}-auth-token`, data);

// Delete a cookie:
const removeToken = () => Cookies.remove(`${REACT_APP_APP_NAME}-auth-token`);

const logout = (history) => {
  removeToken();
  history.push("/auth");
};

const login = async (credentials) => {
  try {
    // Axios returns an object containing the data of the response itself
    // but also the headers. Here, you want to grab the headers to extract the token
    const { headers } = await client.post("/auth/login", {
      ...credentials,
    });
    // Extracting the token from the headers:
    const token = headers["x-authorization-token"];
    if (token) {
      setToken(token);
      // We return true when the login operation was successfull
      // (which indicates that the credentials were correct + a token was received)
      // or we return nothing
      // (which will be undefined === falsy for whoever is calling that function)
      return true;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export { login, setToken, getToken, logout };
