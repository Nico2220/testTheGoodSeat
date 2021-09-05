import React from "react";
import { Link, Redirect } from "react-router-dom";
import { axiosInstance } from "../../config/index";
import { Spinner } from "../Spinner";

export const Signup = () => {
  const [isPhoneNumberVerified] = React.useState(true);
  const [isRegister, SetRegister] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",

    country: "",
  });

  const { email, firstName, lastName, birthDate, phoneNumber, country } =
    formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const stringBody = JSON.stringify({
      email,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      isPhoneNumberVerified,
      country,
    });

    try {
      const response = await axiosInstance.post(
        "/auth/registeruser",
        stringBody
      );

      setLoading(false);
      SetRegister(true);
    } catch (error) {
      setLoading(false);
    }
  };

  if (isRegister) {
    return <Redirect to="/" />;
  }

  if (loading) return <Spinner />;

  return (
    <div className="login_signup">
      <div className="form_container">
        <div className="form_content">
          <p className="sigin_link">
            Already a member ? <Link to="/"> Signin now</Link>{" "}
          </p>
          <h2 className="title_signup ">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label>Email</label>
              <input
                className="input-item"
                required
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <label>First name</label>
              <input
                className="input-item"
                required
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <label>Last name</label>
              <input
                className="input-item"
                required
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <label>Birth date</label>
              <input
                className="input-item"
                required
                name="birthDate"
                value={birthDate}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <label>Phone number</label>
              <input
                className="input-item"
                required
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
              />
            </div>

            <div className="form_group">
              <label>Country</label>
              <input
                className="input-item"
                required
                name="country"
                value={country}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <button type="submit" className="btn btn-primary large">
                Signup
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
