import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ResetPassword.css';
import VerificationRequests from "../facade/VerificationRequests";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
            const verificationResponse = await VerificationRequests.verifyResetCode(email, verificationCode);
            
            if (verificationResponse.message === "Verification successful. You can reset your password.") {
              // Now reset the password
              const response = await VerificationRequests.resetPassword(email, verificationCode, newPassword);
              setMessage(response.message);
              setError("");
              setTimeout(() => navigate("/login"), 2000);
            }
    } catch (err) {
        setError(err.response?.data?.error || "Something went wrong. Try again. ere");
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

