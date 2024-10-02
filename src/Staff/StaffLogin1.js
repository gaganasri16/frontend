import React from 'react';
import '../Staff/StaffLogin1.css';  // Ensure you create this file for custom styles
import sideImage from '../assets/images/DPS.jpeg'; // Replace with the actual path to your image
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logincontext } from '../App';
import axios from 'axios';
function StaffLogin() {
  const [Login, setLogin] = useState({
    username: '',
    password: '',
  });


  let handleChange = (e) => {
    let { name, value } = e.target;
    setLogin({
      ...Login,
      [name]: value
    });
  };
  const navigate = useNavigate();
  let [[isAuthenticated,setIsAuthenticated],[token,setToken]]=useContext(logincontext);
  let handleSubmit = (e) => {
    e.preventDefault();
    const loginUrl = 'http://127.0.0.1:8000/staffportal/login/';
    const credentials = {
      username: Login.username,
      password: Login.password,
    };

    axios.post(loginUrl, credentials).then((resp)=>{
      console.log(resp)
          if(resp.status===200){
              setToken(resp.data['token']);
              setIsAuthenticated(true);
              navigate('/homepage');
          }
          else{
            setIsAuthenticated(false);
          }

          })
      .catch((err)=>
      {
          console.log(err)
          setIsAuthenticated(false);
      });
      
    }
    const create = () => {
      navigate('/staffreg')
    }
  return (
    <div className="container1">
      <div>
      <div className="left-side1">
        <img src={sideImage} alt="Illustration" className="side-image1"/>
      </div>
      </div>
      <div className="right-side1">
        <form className="sign-in-form1" onSubmit={handleSubmit}>
          <h2 className='head'>Sign In</h2>
          <div className="form-group1">
            <label htmlFor="username">Username</label>
            <input type="text" name="username"
             onChange={handleChange}
            placeholder="Enter userName" required />
          </div>
          <div className="form-group1">
            <label htmlFor="password">password</label>
            <input type="password" name="password"
           onChange={handleChange}
            placeholder="Enter password" required />
          </div>
          <div className="form-group1">
            <button type="submit" className="sign-in-button1" >Sign In</button>
          </div>
          <div className='forgot_password1'>
          <a href="/forgot-password" className="forgot_password1">Forgot Password?</a>  <a className="forgot_password1" onClick={create} >signup</a>

          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;