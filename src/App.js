// src/App.js
import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import MainDashboard from './components/HomeMainDashboard'; // Import your Layout component

import Home from './pagess/Home';
import About from './pagess/About';
import StaffLogin from './components/StaffLogin';
import Student from './pagess/Student';
import Gallery from './pagess/Gallery';
import Courses from './pagess/Courses';
import Blog from './pagess/Blog';
import Contact from './pagess/Contact';
import Services from './pagess/Services';
import Help from './pagess/Help';
import StaffSignup from './pagess/StaffSignup';
import Certifications from './pagess/Certifications';
import Careers from './pagess/Careers';
import Tutors from './pagess/Tutors';
import Webinars from './pagess/Webinars';
import Ebooks from './pagess/Ebooks';
import FAQ from './pagess/Faq';
import DashbordStudent from './pagess/DashbordStudent';
import Admin from './pagess/Admin';
import ForgotPassword from './pagess/Forgetpasswordstu';
import StaffTaskCenter from './pagess/StaffTaskCenter';
import StudentNotificationCenter from './pagess/StudentNotificationCenter';

/* Staff components */
import Staffhome from './Staff/HomepageStaff';
import staffLogin from './Staff/StaffLogin1';
import StaffReg from './Staff/StaffReg1';
import Form from './Staff/InsertNewStudent';
import AttendancePage from './Staff/Attendance';
import Dashboard1 from './Staff/StaffDashboard';
import AddAttendance from './Staff/AttendanceStudent';
import VideoForm from './Staff/VideoForm';
import staffTaskCenter from './Staff/StaffTaskCenter';
import StudentView from './Staff/StudentView';
import Attendanceupdate from './Staff/AttendanceUpdate';
import AttendanceUpdate1 from './Staff/Testing';
import BatchManagement from './Staff/BatchManagement';
import StaffNotification from './Staff/StaffNotification';
import ResumeViewed from './Staff/ResumeViewed';
import UpdateStaff from './Staff/UpdateStaff';

/*Student components */
import HomeStudent from './Students/HomeStudent';
import StudentReg1 from './Students/StudentReg1';

/*Admin components*/
import AdminDashboard from './Admin/AdminDashboard';
import AdminStaff from './Admin/AdminStaff';
import AdminStudents from './Admin/AdminStudent';
import AdminLogin from './Admin/AdminLogin';
import Adminreg from './Admin/Adminreg';
import PlacementActivitie from './Admin/PlacementActivite';
import AdminNotification from './Admin/AdminNotification';
import Settings from './Admin/Settings';
import ReportAnalysis from './Admin/ReportAnalysis';

import { TaskProvider } from './pagess/TaskContext';

export let logincontext = createContext();
function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [token, setToken] = useState('');
  return (
    <TaskProvider>
      <Router>
      <logincontext.Provider value={[[ isAuthenticated, setIsAuthenticated], [token, setToken]]}>
        
          <Routes>
            {/* Main Dash Board */}

            <Route path="/" element={<MainDashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/staff" element={<StaffLogin />} />
            <Route path="/student" element={<Student />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/help" element={<Help />} />
            <Route path="/staffsignup" element={<StaffSignup />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/studentreg" element={<StudentReg1 />} />
            <Route path="/dashbordstudent" element={<DashbordStudent />} />
            <Route path="/forgetpasswordstu" element={<ForgotPassword />} />
            <Route path="/StaffTaskCenter" element={<StaffTaskCenter />} />
            <Route path="/StudentNotificationCenter" element={<StudentNotificationCenter />} />
            {/* Staff Dash Board */}
            <Route path="/staffdashboard" element={<Staffhome />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/testing" element={<AttendanceUpdate1 />} />
            <Route path="/batch" element={<BatchManagement />} />
            <Route path="/updateStaff" element={<UpdateStaff />} />
            <Route path="/notifications" element={<StaffNotification />} />
            <Route path="/ResumeView" element={<ResumeViewed />} />
            <Route path="/StaffReg1" element={<StaffReg />} />
            
              {/* Admin Dash Board */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/staffs" element={<AdminStaff />} />
            <Route path="/student" element={<AdminStudents />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/adminreg" element={<Adminreg />} />
            <Route path="/placement" element={<PlacementActivitie />} />
            <Route path="/notifi" element={<AdminNotification />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<ReportAnalysis />} />

             
            {/* Student Dash Board */}
            <Route path="/studentdashbord" element={<HomeStudent />} />
            <Route path="/studentreg" element={<StudentReg1 />} />
          </Routes>
        </logincontext.Provider>
      </Router>
    </TaskProvider>
  );
}

export default App;
