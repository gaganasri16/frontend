import React, { useEffect, useState } from 'react';
import './StaffReg1.css';
import axios from "axios";
import sideimage from '../assets/images/pro.jpg';

const StaffReg = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    StaffName: '',
    secondname: '',
    password: '',
    conformpassword: '',
    phoneNumber: '',
    gender: '',
    email: '',
    simage: '',
    address: '',
    Designation: '',
    fullName:'',
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/staffportal/staffdepsdata/')
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      fullName: (name === 'StaffName' || name === 'secondname') ? `${prevData.StaffName}${prevData.secondname}`.trim() : prevData.fullName,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      simage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.conformpassword) {
      alert('Password and Confirm Password do not match.');
    } else if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
    } else if (formData.StaffName === formData.secondname) {
      alert('First Name and Last Name cannot be the same.');
    } else if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
    } else {
  
      const formDataToSend = new FormData();
      formDataToSend.append('userrole.username', formData.StaffName);
      formDataToSend.append('userrole.email', formData.email);
      formDataToSend.append('userrole.password', formData.password);
      formDataToSend.append('mobile', formData.phoneNumber);
      formDataToSend.append('Gender', formData.gender);
      formDataToSend.append('Image', formData.simage); // Append the image file
      formDataToSend.append('address', formData.address);
      formDataToSend.append('desgination', formData.Designation);
  
      try {
        const response = await axios.post('http://127.0.0.1:8000/staffportal/staffregistration/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        console.log(response.data);
        // Handle success response
      } catch (error) {
        console.log('AxiosError:', error.response);
        // Handle error response
      }
  
      setFormData({
        StaffName: '',
        secondname: '',
        password: '',
        conformpassword: '',
        phoneNumber: '',
        gender: '',
        email: '',
        simage: '',
        address: '',
        Designation: '',
        fullName: '',
      });
    }
  };
  

  return (
    <div className="registration-form-container">
      <div className="image-section">
        <img src={sideimage} alt="Registration Illustration"  />
      </div>
      <form className="registration-form" onSubmit={handleSubmit} >
      <h2>Registration</h2>
        <div className="staff-form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="StaffName" value={formData.StaffName} onChange={handleChange} placeholder="Enter First Name" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="secondname" value={formData.secondname} onChange={handleChange} placeholder="Enter Last Name" required />
          </div>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone number" required />
          </div>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="conformpassword" value={formData.conformpassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="simage" onChange={handleImageChange} placeholder="Upload Image" required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required />
          </div>
        </div>
        <div className="staff-form-group1">
          <label className='form-group'>Designation</label>
          <select value={formData.Designation} onChange={handleChange} name='Designation' required>
            <option value="">Please select</option>
            {data.map((rec) => (
              <option key={rec.Department_id} value={rec.Department_id}>{rec.Departmentname}</option>
            ))}
          </select>
        </div>
        <div className="form-group gender-group">
          <div className="gender-options">
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />
              Other
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <p className="sign-in-text">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default StaffReg;
