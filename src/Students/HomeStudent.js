import React, { useState } from 'react';
import Dashboard123 from '../Students/DashbordStudent';
import Sidebar from '../Students/SidebarStudent';
import '../Students/HomeStudent.css'; // Make sure this path is correct
import VideoApp from '../Students/ClassVideostudent';
import UserProfile from '../Students/Profile'; // Import UserProfile component
import StudentNotificationCenter from '../Students/StudentNotificationCenter';
import StudentInfoForm from '../Students/studentInfoForm';
import StudentLogin1 from '../Students/StudentLogin';

const HomeStudent = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userProfile, setUserProfile] = useState(null);

  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="student-wrapper"> {/* Updated class name */}
      <Sidebar onSidebarClick={handleSidebarClick} />
      <div className="student-main-content"> {/* Updated class name */}
        {/* Render component based on activeComponent state */}
        {activeComponent === 'dashboard' && <Dashboard123 profileData={userProfile} />}
        {activeComponent === 'profile' && <UserProfile profile={userProfile} />}
        {activeComponent === 'classvideo' && <VideoApp />}
        {activeComponent === 'notification' && <StudentNotificationCenter />}
        {activeComponent === 'about' && <StudentInfoForm/>}
        {/* Add more components as needed */}
      </div>
    </div>
  );
};

export default HomeStudent;
