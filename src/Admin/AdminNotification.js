import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/AdminNotification.css'; // Ensure you have relevant CSS for styling

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/placementnotifi/');
        const notifications = response.data;

        const now = new Date();
        const recentNotifications = notifications.filter(notification => {
          const createdAt = new Date(notification.created_at);
          return (now - createdAt) / (1000 * 60 * 60 * 24) <= 3;
        });

        recentNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setNotifications(recentNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div className="loading-container">Loading...</div>;

  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="notification-page">
      <header className="page-header">
        <h1>Notification Center</h1>
      </header>
      <section className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className="notification-card">
              <div className="notification-header">
                <h2 className="notification-title">{notification.name}</h2>
                <span className="notification-date">{new Date(notification.created_at).toLocaleDateString()}</span>
              </div>
              <div className="notification-body">
                <p><strong>Email:</strong> {notification.email}</p>
                <p><strong>Phone:</strong> {notification.phone_number}</p>
                <p><strong>Message:</strong> {notification.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notifications">No notifications found</p>
        )}
      </section>
    </div>
  );
};

export default AdminNotification;
