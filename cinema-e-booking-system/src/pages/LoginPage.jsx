import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginRequests from "../facade/LoginRequests";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await LoginRequests.loginUser(values.email, values.password);

    if (res.Status === "Success") {
      const user = res.user;
          
      localStorage.setItem("userId", user.id);
      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("User stored in session:", user);
      //Redirect based on role
      if (values.password.includes("cebsadmin")) {
        navigate("/admin-dashboard");
      } else  {
        navigate("/");
      }
    } else {
        alert("Incorrect email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="registration-title">🎟️ VIP Login</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i><FaUser /></i>
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={values.email}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="input-group">
            <i><FaLock /></i>
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={values.password}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="buttons">
            <button type="submit" className="login-button">Login</button>
          </div>

          <div className="signup-option">
            <p>
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;