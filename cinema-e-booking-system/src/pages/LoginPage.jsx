import React from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';  // Icons for username & password

const LoginPage = () => {
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
      <h2 className="registration-title">🎟️ VIP Login</h2>
      <div className="login-box">
        <form>
          <div className="input-group">
            <i><FaUser /></i>
            <input type="text" className="input-field" placeholder="Username" />
          </div>

          <div className="input-group">
            <i><FaLock /></i>
            <input type="password" className="input-field" placeholder="Password" />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>

          <div className="buttons">
            <button type="submit" className="login-button">Login</button>
            <button className='signup-button'>Sign Up</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
