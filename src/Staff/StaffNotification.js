import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/StaffNotifications.css'; // Ensure you have relevant CSS for styling

const StaffNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/notification/');
        setNotifications(response.data); // response.data contains the list of notifications
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Render loading state
  if (loading) return <div className="loading-container">Loading...</div>;

  // Render error state
  if (error) return <div className="error-container">{error}</div>;

  // Render notifications if data is available
  return (
    <div className="notification-container">
      <h1 className="notification-heading">Notification List</h1>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map(notification => (
            <li key={notification.id} className="notification-item">
              <div className="notification-content">
                <p><strong>Name:</strong> {notification.name}</p>
                <p><strong>Email:</strong> {notification.email}</p>
                <p><strong>Phone:</strong> {notification.phone_number}</p>
                <p><strong>Message:</strong> {notification.message}</p>
                <p><strong>Created At:</strong> {new Date(notification.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No notifications found</p>
      )}
    </div>
  );
};

export default StaffNotification;
