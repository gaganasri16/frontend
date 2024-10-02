import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/DeleteStudent.css';

const DeleteStudent = () => {
  const [Student_Mobile, setStudent_Mobile] = useState('');
  const [data, setData] = useState(null); // Change to null to better handle initial state
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    if (deleteStatus) {
      const timer = setTimeout(() => {
        setDeleteStatus(null); // Hide status message after 10 seconds
      }, 10000); // 10 seconds

      // Cleanup timeout if component unmounts or status changes
      return () => clearTimeout(timer);
    }
  }, [deleteStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStudentData(); // Fetch student data on form submit
  };

  const fetchStudentData = () => {
    axios.get(`http://127.0.0.1:8000/studentportal/Deletestudent/${Student_Mobile}`)
      .then((response) => {
        console.log(response.data); // Verify response data structure
        setData(response.data); // Store fetched data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDeleteStatus('Error fetching student record.');
      });
  };

  const deletstudent = () => {
    axios.delete(`http://127.0.0.1:8000/studentportal/Deletestudent/${Student_Mobile}`)
      .then((response) => {
        console.log('Delete successful:', response.data);
        setDeleteStatus('Student record deleted successfully.');
        // Clear input field and data after successful deletion
        setStudent_Mobile('');
        setData(null); // Reset data
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        setDeleteStatus('Error deleting student record.');
      });
  };

  return (
    <div className='Delete_dashboard'>
      <div className='delete_form'>
        <div className="delete_content">
          {data === null ? (
            <form onSubmit={handleSubmit} className='delete_student_form'>
              <h2>Delete Student</h2>
              <input
                type="text"
                value={Student_Mobile}
                placeholder='Enter Mobile Number'
                onChange={(e) => setStudent_Mobile(e.target.value)}
                required
              />
              <button type="submit" className="submit-button">Submit</button>
              {deleteStatus && <p>{deleteStatus}</p>}
            </form>
          ) : (
            <div className="delete_details_view">
              <input
                type="text"
                value={data.student_id || ''}
                readOnly
              />
              <input
                type="text"
                value={data.username || ''}
                readOnly
              />
              <input
                type="text"
                value={data.email || ''}
                readOnly
              />
              <input
                type="text"
                value={data.batch || ''}
                readOnly
              />
              <input
                type="text"
                value={data.mobile_no || ''}
                readOnly
              />
              <input
                type="text"
                value={data.address || ''}
                readOnly
              />
              <input
                type="text"
                value={data.Qulification || ''}
                readOnly
              />
              <button className="delete-button" onClick={() => setData(null)}>Back to Form</button>
              <button className="delete-button" onClick={deletstudent}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteStudent;
