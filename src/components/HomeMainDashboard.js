import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../pagess/Home';
import About from '../pagess/About';
import Gallery from '../pagess/Gallery';
import Courses from '../pagess/Courses';
import Blog from '../pagess/Blog';
import Contact from '../pagess/Contact';
import Services from '../pagess/Services';
import Help from '../pagess/Help';
import Webinars from '../pagess/Webinars';
import Tutors from '../pagess/Tutors';
import Certifications from '../pagess/Certifications';
import StaffLogin from '../components/StaffLogin';
import LoginStudent1 from '../pagess/Student';

//Admin components
import AdminDashboard  from '../Admin/AdminDashboard';
import FAQ from '../pagess/Faq';
import Footer from '../components/Footer';
import Careers from '../pagess/Careers';
import Ebooks from '../pagess/Ebooks';
//Student componets 
import StudentLogin1 from '../Students/StudentLogin';
import StudentReg1 from '../Students/StudentReg1';
//Staff componets 
import StaffReg from '../Staff/StaffReg1';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCertificate, faBookOpen, faUser, faUserGraduate, faEllipsisH, faQuestion, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faHome, faInfoCircle, faEnvelope, faConciergeBell, faImage, faVideo, faBlog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../components/HomeMainDashboard.css';
import logo from '../assets/logo.jpeg';
import AdminLogin from '../Admin/AdminLogin';
import Adminreg from '../Admin/Adminreg';

const MainDashboard = () => {
  const location = useLocation();
  const [view, setView] = useState(location.pathname.replace('/', '') || 'home');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    setView(location.pathname.replace('/', '') || 'home');
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderComponent = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'gallery':
        return <Gallery />;
      case 'courses':
        return <Courses />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'services':
        return <Services />;
      case 'help':
        return <Help />;
      case 'webinars':
        return <Webinars />;
      case 'tutors':
        return <Tutors />;
      case 'certifications':
        return <Certifications />;
      case 'stafflogin':
        return <StaffLogin setView={setView} />;
      case 'studentLogin':
        return <StudentLogin1 setView={setView} />;
      case 'admin':
        return <AdminLogin setView={setView} />;
      case 'adminreg':
        return <Adminreg setView={setView} />;
      case 'faq':
        return <FAQ />;
      case 'careers':
        return <Careers />;
      case 'ebooks':
        return <Ebooks />;
      case 'staffsignup':
        return <StaffReg  />;
      case 'studentreg':
        return <StudentReg1  />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`dashboard-container ${sidebarVisible ? 'sidebar-visible' : ''}`}>
      <header className="navbar">
        <div className="navbar-content">
          <ul className={`navbar-links ${sidebarVisible ? 'active' : ''}`}>
            <li><button onClick={() => setView('tutors')} className="nav-button"><FontAwesomeIcon icon={faBook} /> Tutors</button></li>
            <li><button onClick={() => setView('certifications')} className="nav-button"><FontAwesomeIcon icon={faCertificate} /> Certifications</button></li>
            <li><button onClick={() => setView('courses')} className="nav-button"><FontAwesomeIcon icon={faBookOpen} /> Courses</button></li>
            <li><button onClick={() => setView('stafflogin')} className="nav-button"><FontAwesomeIcon icon={faUser} /> Staff login</button></li>
            <li><button onClick={() => setView('studentLogin')} className="nav-button"><FontAwesomeIcon icon={faUserGraduate} /> Student login</button></li>
            <li className="nav-dropdown">
              <button className="dropbtn"><FontAwesomeIcon icon={faEllipsisH} /> More</button>
              <div className="dropdown-content">
                <button onClick={() => setView('faq')} className="dropdown-link"><FontAwesomeIcon icon={faQuestion} /> FAQ</button>
                <button onClick={() => setView('admin')} className="dropdown-link"><FontAwesomeIcon icon={faSignOut} /> Admin</button>
                <button onClick={() => setView('forgetpasswordstu')} className="dropdown-link"><FontAwesomeIcon icon={faSignOut} /> Forget Password</button>
                <button onClick={() => setView('stafftaskcenter')} className="dropdown-link"><FontAwesomeIcon icon={faSignOut} /> Staff Task Center</button>
                <button onClick={() => setView('studentnotificationcenter')} className="dropdown-link"><FontAwesomeIcon icon={faSignOut} /> Student Notification Center</button>
              </div>
            </li>
          </ul>
        </div>
      </header>
      <div className="main-layout">
        <nav className={`sidebar ${sidebarVisible ? 'sidebar-visible' : ''}`}>
          <div className="sidebar-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-menu">
            <li><button onClick={() => setView('home')} className="sidebar-button"><FontAwesomeIcon icon={faHome} /> Home</button></li>
            <li><button onClick={() => setView('about')} className="sidebar-button"><FontAwesomeIcon icon={faInfoCircle} /> About</button></li>
            <li><button onClick={() => setView('gallery')} className="sidebar-button"><FontAwesomeIcon icon={faImage} /> Gallery</button></li>
            <li><button onClick={() => setView('blog')} className="sidebar-button"><FontAwesomeIcon icon={faBlog} /> Blog</button></li>
            <li><button onClick={() => setView('contact')} className="sidebar-button"><FontAwesomeIcon icon={faEnvelope} /> Contact</button></li>
            <li><button onClick={() => setView('services')} className="sidebar-button"><FontAwesomeIcon icon={faConciergeBell} /> Services</button></li>
            <li><button onClick={() => setView('help')} className="sidebar-button"><FontAwesomeIcon icon={faQuestionCircle} /> Help</button></li>
            <li><button onClick={() => setView('webinars')} className="sidebar-button"><FontAwesomeIcon icon={faVideo} /> Webinars</button></li>
          </ul>
        </nav>
        <main className="main-content">
          {renderComponent()}
        </main>
      </div>
      <div className='Main_footer'>
        <Footer setView={setView} />
      </div>
    </div>
  );
};

export default MainDashboard;
