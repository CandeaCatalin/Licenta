import {FC, useContext} from "react";
import {UserContext} from "../Context/UserContext";


interface MainPageProps {

}

export const MainPage: FC<MainPageProps> = () => {
    const userContext = useContext(UserContext);
    return (
        <div>
            <h1>{userContext.user.email}</h1>
            <h1>{userContext.user.firstName}</h1>
            <h1>{userContext.user.lastName}</h1>
            <button onClick={() => {
                userContext.logOut()
            }}>Logout
            </button>
        </div>);
}
