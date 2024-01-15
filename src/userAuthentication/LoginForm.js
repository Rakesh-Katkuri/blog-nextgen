import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import axios from "axios";
import Navbar from "../home/Navbar";
import { ToastContainer, toast } from "react-toastify"; // Import the toast library
import "react-toastify/dist/ReactToastify.css"; // Import the default styles
// import { useAuth } from "../authContext/AuthContext";

const Login = () => {
  // const { login } = useAuth()
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3002/user");
      console.log(response.data);
      const foundUser = response.data.filter(
        (item) => item.email === user.email && item.password === user.password
      );
      localStorage.setItem("userId", foundUser[0].id);
      if (foundUser.length > 0) {
        // localStorage.setItem("userId", foundUser[0].id);
        navigate("/", { replace: true });
      }
    } catch (error) {
      // Show Toastify message when email and password do not match
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      console.log("error in post request", error);
    }
    // login(user);
  };

  return (
    <>
      <Navbar />
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-dark-subtle ">
        <div className="form_container 50-w p-5 rounded bg-white">
          <form>
            <h2 className="text-center mb-4">User SignIn</h2>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                id="em"
                onChange={handleChangeInput}
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                id="pw"
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
                onClick={handleSubmit}
                className="btn btn-primary btn-block"
              >
                Sign In
              </button>
            </div>

            <p className="text-end mt-2">
              Forgot <a href="">Password?</a>{" "}
              <Link to="/signup" className="ms-2">
                Sign Up
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
