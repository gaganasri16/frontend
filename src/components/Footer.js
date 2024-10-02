// src/components/Footer.js
import React, { useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import companyLogo from '../assets/letter-v.png'; // Add your company logo here

const Footer = ({setView}) => {
  
  return (
    
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={companyLogo} alt="Company Logo" />
          </div>
          <div className="footer-sections">
            <div className="footer-section">
              <h3 className="footer-heading">Company</h3>
              <ul>
              <li><button onClick={() => setView('about')} className="footer-sidebar-button">About Us</button></li>
              <li><button onClick={() => setView('careers')} className="footer-sidebar-button">Careers</button></li>
              <li><button onClick={() => setView('contact')} className="footer-sidebar-button">Contact</button></li>

              </ul>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Learn</h3>
              <ul>
              <li><button onClick={() => setView('courses')} className="footer-sidebar-button">Courses </button></li>
              <li><button onClick={() => setView('certifications')} className="footer-sidebar-button">Certifications</button></li>
              <li><button onClick={() => setView('tutors')} className="footer-sidebar-button">Tutors</button></li>
                
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Resources</h3>
              <ul>
              <li><button onClick={() => setView('blog')} className="footer-sidebar-button">Blog </button></li>
              <li><button onClick={() => setView('webinars')} className="footer-sidebar-button">Webinars</button></li>
              <li><button onClick={() => setView('ebooks')} className="footer-sidebar-button">Ebooks</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Support</h3>
              <ul>
              <li><button onClick={() => setView('faq')} className="footer-sidebar-button">FAQ </button></li>
              <li><button onClick={() => setView('help')} className="footer-sidebar-button">Help Center</button></li>
              <li><button onClick={() => setView('support')} className="footer-sidebar-button">Customer Support</button></li>
              
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
          <div className="footer-info">
            <p>&copy; 2024 Vcube Software Solutions. All rights reserved.</p>
            <p>Made with ❤️ by Your Company</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
