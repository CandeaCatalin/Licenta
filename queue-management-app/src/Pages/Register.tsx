import {FC, SyntheticEvent, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {User} from "../Models";
import "./PagesStyle.css";
import {UserContext} from "../Context/UserContext";


interface RegisterProps {

}

export const Register: FC<RegisterProps> = () => {
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        id: 0,
        imageUrl: "",
        lastName: "",
        queueId: 0
    });
    const userContext = useContext(UserContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        userContext.register(user, password, confirmPassword);
        setIsSubmitted(false);
    };

    return (
        <>
            <div className={"vertical-center"}>
                <main className="form-box">
                    <div className="box col-12 mb-3">
                        <form onSubmit={onSubmit}>
                            <h1 className="page-title h3 mb-3 fw-normal">Register</h1>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="First Name"
                                            onChange={(e) => {
                                                setUser({...user, firstName: e.target.value});
                                            }}
                                        />
                                        <label htmlFor="floatingInput">First Name</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Last Name"
                                            onChange={(e) => {
                                                setUser({...user, lastName: e.target.value});
                                            }}
                                        />
                                        <label htmlFor="floatingInput">Last Name</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    onChange={(e) => {
                                        setUser({...user, email: e.target.value});
                                    }}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />

                                <label htmlFor="floatingPassword">Password</label>

                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingConfirmPassword"
                                    placeholder="Confirm password"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <label htmlFor="floatingPassword">Confirm password</label>
                            </div>

                            <button
                                className="submit-button w-100 btn btn-lg mt-3"
                                type="submit"
                                disabled={isSubmitted}
                            >
                                Register
                            </button>

                            <div className="checkbox mt-3">
                                <div className="row">
                                    <div className={"col-12"}>
                                        <Link
                                            className="text-link"
                                            to={"/login"}
                                        >
                                            Already have an account? Sign In.
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

        </>
    );
};
