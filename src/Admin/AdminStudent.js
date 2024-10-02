import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/AdminStudents.css'; // Ensure to add your styles here

const AdminStudent = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [students, setStudents] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [feeStatus, setFeeStatus] = useState('paid'); // Default to 'paid'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

    // Set up headers for authorization
    const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Fetch batches
    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/studentportal/batches/', axiosConfig);
                setBatches(response.data);
            } catch (error) {
                console.error('Error fetching batches:', error);
                setError('Failed to fetch batches. Please try again later.');
            }
        };

        fetchBatches();
    }, [axiosConfig]);

    // Fetch students for selected batch
    useEffect(() => {
        if (selectedBatchId) {
            fetchStudents();
        } else {
            setStudents([]);
            setFilteredData([]);
        }
    }, [selectedBatchId]);

    // Fetch all students by batch number
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/studentportal/batch/${selectedBatchId}/students/`, axiosConfig);
            setStudents(response.data);
            setFilteredData(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch students. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch students based on fee status
    const fetchFilteredData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/studentportal/students-with-outstanding-fees/${selectedBatchId}/`, {
                ...axiosConfig,
                params: { status: feeStatus }
            });
            setFilteredData(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch filtered data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Handle fee status change
    const handleFeeStatusChange = (e) => {
        setFeeStatus(e.target.value);
        fetchFilteredData(); // Fetch filtered data based on new fee status
    };

    return (
        <div className='batch-student-page'>
            <h1>Batch and Student List</h1>

            <div className='batch-list'>
              
                <ul>
                    {batches.map(batch => (
                        <li key={batch.batch_id}>
                            <button onClick={() => setSelectedBatchId(batch.batch_id)} className="batch-button">
                                {batch.batch_name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedBatchId && (
                <div className='students-container'>
                    <h2>Students in Batch {selectedBatchId}</h2>
                    
                    <div className='filter-container'>
                        <h3>Filter by Fee Status</h3>
                        <select
                            id="feeStatus"
                            value={feeStatus}
                            onChange={handleFeeStatusChange}
                            className='filter-select'
                        >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {error && <p className="error-message">{error}</p>}
                            {filteredData.length > 0 ? (
                                <div className="student-data-table">
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
                            ) : (
                                <p>No students found.</p>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminStudent;
