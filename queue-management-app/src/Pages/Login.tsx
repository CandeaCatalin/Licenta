import { FC, SyntheticEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./PagesStyle.css";
import { UserContext } from "../Context/UserContext";

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    userContext.login(email, password);
    setIsSubmitted(false);
  };

  return (
    <>
      <div className={"vertical-center"}>
        <main className="form-box">
          <div className="box mb-5">
            <form onSubmit={onSubmit}>
              <h1 className=" page-title h3 mb-3 fw-normal">Welcome!</h1>

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
                  <div className={"col-12"}>
                    <Link className="text-link" to={"/forgetPassword"}>
                      Forget password?
                    </Link>
                  </div>
                </div>
              </div>

              <button
                className="submit-button w-100 btn btn-lg mt-3"
                type="submit"
                disabled={isSubmitted}
              >
                Sign in
              </button>

              <div className="checkbox mt-3">
                <div className="row">
                  <div className={"col-12"}>
                    <Link className="text-link" to={"/register"}>
                      Don't have an account?
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
