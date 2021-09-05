import { FormEventHandler } from "react";
import { Link, Redirect } from "react-router-dom";

import { Spinner } from "../Spinner";

export interface AppProps {
  loginUser: FormEventHandler<HTMLFormElement>;
  email: string;
  setEmail: Function;
  phoneNumber: string;
  setPhoneNumber: Function;
  loading: boolean;
  isAuthenticated: boolean;
}

export const Login = (props: AppProps) => {
  const {
    loginUser,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    loading,
    isAuthenticated,
  } = props;

  if (isAuthenticated) {
    return <Redirect to="/offers" />;
  }

  if (loading)
    return (
      <div className="spin_log">
        <Spinner data-test="spinner" />
      </div>
    );

  return (
    <div className="login_signup" data-test="component-login">
      <div className="form_container">
        <div className="form_content">
          <p className="signup_link">
            Not a member ? <Link to="/signup"> Signup now</Link>{" "}
          </p>
          <h2 className="title">Signin</h2>
          <form onSubmit={loginUser} data-test="login-form">
            <div className="form_group">
              <label>Email</label>
              <input
                data-test="input-email"
                placeholder="Enter your email"
                className="input-item"
                name="email"
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label>Phone Number</label>
              <input
                data-test="input-phone-number"
                placeholder="Enter your phone number"
                className="input-item"
                name="phoneNumber"
                type="tel"
                id="phoneNumber"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form_group login-container">
              <button
                data-test="submit-button"
                type="submit"
                className="btn btn-primary btn-large"
              >
                Signin
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col">
        <div>
          <img
            src="https://thegoodseat.fr/wp-content/uploads/2020/09/Logo_horonzital_black_edition_2-1.png"
            alt="thegoodseatlogo"
          />
        </div>
        <div className="text">
          <h1>Join the largest VTC Taxi community in the world.</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
