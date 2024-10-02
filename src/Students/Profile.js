import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../Students/Profile.css'; // Import the CSS file
import defaultProfileImage from '../assets/images/pro3.jpg'; // Updated to use a default image if necessary
import { logincontext } from '../App';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [Profile, setProfile] = useState({});
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    RollNo: '',
    username: '',
    batch: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    aboutMe: '',
    Image: '',
  });

  // useEffect to fetch data using Axios
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }

    const fetchData = async () => {
      try {
        const profileResp = await axios.get('http://127.0.0.1:8000/studentportal/view_loginuser_profile/', {
          headers: { 'Authorization': 'token ' + token }
        });
        const profileData = profileResp.data;

        // Update Profile and formData with fetched data
        setProfile(profileData);
        setFormData({
          RollNo: profileData.student_id || '',
          username: profileData.userrole?.username || '',
          batch: profileData.batch || '',
          email: profileData.userrole?.email || '',
          firstName: '', // Assuming you may want to split or handle differently
          lastName: '',  // Assuming you may want to split or handle differently
          address: profileData.address || '',
          city: '', // Assuming city is not included in the fetched data
          postalCode: '', // Assuming postalCode is not included in the fetched data
          aboutMe: '', // Assuming aboutMe is not included in the fetched data
          Image: profileData.Image || '',
        });
        console.log(profileData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const imageUrl = formData.Image ? `http://127.0.0.1:8000${formData.Image}` : defaultProfileImage;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="profile-main-container">
      <div className="continer000">
        <form className="user-profile-form" onSubmit={handleSubmit}>
          <h3>Edit Profile</h3>
          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" name="RollNo" value={formData.RollNo} disabled className="input-field" />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} disabled onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Batch Number</label>
            <input type="text" name="batch" value={formData.batch} disabled onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} disabled onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>About Me</label>
            <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} className="textarea-field" />
          </div>
          <button className="submit-btn" type="submit">Save</button>
        </form>
      </div>
      
      <div className="continer111">
        <div className="profile-preview">
          <img src={imageUrl} alt="Profile" className="profile-image"/>
          <h2>{formData.firstName} {formData.lastName}</h2>
          <p className="username">{formData.username}</p>
          <p className="about-me">{formData.aboutMe}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;