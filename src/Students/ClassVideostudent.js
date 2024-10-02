import React, { useState } from 'react';
import axios from 'axios';
import '../Students/ClassVideostudent.css';

const VideoApp = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [date, setDate] = useState('');
  const [videos, setVideos] = useState([]);
  const [showVideos, setShowVideos] = useState(false);

  // Retrieve token from localStorage
  const [token] = useState(localStorage.getItem('authToken'));

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVideos(); // Fetch videos based on user input
  };

  const handleBackToForm = () => {
    setShowVideos(false);
  };

  const fetchVideos = async () => {
    try {
      console.log('Fetching videos with:', { date, batchNumber });
      const response = await axios.get('http://127.0.0.1:8000/studentportal/daily_video', {
        params: {
          date: date,
          batch: batchNumber,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);
      setVideos(response.data);
      setShowVideos(true);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setShowVideos(false); // Optionally hide video list if an error occurs
    }
  };

  return (
    <div className="video-app">
      {!showVideos && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            placeholder="Enter Batch Number"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {showVideos && (
        <div className="video-list">
          <ul>
            {videos.length > 0 ? (
              videos.map((video) => (
                <li key={video.id} className="video-item">
                  <h2>{video.title}</h2>
                  <p>{new Date(video.upload_date).toLocaleDateString()} | Batch: {video.batch}</p>
                  <video controls className="video-player">
                    {/* Construct the full URL for the video source */}
                    <source src={`http://127.0.0.1:8000${video.video_file}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Download button */}
                  <a
                    href={`http://127.0.0.1:8000${video.video_file}`}
                    download
                    className="download-button"
                  >
                    Download Video
                  </a>
                </li>
              ))
            ) : (
              <p>No videos found for the selected batch and date.</p>
            )}
          </ul>
          <button className="back-button" onClick={handleBackToForm}>Back to Form</button>
        </div>
      )}
    </div>
  );
};

export default VideoApp;