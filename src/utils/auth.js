import client from "./client";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const { REACT_APP_APP_NAME } = process.env;

const getToken = () => Cookies.get(`${REACT_APP_APP_NAME}-auth-token`);

const setToken = (data) =>
  Cookies.set(`${REACT_APP_APP_NAME}-auth-token`, data);

const removeToken = () => Cookies.remove(`${REACT_APP_APP_NAME}-auth-token`);

const logout = (history, setMe) => {
  removeToken();
  setMe();
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

const handleAuthentication = async (credentials, getContext) => {
  const isAuthenticated = await login(credentials);
  if (isAuthenticated) {
    toast.success("🦄 Login success!");
    getContext();
  }
};

export { login, setToken, getToken, logout, handleAuthentication };
