import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
        // First, verify the reset code
        const verificationResponse = await axios.post("http://localhost:5000/verify-reset-code", {
            email,
            verificationCode
        });

        if (verificationResponse.data.message === "Verification successful. You can reset your password.") {
            // Now reset the password
            const response = await axios.post("http://localhost:5000/reset-password", {
                email,
                verificationCode,
                newPassword
            });

            setMessage(response.data.message);
            setError("");
            setTimeout(() => navigate("/login"), 2000); // Navigate after success
        }
    } catch (err) {
        setError(err.response?.data?.error || "Something went wrong. Try again.");
    }
};


  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Verify Code & Reset Password</h2>
        <div className="input-group">
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter verification code"
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="input-field"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button onClick={handleResetPassword} className="reset-button">
          Reset Password
        </button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;

