// src/components/Webinars.js
import React from 'react';
import './Webinars.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const webinars = [
  {
    title: 'Python Full Stack',
    date: 'August 15, 2024',
    description: 'Learn Python for both front-end and back-end development.',
    speaker: 'MR.Srinivas',
  },
  {
    title: 'Java Full Stack',
    date: 'September 10, 2024',
    description: 'Master Java development across the full stack.',
    speaker: 'MR.Vishwanth',
  },
  {
    title: 'DevOps Testing Tools',
    date: 'October 5, 2024',
    description: 'Explore various testing tools in DevOps pipelines.',
    speaker: 'MR.madhukar',
  },
  {
    title: 'Web Development Fundamentals',
    date: 'November 20, 2024',
    description: 'Learn the basics of web development and building websites.',
    speaker: 'MR.Srinivas',
  },
  {
    title: 'Digital Marketing Strategies',
    date: 'December 15, 2024',
    description: 'Discover effective digital marketing strategies and tactics.',
    speaker: 'MR.Akhil',
  },
];

const Webinars = () => {
  const webinarIcon = '🎓'; // Updated icon symbol for all webinars

  return (
    <div className="webinars-container">
      <h1 className="webinars-title">Upcoming Webinars</h1>
      <div className="webinars-list">
        {webinars.map((webinar, index) => (
          <div key={index} className="webinar-card">
            <div className="webinar-icon">{webinarIcon}</div>
            <h2 className="webinar-title">{webinar.title}</h2>
            <p className="webinar-date">{webinar.date}</p>
            <p className="webinar-description">{webinar.description}</p>
            <p className="webinar-speaker">Speaker: {webinar.speaker}</p>
            <Link to="/contact" className="enroll-button">Enroll</Link> {/* Added Enroll button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webinars;
