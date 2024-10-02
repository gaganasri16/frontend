import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Admin/AdminLogin.css';  // Ensure this file exists and contains styles
import sideImage from '../assets/images/DPS.jpeg'; // Replace with the correct path to your image
import { logincontext } from '../App';

function AdminLogin() {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value
    }));
  };

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useContext(logincontext)[0];
  const [token, setToken] = useContext(logincontext)[1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginUrl = 'http://127.0.0.1:8000/staffportal/admin-login/';
    const credentials = {
      username: login.username,
      password: login.password,
    };

    try {
      const response = await axios.post(loginUrl, credentials);
      if (response.status === 200) {
        setToken(response.data.token);
        setIsAuthenticated(true);
        navigate('/admindashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setIsAuthenticated(false);
    }
  };

  const navigateToSignup = () => {
    navigate('/adminreg');
  };

  return (
    <div className="container1">
      <div className="left-side1">
        <img src={sideImage} alt="Illustration" className="side-image1"/>
      </div>
      <div className="right-side1">
        <form className="sign-in-form1" onSubmit={handleSubmit}>
          <h2 className='head'>Sign In</h2>
          <div className="form-group1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group1">
            <button type="submit" className="sign-in-button1">Sign In</button>
          </div>
          <div className='forgot_password1'>
            <a href="/forgot-password" className="forgot_password1">Forgot Password?</a>
            <a className="forgot_password1" onClick={navigateToSignup}>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
