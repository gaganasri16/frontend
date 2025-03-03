import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminStaff.css'; // Import your CSS file

const AdminStaff = () => {
  const [staffDetails, setStaffDetails] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/staffportal/staffdetails/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStaffDetails(response.data);
      } catch (err) {
        setError('Error fetching staff details');
        console.error(err);
      }
    };

    fetchStaffDetails();
  }, [token]);

  return (
    <div className="all-staff-details">
      {error && <p className="error-message">{error}</p>}
      <div className="staff-buttons">
        <Link to="/StaffReg1">
          <button className="register-button">Register New Staff</button>
        </Link>
        <Link to="/updateStaff">
          <button className="update-button">Update Staff</button>
        </Link>
      </div>
      {staffDetails.length > 0 ? (
        <div className="staff-cards">
          {staffDetails.map(staff => {
            // Updated image URL handling
            const imageUrl = staff.Image ? `http://127.0.0.1:8000${staff.Image}` : 'default-image-url'; // Replace with default image URL if needed

            return (
              <div key={staff.userrole.email} className="staff-card">
                <img
                  src={imageUrl}
                  alt={staff.userrole.username}
                  className="staff-image"
                />
                <div className="staff-info">
                  <h4>{staff.userrole.username}</h4>
                  <p><strong>Email:</strong> {staff.userrole.email}</p>
                  <p><strong>Mobile:</strong> {staff.mobile}</p>
                  <p><strong>Address:</strong> {staff.address}</p>
                  <p><strong>Gender:</strong> {staff.Gender}</p>
                  <p><strong>Designation:</strong> {staff.desgination}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No staff available.</p>
      )}
    </div>
  );
};

export default AdminStaff;
