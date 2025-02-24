import React from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const RegistrationConfirm = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="title">Registration Successful!</h2>
      <p className="success-message">Your account has been created successfully.</p>
      <button onClick={() => navigate("/login")} className="button button-save">
        Go to Login
      </button>
    </div>
  );
};

export default RegistrationConfirm;
