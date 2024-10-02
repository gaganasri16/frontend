import React, { useState } from 'react';
import axios from 'axios';
import '../Staff/videoForm.css';

const VideoForm = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null); // success or error

  // Retrieve token from localStorage
  const [token] = useState(localStorage.getItem('authToken'));

  const handleBatchNumberChange = (e) => {
    setBatchNumber(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (batchNumber && date && title && videoFile) {
      const formData = new FormData();
      formData.append('batch', batchNumber);
      formData.append('date', date);
      formData.append('title', title);
      formData.append('video_file', videoFile);

      try {
        const response = await axios.post('http://127.0.0.1:8000/studentportal/daily_videos/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer token format
            'Content-Type': 'multipart/form-data', // Explicitly set Content-Type for FormData
          },
        });

        if (response.status === 201) {
          setRegistrationStatus('success');
          // Optionally reset form fields
          setBatchNumber('');
          setDate('');
          setTitle('');
          setVideoFile(null);
        } else {
          setRegistrationStatus('error');
        }
      } catch (error) {
        setRegistrationStatus('error');
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    } else {
      setRegistrationStatus('error');
    }
  };

  return (
    <div className='video-cont'>
      <form className="video-form" onSubmit={handleSubmit}>
        <div className="video-form-group">
          <label htmlFor="video-batchNumber">Batch Number</label>
          <input
            type="text"
            id="video-batchNumber"
            value={batchNumber}
            onChange={handleBatchNumberChange}
            required
          />
        </div>
        <div className="video-form-group">
          <label htmlFor="video-date">Date</label>
          <input
            type="date"
            id="video-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="video-form-group">
          <label htmlFor="video-title">Title</label>
          <input
            type="text"
            id="video-title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="video-form-group">
          <label htmlFor="video-upload">Upload Video</label>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        
        {registrationStatus && (
          <div className={`message ${registrationStatus}`}>
            <p>{registrationStatus === 'success' ? 'Registration successful!' : 'Registration failed. Please try again.'}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default VideoForm;
