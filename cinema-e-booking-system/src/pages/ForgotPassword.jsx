import React, { useState } from "react";
import "./ForgotPassword.css";
import { FaEnvelope, FaKey } from "react-icons/fa";  
import { useNavigate } from "react-router-dom";
import VerificationRequests from "../facade/VerificationRequests";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter Code & New Password
  const navigate = useNavigate();

  const handleSendCode = async () => {
      try {
        await VerificationRequests.sendResetCode(email);
        alert("Verification code sent to your email!");
        setStep(2); // Move to verification step
      } catch (err) {
        console.error("Error sending code:", err);
        alert("Error sending verification code.");
      }
  };

  const handleVerifyCode = async () => {
    try {
      await VerificationRequests.verifyResetCode(email, verificationCode);
      alert("Code verified! Redirecting to reset password page.");
      navigate("/reset-password"); 
    } catch (err) {
      console.error("Error sending code:", err);
      alert("Error sending verification code.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Forgot Password?</h1>
        
        {step === 1 && (
          <>
            <div className="input-group">
              <i><FaEnvelope /></i>
              <input type="email" className="input-field" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <button className="send-code-button" onClick={handleSendCode}>
              Send Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="input-group">
              <i><FaKey /></i>
              <input type="text" className="input-field" placeholder="Enter Verification Code"
                value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </div>

            <button className="verify-code-button" onClick={handleVerifyCode}>
              Verify Code
            </button>
          </>
        )}

        <div className="back-to-login">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

