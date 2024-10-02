import '../App.css';
import { useState } from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import StaffLogin from '../Staff/StaffLogin1';
import StaffReg from '../Staff/StaffReg1';
import Form from './InsertNewStudent';
import AttendancePage from '../Staff/Attendance';
import Dashboard1 from '../Staff/StaffDashboard';
import AddAttendance from '../Staff/AttendanceStudent';

import VideoForm from '../Staff/VideoForm';
import AttendanceUpdate from '../Staff/AttendanceUpdate';
import AttendanceUpdate1 from '../Staff/Testing';
import BatchManagement from '../Staff/BatchManagement';


import NewStudentUpdate from '../Staff/Newstudentupdate';
import StaffTaskCenter from '../Staff/StaffTaskCenter';
import DeleteStudent from '../Staff/DeleteStudent';
import StudentView from '../Staff/StudentView';
import UpdateStaff from '../Staff/UpdateStaff';
import StaffNotifications from '../Staff/StaffNotification';
import ResumeViewed from '../Staff/ResumeViewed';

function Staffhome() {
  const [view ,setView] = useState('false');
  
  const renderComponent = () => {
    switch (view) {
      case 'false':
        return ;
      case 'Form':
        return <Form/>;
      case 'update':
        return <NewStudentUpdate/>;
      case 'delete':
          return <DeleteStudent/>;
      case 'view':
            return <StudentView/>;
      case 'testing':
        return <AttendanceUpdate1/>;
      case 'Add':
          return <AttendancePage/>;
      case 'updateAttendence':
          return <AttendanceUpdate/>;
      case 'batch':
        return <BatchManagement/>;
      case 'video':
          return <VideoForm/>;
      case 'task':
            return <StaffTaskCenter/>;
      case 'updateStaff':
        return <UpdateStaff/>;
      case 'notifications':
        return <StaffNotifications/>;
      case 'ResumeViewed':
        return <ResumeViewed/>;
      default:
        return setView;
    }
  };

  return (
    <div>
      <Dashboard1 setView={setView} />
      {renderComponent()}
    </div>
  );
}
  
  export default Staffhome;