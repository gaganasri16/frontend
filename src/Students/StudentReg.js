import React, { useState } from 'react';
import axios from 'axios';
import '../Students/StudentReg.css';

const StudentReg = () => {
  const [formData, setFormData] = useState({
    StaffName: '',
    secondname: '',
    password: '',
    conformpassword: '',
    phoneNumber: '',
    gender: '',
    email: '',
    simage: null,
    address: '',
    fullname: '',
    Qulification: '' // Add this field to state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === 'StaffName' || name === 'secondname') {
        newData.fullname = `${newData.StaffName} ${newData.secondname}`.trim();
      }
      return newData;
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      simage: e.target.files[0] // Store the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.conformpassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }
    if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    if (formData.StaffName === formData.secondname) {
      alert('First Name and Second Name cannot be the same.');
      return;
    }

    // Prepare form data for submission
    const postData = new FormData();
    postData.append('password', formData.password);
    postData.append('address', formData.address);
    postData.append('phoneNumber', formData.phoneNumber);
    postData.append('gender', formData.gender);
    
    postData.append('Qulification', formData.Qulification); // Add this field
    if (formData.simage) {
      postData.append('simage', formData.simage);
    }
    console.log('Image URL:', imageUrl);


    try {
      const response = await axios.post(`http://127.0.0.1:8000/studentportal/studentAccount/${formData.phoneNumber}/`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Use multipart/form-data for file uploads
        }
      });
      console.log('Response Data:', response.data);

      // Reset form fields
      setFormData({
        StaffName: '',
        secondname: '',
        password: '',
        conformpassword: '',
        phoneNumber: '',
        gender: '',
        email: '',
        simage: null,
        address: '',
        fullname: '',
        Qulification: '' // Reset this field
      });
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="registration-form-container1">
      <h2>Registration</h2>
      <form className="registration-form1" onSubmit={handleSubmit}>
        <div className="form-row1">
          <div className="form-group11">
            <label>First Name</label>
            <input
              type="text"
              name="StaffName"
              value={formData.StaffName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="form-group11">
            <label>Last Name</label>
            <input
              type="text"
              name="secondname"
              value={formData.secondname}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="form-group11">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group11">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="form-group11">
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
          <div className="form-group11">
            <label>Confirm Password</label>
            <input
              type="password"
              name="conformpassword"
              value={formData.conformpassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="form-group11">
            <label>Image</label>
            <input
              type="file"
              name="simage"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group11">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="form-group11">
            <label>Qualification</label>
            <input
              type="text"
              name="Qulification"
              value={formData.Qulification}
              onChange={handleChange}
              placeholder="Enter Qualification"
              required
            />
          </div>
        </div>
        <div className="form-group gender-group1">
          <div className="gender-options1">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <p className="sign-in-text1">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default StudentReg;
