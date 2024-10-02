import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Students/StudentNotificationCenter.css';

const StudentNotificationCenter = () => {
  const [tasks, setTasks] = useState([]);
  const [batchId, setBatchId] = useState(localStorage.getItem('batchId')); // Get batchId from localStorage
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/gettask/', {
          params: { batch_id: batchId }  // Pass batch_id as a query parameter
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
      }
    };

    fetchTasks();
  }, [batchId]);  // Fetch tasks when batchId changes

  return (
    <div className="student-notification-center">
      <h2>Task Center</h2>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div className="task-card" key={task.id}>
              <h3>{task.task_type}</h3>
              <p>{task.content}</p>
              {task.image && (
                <img 
                  src={`http://127.0.0.1:8000${task.image}`} 
                  alt={task.task_type} 
                  className="task-image" 
                />
              )}
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentNotificationCenter;