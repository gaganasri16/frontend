import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Staff/Newstudentupdate.css';

const NewStudentUpdate = () => {
  const [studentMobile, setStudentMobile] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showInitialForm, setShowInitialForm] = useState(true);
  const [data, setData] = useState({
    username: '',
    mobile_no: '',
    email: '',
    batch: '',
    amount_paid: '',
    fee_status: '',
    total_amount: ''
  });

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/studentportal/updatestudentget/${studentMobile}`)
      .then((response) => {
        console.log('Fetched data:', response.data);
        if (response.data) {
          const studentData = response.data;
          setData({
            username: studentData.userrole.username,
            mobile_no: studentData.mobile_no.toString(), // Ensure mobile_no is a string
            email: studentData.userrole.email,
            batch: studentData.batch,
            amount_paid: studentData.fee.amount_paid,
            fee_status: studentData.fee.fee_status,
            total_amount: studentData.fee.total_amount
          });
          setShowForm(true);
          setShowInitialForm(false);
        } else {
          console.warn('No data found for the provided mobile number.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBackToForm = () => {
    setShowForm(false);
    setShowInitialForm(true);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log('Updated data:', data);

    axios.put(`http://127.0.0.1:8000/studentportal/updatestudent/${studentMobile}/`, {
      username: data.username,
      email: data.email,
      mobile_no: data.mobile_no,
      batch: data.batch,
      amount_paid: data.amount_paid,
      fee_status: data.fee_status,
      total_amount: data.total_amount
    })
      .then(response => {
        console.log('Data updated successfully:', response.data);
        // Optionally, show a success message or handle further actions
      })
      .catch(error => {
        console.error('Error updating data:', error);
        // Optionally, show an error message to the user
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowInitialForm(false);
  };

  return (
    <div className={`Dashboardkosam ${!showForm && !showInitialForm ? 'hidden' : ''}`}>
      <div className='new-student-update-container'>
        <div className='new-student-update-form'>
          {showInitialForm && !showForm ? (
            <form onSubmit={handleMobileNumberSubmit} className='update_form'>
              <div className="fas fa-times close-button" onClick={handleCloseForm}></div>
              <h2>Update Student Registration</h2>
              <input
                type="text"
                value={studentMobile}
                placeholder='Enter Mobile Number'
                onChange={(e) => setStudentMobile(e.target.value)}
                required
              />
              <br />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          ) : (
            <div className="student-registration-form">
              <div className="form-header">
                <div className="fas fa-arrow-left back-arrow" onClick={handleBackToForm}></div>
                <h2>Update Student Information</h2>
                <div className="fas fa-times close-button" onClick={handleCloseForm}></div>
              </div>
              <form className='form-content' onSubmit={handleFinalSubmit}>
                <div className='form-row'>
                  <label htmlFor="username" className="form-label">Name:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={data.username}
                    placeholder="Enter Student Full Name"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="mobile_no" className="form-label">Phone Number:</label>
                  <input
                    type="tel"
                    id="mobile_no"
                    name="mobile_no"
                    value={data.mobile_no}
                    placeholder="Enter Student Phone Number"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    placeholder="Enter Student Email"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="batch" className="form-label">Batch No:</label>
                  <input
                    type="text"
                    id="batch"
                    name="batch"
                    value={data.batch}
                    placeholder="AB-00"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="total_amount" className="form-label">Total Amount:</label>
                  <input
                    type="number"
                    id="total_amount"
                    name="total_amount"
                    value={data.total_amount}
                    onChange={handleFeeChange}
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="amount_paid" className="form-label">Paid Fee Amount:</label>
                  <input
                    type="text"
                    id="amount_paid"
                    name="amount_paid"
                    value={data.amount_paid}
                    onChange={handleFeeChange}
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="fee_status" className="form-label">Paid Fee Status:</label>
                  <select
                    id="fee_status"
                    name="fee_status"
                    value={data.fee_status}
                    onChange={handleFeeChange}
                    className="form-input"
                  >
                    <option value="">Select status</option>
                    <option value="fullyPaid">Fully Paid</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Not Paid</option>
                  </select>
                </div>

                <div className='form-row'>
                  <button type="submit" className="submit-button">Submit</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewStudentUpdate;
