import { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "../Models";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAPI from "./API/UserAPI";
import { QueueContext } from "./QueueContext";
axios.defaults.withCredentials = true;
type UserContextType = {
  user: User;
  register: (newUser: User, password: string, confirmPassword: string) => {};
  login: any;
  logOut: any;
};

// @ts-ignore
export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC = ({ children }) => {
  const userAPI = new UserAPI();
  const queueContext = useContext(QueueContext);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    id: 0,
  });
  const navigator = useNavigation();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await userAPI.getUser();
        setUser(response);
      } catch (error) {
        // @ts-ignore
        navigator.navigate("Login");
      }
    };
    fetch().then();
  }, []);

  useEffect(() => {
    if (user?.id === -1) {
      // @ts-ignore
      navigator.navigate("Login");
    } else {
      // @ts-ignore
      navigator.navigate("Home");
    }
  }, [user]);
  const register = async (
    newUser: User,
    password: string,
    confirmPassword: string
  ) => {
    const response = await userAPI.register(newUser, password, confirmPassword);
    if (response) {
      setUser(await userAPI.getUser());
    }
  };
  const login = async (email: string, password: string) => {
    const response = await userAPI.login(email, password);
    if (response) {
      setUser(await userAPI.getUser());
      try {
        queueContext.getQueues();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logOut = async () => {
    const response = await userAPI.logOut();
    if (response) {
      // @ts-ignore
      navigator.navigate("Login");
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
