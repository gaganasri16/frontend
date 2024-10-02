import React, { useState } from 'react';
import axios from 'axios';
import '../Staff/ResumeViewed.css';

const ResumeViewed = () => {
  const [batchId, setBatchId] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [message, setMessage] = useState('');

  const handleBatchChange = (e) => {
    setBatchId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://127.0.0.1:8000/studentportal/get-student-info/${batchId}/`);
      if (response.data.length > 0) {
        setResumeData(response.data);
        setMessage('');
      } else {
        setResumeData(null);
        setMessage('No student info found for the selected batch.');
      }
    } catch (error) {
      console.error('Error fetching student info:', error);
      setMessage('Error fetching student info.');
    }
  };

  return (
    <div className="staff-resume-view">
      <h2>Search by Batch ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={batchId}
          onChange={handleBatchChange}
          placeholder="Enter Batch ID"
          required
        />
        <button type="submit">Search</button>
      </form>

      {message && <p>{message}</p>}

      {resumeData && (
        <div className="resume-info">
          {resumeData.map((info, index) => (
            <div key={index} className="resume-item">
              <p>{info.text}</p>
              <a href={`http://127.0.0.1:8000${info.resume_url}`} target="_blank" rel="noopener noreferrer">
                View/Download Resume
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeViewed;
