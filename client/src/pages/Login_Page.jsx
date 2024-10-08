import "../styles/login_page.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";

const Login_Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();

    // Check if username and password are not empty
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError(null);

    // Send a POST request to the server
    try {
      dispatch(loginStart());
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(loginFailure());
        setError(data.message);
      }
      if (res.ok) {
        dispatch(loginSuccess(data.employee));
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Login Your Account</h1>
      <form action="" className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="login-btn-container">
          <button type="submit" id="login-btn">
            Login
          </button>
        </div>
        <p className="instruction">
          If you forget your password or Email, contact your manager.
        </p>
        <Link
          to="mailto: bizmaven@protonmail.com"
          className="forgot-password-or-username"
        >
          <p>Forgot Password or Email</p>
        </Link>
      </form>
    </div>
  );
};

export default Login_Page;
