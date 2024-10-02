import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Students/studentInfoForm.css';

const StudentInfoForm = () => {
  const [text, setText] = useState('');
  const [resume, setResume] = useState(null);
  const [batch, setBatch] = useState('');
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch the list of batches from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/studentportal/batches/')
      .then(response => {
        setBatches(response.data);  // Set the fetched batches in state
      })
      .catch(error => {
        console.error('There was an error fetching the batches!', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('resume', resume);
    formData.append('batch', batch);

    try {
      const response = await axios.post('http://127.0.0.1:8000/studentportal/student-info/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Student info submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      setMessage('Error submitting the form.');
    }
  };

  return (
    <div>
      <h2>Submit Student Information</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Text Information:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Resume Upload:</label>
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Batch:</label>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          >
            <option value="">Select a Batch</option>
            {batches.map((batch) => (
              <option key={batch.batch_id} value={batch.batch_id}>
                ({batch.batch_id})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentInfoForm;