import {FC} from "react";
import {Link} from "react-router-dom";


interface LoginProps
{

}

export const Login: FC<LoginProps > = ({}) => {
    return (<div>
        <h1>Login</h1>
        <nav>
            <Link to="/">MainePage</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </div>);
}
