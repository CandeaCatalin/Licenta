import {FC, SyntheticEvent, useState} from "react";
import {Link} from "react-router-dom";


interface LoginProps
{

}

export const Login: FC<LoginProps > = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const onSubmit = async (e: SyntheticEvent) => {

        e.preventDefault();
        setIsSubmitted(true);
        //Do the action for submitting
        setIsSubmitted(false);
    };

    return (
        <>
        {/*<Toast/>*/}


        <div className={"vertical-center"}>
            <main className="form-signIn">

                <div className="box mb-5">
                    <form onSubmit={onSubmit}>
                        <h1 className=" page-title h3 mb-3 fw-normal">
                            Please sign in
                        </h1>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                onChange={(e) => {
                                    setEmail(e.target.value);
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
                        <div className="checkbox mt-3">
                            <div className="row">
                                <div
                                    style={{color: "blue"}}
                                    onClick={() => {
                                        console.log("Hello");
                                    }}
                                >
                                    Forget password?
                                </div>
                            </div>
                        </div>

                        <button
                            className="button-login w-100 btn btn-lg mt-3"
                            type="submit"
                            disabled={isSubmitted}
                        >
                            Sign in
                        </button>

                        <div className="checkbox mt-3">
                            <div className="row">
                                <Link
                                    className="col-4"
                                    style={{color: "blue"}}
                                    onClick={() => {
                                        console.log("Hello");
                                    }}
                                to={"/register"}
                                >
                                    Don't have an account?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
        </>
    );
}
