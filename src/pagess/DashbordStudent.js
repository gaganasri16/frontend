import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashbordStudent.css'; // Your CSS file for styling
import logo from '../assets/logo.jpeg';
import bodyimg from '../assets/studash.jpeg';
import { PieChart } from 'react-minimal-pie-chart';

const StudentDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  const studentData = {
    name: "HARI KRISHNA",
    course: "Full Stack Python",
    examMarks: 85,
    mockMarks: 90,
    attendance: 95
  };

  const data = [
    { title: 'Exam Marks', value: studentData.examMarks, color: '#FF6384' },
    { title: 'Mock Marks', value: studentData.mockMarks, color: '#36A2EB' },
    { title: 'Attendance', value: studentData.attendance, color: '#FFCE56' }
  ];

  const handlePerformanceClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLogout = () => {
    // Logic to handle logout (e.g., clearing auth tokens, etc.)
    // For now, just setting the logout message and redirecting
    setLogoutMessage('Logout successfully');
    setTimeout(() => {
      navigate('/Student'); // Redirect to login page
    }, 500); // Delay to allow message display
  };

  return (
    <div>
      <div className="under-construction1">
        <img src={logo} className="logo1" alt="Logo" />
        <nav className="nav1">
          <a href="#home">Home</a>
          <a href="#class-videos">Class Videos</a>
          <a href="#services">Services</a>
          <a href="#student-performance" onClick={handlePerformanceClick}>Student Performance</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          <button className="sign" onClick={handleLogout}>Logout</button>
        </nav>
      </div>

      <div id="home" className='content10'>
        <div className="text1">
          <h1>Welcome To The VSMS</h1>
          <p>Challenge yourself to reach new heights; believe in your abilities and strive for excellence.</p>
          <button className="read-more1">Read More</button>
        </div>
        <div className="construction-image1">
          <img src={bodyimg} alt="Under Construction" />
        </div>
      </div>

      <div id="home-details" className="extra-content">
        <h2>Your Path to Success</h2>
        <p>At VSMS, we provide the tools and resources necessary for your academic and personal growth. Here are some highlights:</p>
        <ul>
          <li><span className="tick">&#10003;</span> <strong>Interactive Learning:</strong> Engage with materials through videos and interactive sessions.</li>
          <li><span className="tick">&#10003;</span> <strong>Community Support:</strong> Join a community of learners and educators.</li>
          <li><span className="tick">&#10003;</span> <strong>Flexible Scheduling:</strong> Manage your time effectively with our flexible course options.</li>
        </ul>
        <h3>Upcoming Events</h3>
        <ul>
          <li><span className="tick">&#10003;</span> Workshop on "Future of AI" - July 25, 2024</li>
          <li><span className="tick">&#10003;</span> Guest Lecture Series - Every Friday at 3 PM</li>
          <li><span className="tick">&#10003;</span> Monthly Hackathon - Next on August 15, 2024</li>
        </ul>
      </div>

      <div id="class-videos" className="extra-content">
        <h2>Class Videos</h2>
        <p>Access a variety of class videos to enhance your learning experience.</p>
        <ul>
          <li><span className="tick">&#10003;</span> Introduction to Programming</li>
          <li><span className="tick">&#10003;</span> Advanced JavaScript Techniques</li>
          <li><span className="tick">&#10003;</span> Understanding React Fundamentals</li>
        </ul>
      </div>

      <div id="services" className="extra-content">
        <h2>Services</h2>
        <p>We offer a wide range of services to support your educational journey.</p>
        <ul>
          <li><span className="tick">&#10003;</span> <strong>Online Tutoring:</strong> Get personalized help from expert instructors.</li>
          <li><span className="tick">&#10003;</span> <strong>Course Materials:</strong> Downloadable resources to aid your studies.</li>
          <li><span className="tick">&#10003;</span> <strong>Performance Tracking:</strong> Regular updates on your progress and areas for improvement.</li>
        </ul>
      </div>

      {/* Student Performance Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="close-button" onClick={handleClosePopup}>X</div>
            <h2>Student Performance</h2>
            <div className="student-details">
              <p><strong>Name:</strong> {studentData.name}</p>
              <p><strong>Course:</strong> {studentData.course}</p>
              <p><strong>Exam Marks:</strong> {studentData.examMarks}</p>
              <p><strong>Mock Marks:</strong> {studentData.mockMarks}</p>
              <p><strong>Attendance:</strong> {studentData.attendance}%</p>
            </div>
            <div className="pie-chart">
              <PieChart
                data={data}
                lineWidth={60}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                  fill: '#121212'
                }}
                labelPosition={100 - 60 / 2}
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
              />
            </div>
          </div>
        </div>
      )}

      <div id="contact" className="extra-content">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to reach out!</p>
        <ul>
          <li><span className="tick">&#10003;</span> Email: support@vms.com</li>
          <li><span className="tick">&#10003;</span> Phone: +123-456-7890</li>
          <li><span className="tick">&#10003;</span> Office Hours: Monday to Friday, 9 AM - 5 PM</li>
        </ul>
      </div>

      <div id="about" className="extra-content">
        <h2>About Us</h2>
        <p>The V Cube Student Management System (VSMS) is designed to provide a comprehensive solution for managing student information and tracking performance.</p>
        <h3>Performance Overview</h3>
        <ul>
          <li><span className="tick">&#10003;</span> Attendance: Track your attendance and ensure you never miss a class.</li>
          <li><span className="tick">&#10003;</span> Grades: View your grades for various assessments.</li>
          <li><span className="tick">&#10003;</span> Skills: Identify your strengths and areas for improvement.</li>
        </ul>
        <h3>Features</h3>
        <ul>
          <li><span className="tick">&#10003;</span> Personalized Dashboard: Tailored information just for you.</li>
          <li><span className="tick">&#10003;</span> Course Materials: Easy access to class videos and notes.</li>
          <li><span className="tick">&#10003;</span> Support: Get help from instructors whenever needed.</li>
        </ul>
      </div>

      {/* Logout Success Message */}
      {logoutMessage && (
        <div className="logout-message">
          {logoutMessage}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
