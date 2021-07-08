import axios from "axios";
import { getToken } from "./auth";
import { toast } from "react-toastify";

// https://create-react-app.dev/docs/adding-custom-environment-variables/
const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL, NODE_ENV } = process.env;

// The baseURL will be prepended to **every** request you make with this instance
// of axios. Eg: /auth/login will be prepended by the value of REACT_APP_DEV_API_URL
// such as http://localhost:3000/auth/login
const baseURL =
  NODE_ENV === "production" ? REACT_APP_PROD_API_URL : REACT_APP_DEV_API_URL;

//  By default you will have NODE_ENV defined for you by React:
// NODE_ENV === 'development' when you npm start
// NODE_ENV === 'production' when you npm run build
// NODE_ENV === 'test' when you npm test

// https://www.npmjs.com/package/axios#creating-an-instance
// You can create a new instance of axios with a custom config:
const client = axios.create({ baseURL });

client.interceptors.request.use(
  (req) => {
    // `req` is the Axios request config, so you can modify the http headers on the fly.
    const token = getToken();
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
    // Important: request interceptors **must** return the request.
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  // Here we just send back the response without modifying it
  (response) => response,
  // But for the error, we want some custom behavior
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Sending a custom error message to the user
      toast.error("😿 Authentication failed, please try again");
      // This error will be caught by whichever part of your code is using axios
      // When a 401 or 403 is handled so we can customize the error message
      throw new Error(`${error.config.url}: ${error.request.response}`);
    }
    // Axios' default error message is "Request failed with status code xxx"
    throw error;
  }
);

export default client;
