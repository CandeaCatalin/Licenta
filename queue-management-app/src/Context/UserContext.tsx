import {createContext, FC, useEffect, useState} from "react";
import {User} from "../Models";
import {QueueManagementAPI} from "./API";
import {useNavigate} from "react-router-dom";


type UserContextType = {
    user: User;
    register: any;
    login: any;
    logOut: any;
};

// @ts-ignore
export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC = ({children}) => {
    const QueueManagementApi = new QueueManagementAPI();
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        id: 0,
        imageUrl: "",
        lastName: "",
        queueId: 0,
        queueRole:""
    });
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await QueueManagementApi.getUser();

            if (response !== undefined) {
                setUser(response);
            }
        })();
    }, []);
    useEffect(() => {
        if (user?.id === 0) {
            navigate('../login', {replace: true});
        } else {
            navigate('../', {replace: true});
        }
    }, [user]);
    const register = async (user: User, password: string, confirmPassword: string) => {
        const response = await QueueManagementApi.register(user, password, confirmPassword);
        if (response) {
            navigate('../login', {replace: true});
        }
    }
    const login = async (email: string, password: string) => {
        const response = await QueueManagementApi.login(email, password);
        if (response) {
            const user = await QueueManagementApi.getUser();
            setUser(user);
        }
    }
    const logOut = async () => {
        const response = await QueueManagementApi.logOut();
        if (response) {
            navigate('../login', {replace: true});
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
};
