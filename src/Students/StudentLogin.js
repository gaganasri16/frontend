import React, { useContext, useState } from 'react';
import '../Students/StudentLogin.css'; // Make sure this path is correct
import image from '../assets/images/bg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logincontext } from '../App';

function StudentLogin1({setView}) {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  let [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = 'http://127.0.0.1:8000/studentportal/student-login/';
    const credentials = {
      username: login.username,
      password: login.password,
    };

    await axios.post(loginUrl, credentials)
      .then((resp) => {
        if (resp.status === 200) {
          setToken(resp.data['token']);
          setIsAuthenticated(true);
          navigate('/studentdashbord');
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  };

  const handleCreateAccount = () => {
    navigate('/Studentreg');
  };

  return (
    <div className="login-student-page">
      <div className="login-student-section">
        <div className='login-student-image-block'>
          <img src={image} alt="Illustration" className="login-student-side-image" />       
        </div>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-student-input-container">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-student-input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-student-options">
            <label>
              <input type="checkbox" /> Remember
            </label>
            <a href="/forgetpasswordstu">Forgot password?</a>
          </div>
          <button type="submit" className="login-student-button">Login</button>
          <button type="button" className="login-student-create-account-button" onClick={() => setView('studentreg')}>Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin1;
