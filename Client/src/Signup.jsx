import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        if (result.data === "Account already exists") {
          setMessage("Account already exists. Please try logging in.");
        } else if (result.data === "Registration successful") {
          navigate("/login", { state: { message: "Registration successful" } });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="main_container">
        <div>
          <h2>Register</h2>
          {message && <p className="error_message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" id="registerBtn">
              Register
            </button>
          </form>
          <p>Already Have an Account</p>
          <Link to="/login" id="loginBtn">
            <button> Login </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
