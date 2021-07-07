import client from "./client";
import Cookies from "js-cookie";

const { REACT_APP_APP_NAME } = process.env;

const getToken = () => Cookies.get(`${REACT_APP_APP_NAME}-auth-token`);
const setToken = (data) =>
  Cookies.set(`${REACT_APP_APP_NAME}-auth-token`, data);

const logout = (history) => {
  Cookies.remove(`${REACT_APP_APP_NAME}-auth-token`);
  history.push("/auth");
};

const login = async (credentials) => {
  try {
    const { headers } = await client.post("/auth/login", {
      ...credentials,
    });
    const token = headers["x-authorization-token"];
    if (token) {
      setToken(token);
      return true;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export { login, setToken, getToken, logout };
