import {createContext, FC, useEffect, useState} from "react";
import {User} from "../Models/User";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {endpoint} from "../constants/APIUrls";
import {showMessage} from "react-native-flash-message";

type UserContextType = {
    user: User;
    register: any;
    login: any;
    logOut: any;
};

// @ts-ignore
export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC = ({children}) => {

        const [user, setUser] = useState<User>({
            email: "",
            firstName: "",
            id: 0,
            imageUrl: "",
            lastName: "",
            queueId: 0,
            queueRole: ""
        });
        const navigator = useNavigation();
        useEffect(() => {
            getUser().then();
        }, [])
        const register = async (user: User, password: string, confirmPassword: string) => {
            try {
                const response = await axios({
                    method: "post",
                    url: endpoint.register,
                    data: {
                        ...user, password, confirmPassword
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

        }
        const login = async (email: string, password: string) => {
            try {
                const response = await axios({
                    method: "post",
                    url: endpoint.login,
                    data: {
                        email, password
                    },
                });
                if (response.data.message !== undefined) {
                    showMessage({
                        message: response.data.message,
                        type: "warning",
                    });
                } else {
                    // @ts-ignore
                    getUser().then(() => navigator.navigate("Home"));
                }
            } catch (error) {
                console.log(error);
            }
        }
        const logOut = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: endpoint.logOut,
                });
                setUser({
                    email: "",
                    firstName: "",
                    id: 0,
                    imageUrl: "",
                    lastName: "",
                    queueId: 0,
                    queueRole: ""
                });
                // @ts-ignore
                navigator.navigate("Login");
            } catch
                (error) {
                console.log(error);
            }
        }
        const getUser = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: endpoint.getUser,
                });

                setUser(res.data);

            } catch (error) {
                // @ts-ignore
                navigator.navigate("Login");
            }

        }
        const ctx: UserContextType = {
            user: user,
            register: (user: User, password: string, confirmPassword: string) =>
                register(user, password, confirmPassword),
            login: (email: string, password: string) => login(email, password),
            logOut: () => logOut()
        };
        return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
    }
;
