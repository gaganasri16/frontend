import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/StaffTaskCenter.css';

const StaffTaskCenter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assuming the user is authenticated
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Get token from localStorage
  const [weeklyTestTask, setWeeklyTestTask] = useState('');
  const [labTask, setLabTask] = useState('');
  const [image, setImage] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [batchName, setBatchName] = useState('');
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    // Fetch batches when the component mounts
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/batches/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error.response ? error.response.data : error.message);
      }
    };

    fetchBatches();
  }, [token]);

  if (!isAuthenticated) {
    return <p>You need to log in to access this page.</p>;
  }

  const handleWeeklyTestChange = (e) => setWeeklyTestTask(e.target.value);
  const handleLabTaskChange = (e) => setLabTask(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleBatchChange = (e) => setSelectedBatch(e.target.value);

  const handleSubmit = async (taskType) => {
    const taskContent = taskType === 'Weekly Test' ? weeklyTestTask : labTask;
    const formData = new FormData();
    formData.append('task_type', taskType);
    formData.append('content', taskContent);
    formData.append('batch', selectedBatch);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://127.0.0.1:8000/studentportal/tasks/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Updated to Bearer token format
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Task submitted successfully!');
      setWeeklyTestTask('');
      setLabTask('');
      setImage(null);
      setSelectedBatch('');
    } catch (error) {
      console.error('Error submitting task:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='main_container1'>
      <div className="staff-task-center">
        <h2>Task Center</h2>
        <div className="task-card">
          <h3>Weekly Test Task</h3>
          <textarea 
            value={weeklyTestTask}
            onChange={handleWeeklyTestChange}
            placeholder="Write the task here..."
          ></textarea>
          <input type="file" name='image' accept="image/*" onChange={handleImageChange} />
          <select value={selectedBatch} onChange={handleBatchChange}>
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch.batch_id} value={batch.batch_id}>
                {batch.batch_name}
              </option>
            ))}
          </select>
          <button onClick={() => handleSubmit('Weekly Test')}>Send</button>
        </div>
        <div className="task-card">
          <h3>Lab Task</h3>
          <textarea 
            value={labTask}
            onChange={handleLabTaskChange}
            placeholder="Write the task here..."
          ></textarea>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <select value={selectedBatch} onChange={handleBatchChange}>
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch.batch_id} value={batch.batch_id}>
                {batch.batch_name}
              </option>
            ))}
          </select>
          <button onClick={() => handleSubmit('Lab Task')}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default StaffTaskCenter;