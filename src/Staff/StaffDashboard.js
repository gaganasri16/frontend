import React, { useState, useEffect, useContext } from 'react';
import '../Staff/StaffDashborad.css';
import logo from '../assets/images/V-CUBE-Logo.jpg';
import { logincontext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard1 = ({ setView }) => {
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);
  const navigate = useNavigate();
  const [Profile, setProfile] = useState(null); // Initialize as null

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/staffdashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const profileResp = await axios.get('http://127.0.0.1:8000/staffportal/staffloginprofile/', {
          headers: { 'Authorization': 'token ' + token }
        });
        setProfile(profileResp.data);
        console.log(profileResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, token]);

  const imageUrl = Profile?.Image ? `http://127.0.0.1:8000${Profile.Image}` : null;

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setIsAuthenticated(false);
    setToken(null);
    navigate('/'); // Redirect to the homepage or login page
  };

  return (
    <div className='staff-background'>
      <header className="staff-header">
        <nav className="staff-navbar">
          <div className="staff-navbar-left">
            <div className="staff-logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <div className="staff-navbar-middle">
            <div onClick={() => setView('false')} className="staff-navbar-item">Home</div>
            <div className="staff-dropdown">
              <span className="staff-dropdown-trigger" onClick={() => setView('false')}>Student Register</span>
              <div className="staff-dropdown-content">
                <div onClick={() => setView('Form')} className="staff-dropdown-item">Insert Student</div>
                <div onClick={() => setView('update')} className="staff-dropdown-item">Update Student</div>
                <div onClick={() => setView('delete')} className="staff-dropdown-item">Delete Student</div>
                <div onClick={() => setView('view')} className="staff-dropdown-item">View Student</div>
                <div onClick={() => setView('batch')} className="staff-dropdown-item">Add Batches</div>
              </div>
            </div>
            <div className="staff-dropdown">
              <span className="staff-dropdown-trigger" onClick={() => setView('false')}>Attendance</span>
              <div className="staff-dropdown-content">
                <div onClick={() => setView('testing')} className="staff-dropdown-item">Insert Attendance</div>
                <div onClick={() => setView('updateAttendence')} className="staff-dropdown-item">Update Attendance</div>
                <div onClick={() => setView('Attendancepage')} className="staff-dropdown-item">Delete Attendance</div>
                <div onClick={() => setView('updateStaff')} className="staff-dropdown-item">Update Staff</div>
              </div>
            </div>
            <div onClick={() => setView('video')} className="staff-navbar-item">Class Videos</div>
            <div onClick={() => setView('task')} className="staff-navbar-item">Tasks</div>
            <div onClick={() => setView('notifications')} className="staff-navbar-item">Notification</div>
            <div onClick={() => setView('ResumeViewed')} className="staff-navbar-item">ResumeView</div>
          </div>
          <div className="staff-navbar-right">
            <div className="staff-profile">
              {Profile ? (
                <img 
                  src={imageUrl} 
                  alt={Profile.userrole ? Profile.userrole.username : 'Profile'} 
                  className="profile-image" 
                />
              ) : (
                'Loading...'
              )}
              <a href='#' onClick={handleLogout} className="staff-logout">Logout</a>
            </div>
          </div>
        </nav>
        <div className='staff-content'>
          <h1>Welcome to VSMS</h1>
          <p>"Your dedication and commitment are essential to our team's success.<br /> Let's continue to collaborate and achieve our goals together."</p>
        </div>
      </header>
      <div className='staff-next-box'>
        <h2 className='staff-h2'>Our Missions</h2>
        <div className="staff-features">
          <div className="staff-feature">
            <h2>Daily Tasks</h2>
            <p>Check Each And Every Batch Given To The Tasks.</p>
            <p>Check The Given Tasks Are Completed Or Not.</p>
          </div>

          <div className="staff-feature">
            <h2>Weekly Mock Interviews</h2>
            <p>Conducting Mock Interviews for Every Batch.</p>
            <p>Discuss What Went Well.</p>
          </div>

          <div className="staff-feature">
            <h2>Monthly Reviews</h2>
            <p>Reviews On Mock Interviews, Weekly Tests, Case Studies, Placement Assistance.</p>
          </div>

          <div className="staff-feature">
            <h2>Feedback about Training Session</h2>
            <p className='staff-p'>Feedback About Python Class, Aptitude Class, & Labs.</p>
          </div>
        </div>
      </div>
      <div className="staff-footer">
        <p>&copy; 2024 VSMC. All rights reserved.</p>
        <p>
          <a href='#'>Privacy Policy</a> |
          <a href='#'>Terms of Service</a> |
          <a href='#'>Contact Us</a>
        </p>
      </div>
    </div>
  );
}

export default Dashboard1;
