import React, { useState } from 'react';
import axios from 'axios';
import '../Staff/StudentView.css';

const StudentView = () => {
  // State declarations
  const [batchNumber, setBatchNumber] = useState(''); // State for batch number input
  const [allStudents, setAllStudents] = useState(null); // State for storing all fetched student data
  const [filteredData, setFilteredData] = useState(null); // State for storing filtered student data
  const [feeStatus, setFeeStatus] = useState('paid'); // Default to 'paid'
  const [error, setError] = useState(''); // State for error messages

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAllStudents(); // Fetch all students by batch number
  };

  // Fetch all students by batch number
  const fetchAllStudents = () => {
    axios.get(`http://127.0.0.1:8000/studentportal/batch/${batchNumber}/students/`)
      .then((response) => {
        setAllStudents(response.data); // Store all students in state
        setFilteredData(response.data); // Initialize filtered data with all students
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      });
  };

  // Fetch students based on fee status
  const fetchFilteredData = () => {
    axios.get(`http://127.0.0.1:8000/studentportal/students-with-outstanding-fees/${batchNumber}/`, {
      params: { status: feeStatus } // Use fee status to filter the data from the API
    })
    .then((response) => {
      setFilteredData(response.data); // Store filtered data in state
      setError('');
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setError('Failed to fetch filtered data. Please try again later.');
    });
  };

  // Handle fee status change
  const handleFeeStatusChange = (e) => {
    setFeeStatus(e.target.value);
    fetchFilteredData(); // Fetch filtered data based on new fee status
  };

  return (
    <div className='viewbatch_dashboard'>
      <div className='viewbatch_form'>
        <div className="viewbatch_content">
          <form onSubmit={handleSubmit} className='viewbatch_student_form'>
            <h2>Fetch Student Records</h2>
            <input
              type="text"
              value={batchNumber}
              placeholder='Enter Batch Number'
              onChange={(e) => setBatchNumber(e.target.value)}
              required
            />
            <button type="submit" className="viewbatch_submit-button">Fetch Records</button>
          </form>

          {allStudents && (
            <div className='filter-container'>
              <h3>Filter by Fee Status</h3>
              <select
                id="feeStatus"
                value={feeStatus}
                onChange={handleFeeStatusChange}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          )}

          {error && <p className="error-message">{error}</p>} {/* Display error messages */}

          {filteredData && (
            <div className="viewbatch_data_table">
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Batch</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                    <th>Qualification</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(student => (
                    <tr key={student.student_id}>
                      <td>{student.student_id}</td>
                      <td>{student.userrole.username}</td>
                      <td>{student.userrole.email}</td>
                      <td>{student.batch}</td>
                      <td>{student.mobile_no}</td>
                      <td>{student.address}</td>
                      <td>{student.Qulification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
