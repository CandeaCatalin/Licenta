import {createContext, FC, useContext, useEffect, useState} from "react";
import {User} from "../Models";
import {QueueManagementAPI} from "./API";
import {useNavigate} from "react-router-dom";


type UserContextType = {
    user: User;
    register: any;
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
        queueId: 0
    });
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await QueueManagementApi.getUser();

            if (response!== undefined) {
                setUser(response);
                navigate('../', {replace: true});
            }else{
                navigate('../login', {replace: true});

            }
            })();
    },[]);
    const register = async (user: User, password: string, confirmPassword: string) => {
        return await QueueManagementApi.register(user, password, confirmPassword);
    }
    const ctx: UserContextType = {
        user: user,
        register: (user: User, password: string, confirmPassword: string) =>
            register(user, password, confirmPassword),
    };
    return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};
