import React, { useState } from 'react';
import './PlacementActivitie.css';
import images from '../assets/images/vector2.jpg';
import photo1 from '../assets/images/1.jpg';
import photo2 from '../assets/images/2.jpg';
import photo3 from '../assets/images/3.jpg';
import axios from 'axios'; // Import axios for API calls

const PlacementActivitie = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: ''
  });
  const [feedback, setFeedback] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, date: '2024-08-01', name: 'Google Recruitment Drive' },
    { id: 2, date: '2024-08-15', name: 'Microsoft Hackathon' },
    { id: 3, date: '2024-09-01', name: 'Amazon Interview Sessions' },
  ]);
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'John Doe', quote: 'V Cube helped me secure my dream job. Highly recommended!' },
    { id: 2, name: 'Jane Smith', quote: 'The interview preparation sessions were incredibly valuable.' },
  ]);

  const statistics = {
    placementPercentage: '90%',
    averageSalary: '$70,000',
    companiesVisited: 50,
  };

  const steps = [
    'Registration',
    'Resume Building',
    'Mock Interviews',
    'Company Presentations',
    'Aptitude Tests',
    'Technical Interviews',
    'HR Interviews',
    'Job Offers',
    'Job Application Assistance',
  ];

  const companyPartners = ['Google', 'Microsoft', 'Amazon', 'Facebook', 'IBM'];

  // Handle input change for application form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for application
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/studentportal/placementnotificreate/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponseMessage('Your message has been sent successfully!');
      setMessageType('success');
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        message: ''
      }); // Clear form fields
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message); // Log error details
      setResponseMessage('There was an error sending your message. Please try again later.');
      setMessageType('error');
    }
  };

  // Handle feedback form submission
  const handleSubmitFeedback = (event) => {
    event.preventDefault();
    if (feedback.trim() !== '') {
      alert(`Thank you for your feedback: ${feedback}`);
      setFeedback('');
    } else {
      alert('Please provide your feedback before submitting.');
    }
  };

  return (
    <div className="placement-activities-containers">
      <h1>Placement Activities</h1>

      {/* Overview Section */}
      <div className="overviews-section">
        <h2>Overview</h2>
        <p>
          At V Cube Software Solutions, we prioritize student placements to ensure successful career
          starts for our graduates. Explore our placement activities and see how we prepare students
          for the industry.
        </p>
        <div className="statistics">
          <h3>Key Statistics</h3>
          <ul>
            <li>Placement Percentage: {statistics.placementPercentage}</li>
            <li>Average Salary: {statistics.averageSalary}</li>
            <li>Companies Visited: {statistics.companiesVisited}</li>
          </ul>
        </div>
      </div>

      {/* Placement Process Section */}
      <div className="placement-process">
        <h2>Placement Process</h2>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className="support-services">
          <h3>Support Services</h3>
          <p>We provide comprehensive career counseling and interview preparation sessions.</p>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="success-stories">
        <h2>Success Stories</h2>
        <div className="student-testimonials">
          {testimonials.map(testimonial => (
            <blockquote key={testimonial.id}>
              "{testimonial.quote}" - <strong>{testimonial.name}</strong>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Placement Events Section */}
      <div className="placement-events">
        <h2>Placement Events</h2>
        <p>Stay updated with our upcoming placement events and past recruitment drives.</p>
        <div className="event-calendar">
          <h3>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.id}>
                {event.date} - {event.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="event-reports">
          <h3>Past Event Reports</h3>
          <p>Summary of past events and their outcomes.</p>
        </div>
      </div>

      {/* Partnerships and Collaborations Section */}
      <div className="partnerships">
        <h2>Partnerships and Collaborations</h2>
        <div className="company-partners">
          <h3>Our Partners</h3>
          <ul>
            {companyPartners.map((partner, index) => (
              <li key={index}>{partner}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Resources Section */}
      <div className="resources">
        <h2>Resources</h2>
        <div className="job-portals">
          <h3>Job Portals</h3>
          <p>Explore job opportunities through our partnered job portals.</p>
          <ul>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer">Indeed</a></li>
            <li><a href="https://www.naukri.com" target="_blank" rel="noopener noreferrer">Naukri</a></li>
          </ul>
        </div>
        <div className="interview-tips">
          <h3>Interview Tips</h3>
          <p>Prepare for your job interviews with our expert tips and resources.</p>
          <ul>
            <li>Research the company and role you're applying for.</li>
            <li>Practice common interview questions and answers.</li>
            <li>Dress appropriately and arrive on time.</li>
            <li>Bring copies of your resume and other necessary documents.</li>
            <li>Follow up with a thank-you email after the interview.</li>
          </ul>
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="interactive-features">
        <h2>Interactive Features</h2>
        <div className="feedback-forms">
          <h3>Feedback Form</h3>
          <form onSubmit={handleSubmitFeedback}>
            <textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              cols="50"
            ></textarea>
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
        <div className="live-chat">
          <h3>Live Chat</h3>
          <p>Chat live with our placement advisors for immediate assistance.</p>
        </div>
      </div>

      {/* Visual Content Section */}
      <div className="visual-content">
        <h2>Visual Content</h2>
        <div className="photos-videos">
          <h3>Photos and Videos</h3>
          <p>View snapshots and videos from our recent placement events.</p>
          <div className="photo-gallery">
            <img src={images} alt="Event Photo 1" />
            <img src={images} alt="Event Photo 2" />
            <img src={images} alt="Event Photo 3" />
            {/* Add more photos as needed */}
          </div>
          <div className="video-gallery">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Add more videos as needed */}
          </div>
        </div>
        <div className="infographics">
          <h3>Infographics</h3>
          <p>Visual representations of our placement statistics and success rates.</p>
          <div className="infographic-gallery">
            <img src={photo1} alt="Placement Percentage" />
            <img src={photo2} alt="Salary Statistics" />
            <img src={photo3} alt="Company Visits" />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="call-to-action">
        <h2>Ready to Begin Your Career Journey?</h2>
        <p>Contact our placement cell today to explore opportunities and get started.</p>
        <button className="apply-now-button" onClick={() => setShowModal(true)}>Apply Now</button>
      </div>

      {/* Modal for Application Form */}
      {showModal && (
        <div className="modal">
          <div className="modal-contents">
            <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Application Form</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} required />
            </div>
              <div className="form-group">
              <label htmlFor="phone_number">Phone</label>
              <input type="text" id="phone_number" name="phone_number" placeholder='Mobile No' value={formData.phone_number} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder='Write a message here...' value={formData.message} onChange={handleInputChange} required></textarea>
            </div>
              <button type="submit">Submit</button>
            </form>
            {responseMessage && (
              <div className={`response-message ${messageType}`}>
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementActivitie;
