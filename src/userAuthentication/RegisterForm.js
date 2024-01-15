import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../authContext/AuthContext';
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({});
  // const {loggedIn, register} = useAuth();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    try {
      const response = await axios.post("http://localhost:3002/user", data);
      console.log(response.data);
      localStorage.setItem("userId", response.data.id);
      navigate("/");
    } catch (error) {
      console.log("error in post request", error);
    }
    // register(user);
  };

  return (
    <>
      <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-dark-subtle">
        <div className="form_container p-5 rounded bg-white">
          <form>
            <h2 className="text-center">Sign Up</h2>
            <div className="mb-2">
              <label htmlFor="firstName">First Name</label>
              <input
                onChange={handleChangeInput}
                name="firstName"
                type="text"
                placeholder="Enter first name"
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                onChange={handleChangeInput}
                name="lastName"
                type="text"
                placeholder="Enter last name"
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChangeInput}
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChangeInput}
                name="password"
                type="password"
                placeholder="Enter password"
                className="form-control"
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                onClick={handleSignup}
                className="btn btn-primary btn-block"
              >
                Sign Up
              </button>
            </div>

            <p className="text-end mt-2">
              Already Registered
              <Link to="/" className="ms-2">
                Sign In
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
