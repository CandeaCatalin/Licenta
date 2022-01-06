import {FC} from "react";
import { Link } from "react-router-dom";


interface MainPageProps
{

}

export const MainPage: FC<MainPageProps > = ({}) => {

    return (
        <div>
        <h1>Home</h1>
        <nav>
            <Link to="/">MainePage</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </div>);
}
