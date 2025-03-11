// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Registration.css";

// const RegistrationConfirm = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="container">
//       <h2 className="title">Registration Successful!</h2>
//       <p className="success-message">Your account has been created successfully.</p>
//       <button onClick={() => navigate("/login")} className="button button-save">
//         Go to Login
//       </button>
//     </div>
//   );
// };

// export default RegistrationConfirm;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Registration.css";

// const RegistrationConfirm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email; // Get the email from state passed during navigation

//   const [verificationCode, setVerificationCode] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleVerificationCodeChange = (e) => {
//     setVerificationCode(e.target.value);
//   };

//   const handleVerifyCode = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post("http://localhost:5000/verify-email", { email, verificationCode });
//       if (response.data.message === "Email verified successfully!") {
//         // Redirect to login page if verification is successful
//         navigate("/login");
//       } else {
//         setError("Invalid verification code");
//       }
//     } catch (error) {
//       console.error("Error verifying code:", error);
//       setError("Error verifying email. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="title">Verify Your Email</h2>
//       <p>Please enter the verification code sent to your email.</p>

//       <form onSubmit={handleVerifyCode} className="verification-form">
//         <div className="form-group">
//           <label className="label">Verification Code</label>
//           <input
//             type="text"
//             name="verificationCode"
//             value={verificationCode}
//             onChange={handleVerificationCodeChange}
//             className="input"
//             required
//           />
//           {error && <div className="error-message">{error}</div>}
//         </div>

//         <button type="submit" className="button button-save" disabled={isSubmitting}>
//           {isSubmitting ? "Verifying..." : "Verify"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationConfirm;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Registration.css";

// const RegistrationConfirm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email; // Get the email from state passed during navigation

//   const [verificationCode, setVerificationCode] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleVerificationCodeChange = (e) => {
//     setVerificationCode(e.target.value);
//   };

//   const handleVerifyCode = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(""); // Reset any previous error
  
//     if (!verificationCode) {
//       setError("Verification code is required.");
//       setIsSubmitting(false);
//       return;
//     }
  
//     // Log the email and verification code being sent
//     console.log("Sending verification request with: ", { email, verificationCode });
  
//     try {
//       const response = await axios.post("http://localhost:5000/verify-email", { email, verificationCode });
      
//       if (response.data.message === "Email verified successfully!") {
//         navigate("/login");
//       } else {
//         setError(response.data.message || "Invalid verification code");
//       }
//     } catch (error) {
//       console.error("Error verifying code:", error.response || error);
//       setError("Error verifying email. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
  
//   return (
//     <div className="container">
//       <h2 className="title">Verify Your Email</h2>
//       <p>Please enter the verification code sent to your email.</p>

//       <form onSubmit={handleVerifyCode} className="verification-form">
//         <div className="form-group">
//           <label className="label">Verification Code</label>
//           <input
//             type="text"
//             name="verificationCode"
//             value={verificationCode}
//             onChange={handleVerificationCodeChange}
//             className="input"
//             required
//           />
//           {error && <div className="error-message">{error}</div>}
//         </div>

//         <button type="submit" className="button button-save" disabled={isSubmitting}>
//           {isSubmitting ? "Verifying..." : "Verify"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationConfirm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

const RegistrationConfirm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // For email input
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Reset any previous error

    if (!email || !verificationCode) {
      setError("Both email and verification code are required.");
      setIsSubmitting(false);
      return;
    }

    console.log("Sending verification request with: ", { email, verificationCode });

    try {
      const response = await axios.post("http://localhost:5000/verify-email", { email, verificationCode });

      if (response.data.message === "Email verified successfully!") {
        navigate("/login");
      } else {
        setError(response.data.message || "Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying code:", error.response || error);
      setError("Error verifying email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Verify Your Email</h2>
      <p>Please enter your email and the verification code sent to it.</p>

      <form onSubmit={handleVerifyCode} className="verification-form">
        <div className="form-group">
          <label className="label">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Verification Code</label>
          <input
            type="text"
            name="verificationCode"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            className="input"
            required
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <button type="submit" className="button button-save" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationConfirm;
