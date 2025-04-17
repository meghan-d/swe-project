import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5001/login", {
      username: values.email, // your backend still uses "username"
      password: values.password
    })
      .then((res) => {
        console.log("Response received:", res.data);

        if (res.data.Status === "Success") {
          const user = res.data.user;
          
          // ✅ Save userId and user info
          localStorage.setItem("userId", user.id);
          sessionStorage.setItem("user", JSON.stringify(user));

          console.log("User stored in session:", user);

          // ✅ Redirect based on role
          if (values.password.includes("cebsadmin")) {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        } else {
          alert(res.data.Error || "Incorrect email or password.");
        }
      })
      .catch((err) => {
        console.error("Axios request failed:", err);
        alert("Login request failed. Check the console for details.");
      });
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
