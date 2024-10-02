import React, { useState } from 'react';
import './AdminDashboard.css';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaBell, FaCog, FaChartLine, FaBook } from 'react-icons/fa';
import AdminStaff from '../Admin/AdminStaff';
import AdminStudent from '../Admin/AdminStudent';
import AdminNotification from '../Admin/AdminNotification';
import Courses from '../pagess/Courses';
import ReportAnalysis from '../Admin/ReportAnalysis';
import PlacementActivitie from '../Admin/PlacementActivite';

const AdminDashboard = () => {
  // State to manage the selected section
  const [selectedSection, setSelectedSection] = useState('');

  const renderContent = () => {
    switch (selectedSection) {
      case 'staffs':
        return <AdminStaff />;
      case 'student':
        return <AdminStudent />;
      case 'placement':
        return <PlacementActivitie />;
      case 'courses':
        return <Courses />;
      case 'notifi':
        return <AdminNotification />;
      case 'reports':
        return <ReportAnalysis />;
      default:
        return ;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => setSelectedSection('staffs')}><FaUsers /> Staff</li>
            <li onClick={() => setSelectedSection('student')}><FaChalkboardTeacher /> Students</li>
            <li onClick={() => setSelectedSection('placement')}><FaCalendarAlt /> Placement</li>
            <li onClick={() => setSelectedSection('courses')}><FaBook /> Courses</li>
            <li onClick={() => setSelectedSection('notifi')}><FaBell /> Notifications</li>
            <li onClick={() => setSelectedSection('reports')}><FaChartLine /> Report Analysis</li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        
        <main>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
