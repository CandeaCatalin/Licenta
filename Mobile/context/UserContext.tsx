import { createContext, FC, useEffect, useState } from "react";
import { User } from "../Models/User";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { endpoint } from "../constants/APIUrls";
import { showMessage } from "react-native-flash-message";
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
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    id: 0,
  });
  const navigator = useNavigation();
  useEffect(() => {
    getUser().then();
  }, []);
  const register = async (
    newUser: User,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: endpoint.register,
        data: {
          ...newUser,
          password,
          confirmPassword,
        },
      });
      if (response.data.message !== undefined) {
        showMessage({
          message: response.data.message,
          type: "warning",
        });
      } else {
        showMessage({
          message: "Account created successfully, please activate it!",
          type: "success",
        });
        // @ts-ignore
        navigator.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (email: string, password: string) => {
    // try {
    //   const response = await axios({
    //     method: "post",
    //     url: endpoint.login,
    //     data: {
    //       email,
    //       password,
    //     },
    //     withCredentials: true,
    //   });
    //   if (response.data.message !== undefined) {
    //     showMessage({
    //       message: response.data.message,
    //       type: "warning",
    //     });
    //   } else {
    //     // @ts-ignore
    //     getUser().then(() => navigator.navigate("Home"));
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    const response = await fetch(endpoint.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.statusText === "OK") {
      const content = await response.json();
      localStorage.setItem("Jwt", content.jwt);
      return true;
    } else {
      const content = await response.json();
      console.log(content.message);
      return false;
    }
  };
  const logOut = async () => {
    try {
      await axios({
        method: "post",
        url: endpoint.logOut,
      });
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        id: 0,
      });
      // @ts-ignore
      navigator.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await axios({
        method: "get",
        url: endpoint.getUser,
        withCredentials: true,
      });

      setUser(res.data);
    } catch (error) {
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
