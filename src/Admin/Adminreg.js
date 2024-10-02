import React, { useState } from 'react';
import axios from 'axios';
import '../Admin/Adminreg.css';
import sideimage from '../assets/images/pro.jpg';

const Adminreg = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    // Prepare data to send to the backend
    const adminData = {
      userrole: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_Password: formData.confirmPassword // Ensure this field matches the backend expectations
      },
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/staffportal/createadmin/', adminData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      // Print and store the token
      const token = response.data.token;
      console.log('Token:', token);

      // Store the token in localStorage (or sessionStorage) for use in other parts of your app
      localStorage.setItem('adminToken', token);

      alert('Admin registered successfully!');
    } catch (error) {
      console.error('AxiosError:', error.response ? error.response.data : error.message);
      alert('Error registering admin. Please try again.');
    }

    // Reset form fields
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="registration-form-container">
      <div className="image-section">
        <img src={sideimage} alt="Registration Illustration" />
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Admin Registration</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <p className="sign-in-text">
          Already have an account? <a href="/admin/login">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Adminreg;
