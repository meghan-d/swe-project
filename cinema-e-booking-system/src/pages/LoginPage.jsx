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


import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", values)
      .then((res) => {
        console.log("Response received:", res.data);
        if (res.data.Status === "Success") {
          //sessionStorage.setItem("user", JSON.stringify(res.data.user))
          if (res.data.user) {
            console.log("User data:", res.data.user);
            sessionStorage.setItem("user", JSON.stringify(res.data.user)); 
            console.log("User stored:", JSON.parse(sessionStorage.getItem("user")));
          }          
          if (values.password.includes("cebsadmin")) {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        } else {
          alert("Incorrect email or password.");
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
              placeholder="Username" 
              onChange={(e) => setValues(prevValues => ({ ...prevValues, username: e.target.value }))} 
            />
          </div>

          <div className="input-group">
            <i><FaLock /></i>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              onChange={(e) => setValues(prevValues => ({ ...prevValues, password: e.target.value }))} 
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <button type="button" className="forgot-password-link" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>

          <div className="buttons">
            <button type="submit" className="login-button">Login</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
