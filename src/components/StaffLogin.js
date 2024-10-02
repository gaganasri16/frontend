import React, { useState, useContext } from 'react';
import './StaffLogin.css';  // Ensure you create this file for custom styles
import sideImage from '../assets/staff.jpeg'; // Replace with the actual path to your image
import { useNavigate } from 'react-router-dom';
import { logincontext } from '../App';
import axios from 'axios';

function StaffLogin({ setView }) {
  const [Login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  let handleChange = (e) => {
    let { name, value } = e.target;
    setLogin({
      ...Login,
      [name]: value
    });
  };

  const navigate = useNavigate();
  let [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);

  let handleSubmit = (e) => {
    e.preventDefault();
    const loginUrl = 'http://127.0.0.1:8000/staffportal/staff-login/';
    const credentials = {
      username: Login.username,
      password: Login.password,
    };

    axios.post(loginUrl, credentials)
      .then((resp) => {
        if (resp.status === 200) {
          setToken(resp.data['token']);
          setIsAuthenticated(true);
          navigate('/staffdashboard');
        } else {
          setIsAuthenticated(false);
          setErrorMessage('Invalid credentials. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setIsAuthenticated(false);
        setErrorMessage(err.response?.data?.detail || 'Enter valid username and password.');
      });
  };

  return (
    <div className="staffLogin-container">
      <div className="staffLogin-left-side">
        <img src={sideImage} alt="Illustration" className="staffLogin-side-image" />
      </div>
      <div className="staffLogin-right-side">
        <form className="staffLogin-sign-in-form" onSubmit={handleSubmit}>
          <h2 className='staffLogin-head'>Sign In</h2>
          <div className="staffLogin-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="staffLogin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="staffLogin-form-group">
            <button type="submit" className="staffLogin-sign-in-button">Sign In</button>
          </div>
        
          <div className='staffLogin-forgot-password'>
            <a href="/forgetpasswordstu" className="staffLogin-forgot-password-link">Forgot Password?</a>
            <a className="staffLogin-signup-link" onClick={() => setView('staffsignup')}>Signup</a>
            
          </div>
          {errorMessage && (
            <div className="staffLogin-error-message">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;
