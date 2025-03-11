import React from 'react';
import './LoginPage.css';
import {FaUser} from 'react-icons/fa';  // Icons for h1

const resetPassword = () => {
  return (
    <div 
      className="login-container"
      style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <h2 className="registration-title"> 🎟️ Reset Account Password</h2>
      <div className="login-box">
        <form>
          <div className="input-group">
            <i><FaUser /></i>
            <input type="text" className="input-field" placeholder="Username" />
          </div>
          <div className="buttons">
            <button type="submit" className="login-button">Reset Password</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default resetPassword;
