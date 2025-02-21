import React from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';  // Icons for username & password

const LoginPage = () => {
  return (
    <div 
      className="login-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/movie.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="login-box">
        <h1>Cinema E-Booking Login</h1>
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

          <button type="submit" className="login-button">Login</button>

          <div className="signup">
            <p>Sign Up</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
