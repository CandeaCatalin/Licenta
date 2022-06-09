import { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "../Models";
import { UserAPI } from "./API/UserAPI";
import { useNavigate } from "react-router-dom";
import { QueueContext } from "./QueueContext";

type UserContextType = {
  user: User;
  register: (user: User, password: string, confirmPassword: string) => {};
  login: any;
  logOut: any;
};

// @ts-ignore
export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC = ({ children }) => {
  const userAPI = new UserAPI();
  const queueContext = useContext(QueueContext);
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await userAPI.getUser();
        await new Promise((res) => setTimeout(res, 1000));
        setUser(response);
      } catch (error) {
        navigate("Login");
      }
    };
    fetch().then();
  }, []);

  useEffect(() => {
    if (user?.id === -1) {
      navigate("../login", { replace: true });
    } else {
      navigate("../", { replace: true });
    }
  }, [user]);

  const register = async (
    newUser: User,
    password: string,
    confirmPassword: string
  ) => {
    const response = await userAPI.register(newUser, password, confirmPassword);
    if (response) {
      navigate("../login", { replace: true });
    }
  };
  const login = async (email: string, password: string) => {
    const response = await userAPI.login(email, password);
    if (response) {
      setUser(await userAPI.getUser());
      queueContext.getQueues();
    }
  };
  const logOut = async () => {
    const response = await userAPI.logOut();
    if (response) {
      navigate("../login", { replace: true });
    }
  };
  const ctx: UserContextType = {
    user: user,
    register: (newUser: User, password: string, confirmPassword: string) =>
      register(newUser, password, confirmPassword),
    login: (email: string, password: string) => login(email, password),
    logOut: () => logOut(),
  };
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};
