import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [notificationTypes, setNotificationTypes] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('UTC');
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    searchEngineIndexing: true,
  });

  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, newRole.trim()]);
      setNewRole('');
      logUserAction(`Added role: ${newRole}`);
    }
  };

  const handleEditRole = (index) => {
    const updatedRole = prompt('Edit role:', roles[index]);
    if (updatedRole !== null) {
      const updatedRoles = roles.map((role, idx) => (idx === index ? updatedRole : role));
      setRoles(updatedRoles);
      logUserAction(`Edited role: ${roles[index]} to ${updatedRole}`);
    }
  };

  const handleDeleteRole = (index) => {
    const updatedRoles = roles.filter((_, idx) => idx !== index);
    setRoles(updatedRoles);
    logUserAction(`Deleted role: ${roles[index]}`);
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleNotificationTypeChange = (type) => {
    setNotificationTypes({ ...notificationTypes, [type]: !notificationTypes[type] });
  };

  const handleToggleSystemAlerts = () => {
    setSystemAlerts(!systemAlerts);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTimeZoneChange = (e) => {
    setTimeZone(e.target.value);
  };

  const handlePrivacySettingChange = (setting) => {
    setPrivacySettings({ ...privacySettings, [setting]: !privacySettings[setting] });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const saveSettings = () => {
    console.log('Settings saved:', {
      roles,
      notifications,
      systemAlerts,
      notificationTypes,
      profile,
      theme,
      language,
      timeZone,
      privacySettings,
    });
  };

  const logUserAction = (action) => {
    console.log(`User performed action: ${action}`);
  };

  const themeClass = theme === 'light' ? '' : 'dark-mode';

  return (
    <div className={`settings ${themeClass}`}>
      <h2 className="settings-title">Website Settings</h2>

      {/* User Roles & Permissions */}
      <section className="settings-section">
        <h3>User Roles & Permissions</h3>
        <div className="role-management">
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter new role"
            className="input-field"
          />
          <button className="btn btn-primary" onClick={handleAddRole}>Add Role</button>
          <ul className="role-list">
            {roles.map((role, index) => (
              <li key={index} className="role-item">
                {role}
                <div className="role-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditRole(index)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteRole(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Profile Settings */}
      <section className="settings-section">
        <h3>Profile Settings</h3>
        <div className="profile-management">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Name"
            className="input-field"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleProfileChange}
            placeholder="Password"
            className="input-field"
          />
          <button className="btn btn-primary" onClick={() => console.log('Profile updated')}>Update Profile</button>
        </div>
      </section>

      {/* Notifications Preferences */}
      <section className="settings-section">
        <h3>Notification Preferences</h3>
        <div className="notifications-management">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleToggleNotifications}
            />
            Enable Notifications
          </label>
          <div className="notification-types">
            <label>
              <input
                type="checkbox"
                checked={notificationTypes.email}
                onChange={() => handleNotificationTypeChange('email')}
              />
              Email Notifications
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationTypes.sms}
                onChange={() => handleNotificationTypeChange('sms')}
              />
              SMS Notifications
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationTypes.push}
                onChange={() => handleNotificationTypeChange('push')}
              />
              Push Notifications
            </label>
          </div>
        </div>
      </section>

      {/* System Alerts */}
      <section className="settings-section">
        <h3>System Alerts</h3>
        <div className="alerts-management">
          <label>
            <input
              type="checkbox"
              checked={systemAlerts}
              onChange={handleToggleSystemAlerts}
            />
            Enable System Alerts
          </label>
        </div>
      </section>

      {/* Language Settings */}
      <section className="settings-section">
        <h3>Language Settings</h3>
        <select value={language} onChange={handleLanguageChange} className="select-field">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </section>

      {/* Time Zone Settings */}
      <section className="settings-section">
        <h3>Time Zone Settings</h3>
        <select value={timeZone} onChange={handleTimeZoneChange} className="select-field">
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
        </select>
      </section>

      {/* Privacy Settings */}
      <section className="settings-section">
        <h3>Privacy Settings</h3>
        <div className="privacy-settings">
          <label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
              className="select-field"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            Profile Visibility
          </label>
          <label>
            <input
              type="checkbox"
              checked={privacySettings.searchEngineIndexing}
              onChange={() => handlePrivacySettingChange('searchEngineIndexing')}
            />
            Allow Search Engine Indexing
          </label>
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="settings-section">
        <h3>Theme Settings</h3>
        <button className="btn btn-primary" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </section>

      {/* Save Settings */}
      <section className="settings-section">
        <button className="btn btn-save" onClick={saveSettings}>Save Settings</button>
      </section>
    </div>
  );
};

export default Settings;
