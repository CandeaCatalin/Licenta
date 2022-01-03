import {FC} from "react";
import {Link} from "react-router-dom";


interface RegisterProps
{

}

export const Register: FC<RegisterProps > = ({}) => {
    return (<div>
        <h1>Register</h1>
        <nav>
            <Link to="/">MainePage</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </div>);
}
