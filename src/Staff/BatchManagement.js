import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Staff/BatchManagement.css';

const BatchManagement = () => {
  const [batchId, setBatchId] = useState('');
  const [batchName, setBatchName] = useState('');
  const [message, setMessage] = useState('');
  const [batches, setBatches] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/batches/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
        setMessage('Failed to fetch batches. Please try again later.');
      }
    };

    fetchBatches();
  }, [token]);

  const handleCreateBatch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/studentportal/createnewbatch/', 
        { batch_id: batchId, batch_name: batchName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage(response.data.message);
      setBatchId('');
      setBatchName('');
      // Refresh the batch list after creating a new batch
      const updatedResponse = await axios.get('http://127.0.0.1:8000/studentportal/batches/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBatches(updatedResponse.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setMessage('Error creating batch: ' + (error.response.data.message || 'Unknown error'));
      } else if (error.request) {
        console.error('Error request:', error.request);
        setMessage('Error creating batch: No response from server.');
      } else {
        console.error('Error message:', error.message);
        setMessage('Error creating batch: ' + error.message);
      }
    }
  };
  
  return (
    <div className='batch-management'>
      <h2>Batch Management</h2>
      
      {/* Create New Batch Form */}
      <div>
        <h3>Create New Batch</h3>
        <form onSubmit={handleCreateBatch}>
          <div>
            <label htmlFor="batchId">Batch ID:</label>
            <input
              type="text"
              id="batchId"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              required
            />
            <label htmlFor="batchName">Batch Name:</label>
            <input
              type="text"
              id="batchName"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Batch</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* View Batches List */}
      <div className='view-batch'>
        <h3>View Batches</h3>
        <ul>
          {batches.map((batch) => (
            <li key={batch.batch_id}>
              <Link to={`/batch/${batch.batch_id}/students/`}>
                {batch.batch_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BatchManagement;
