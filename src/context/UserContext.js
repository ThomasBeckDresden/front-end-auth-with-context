import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import client from "../utils/client";
import { getToken } from "../utils/auth";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children, initialValue }) => {
  const [me, setMe] = useState(initialValue);

  const history = useHistory();

  const getContext = useCallback(async () => {
    try {
      const { data } = await client.get("/auth/me");
      if (data) {
        console.log(data);
        setMe(data);
        history.push("/admin");
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
    <UserContext.Provider value={{ me, setMe, getContext }}>
      {children}
    </UserContext.Provider>
  );
};

UserContext.displayName = "UserContext";

export { UserProvider, useUserContext };
