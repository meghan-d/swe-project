// import React, { useState } from "react";
// import "./LoginPage.css";
// import { FaUser, FaLock } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [values, setValues] = useState({
//     email: "",  // Changed from username to email
//     password: ""
//   });
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post("http://localhost:5000/login", values)
//       .then((res) => {
//         console.log("Response received:", res.data);
//         if (res.data.Status === "Success") {
//           localStorage.setItem("email", values.email); // Store email correctly
//           if (values.email.includes("@cebsadmin.com")) {
//             navigate("/admin-dashboard");
//           } else {
//             navigate("/");
//           }        
//         } else {
//           alert(res.data.error || "Incorrect email or password.");
//         }
//       })
//       .catch((err) => {
//         console.error("Axios request failed:", err);
//         alert("Login request failed. Check the console for details.");
//       });
//   };

//   return (
//     <div className="login-container">
//       <h2 className="registration-title">🎟️ VIP Login</h2>
//       <div className="login-box">
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <i><FaUser /></i>
//             <input 
//               type="text" 
//               className="input-field" 
//               placeholder="Email"  // Changed from Username to Email
//               onChange={(e) => setValues(prevValues => ({ ...prevValues, email: e.target.value }))} 
//             />
//           </div>

//           <div className="input-group">
//             <i><FaLock /></i>
//             <input 
//               type="password" 
//               className="input-field" 
//               placeholder="Password" 
//               onChange={(e) => setValues(prevValues => ({ ...prevValues, password: e.target.value }))} 
//             />
//           </div>

//           <div className="options">
//             <label>
//               <input type="checkbox" /> Remember Me
//             </label>
//             <button type="button" className="forgot-password-link" onClick={() => navigate("/forgot-password")}>
//               Forgot Password?
//             </button>
//           </div>

//           <div className="buttons">
//             <button type="submit" className="login-button">Login</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = useState({
    username: localStorage.getItem("rememberMeUser") || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("rememberMeUser")) {
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!values.username || !values.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", values);

      if (res.data.Status === "Success") {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));

        if (rememberMe) {
          localStorage.setItem("rememberMeUser", values.username);
        } else {
          localStorage.removeItem("rememberMeUser");
        }

        if (values.password.includes("cebsadmin")) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Incorrect username or password.");
      }
    } catch (err) {
      console.error("Axios request failed:", err);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="registration-title">🎟️ VIP Login</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <i><FaUser /></i>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Username" 
              value={values.username}
              onChange={(e) => setValues(prev => ({ ...prev, username: e.target.value }))} 
            />
          </div>

          <div className="input-group">
            <i><FaLock /></i>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              value={values.password}
              onChange={(e) => setValues(prev => ({ ...prev, password: e.target.value }))} 
            />
          </div>

          <div className="options">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              /> Remember Me
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
            <p>Don't have an account? <span onClick={() => navigate("/register")}>Sign Up</span></p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;

