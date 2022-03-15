import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

import "../App.css"
// import {handleLogin} from '../App'

function LoginForm(props){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value)
  }

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const request = {email, password}

    try {
    props.handleLogin(request); // send it to the function in App.js
    navigate(`/dashboard`);
    }catch {
    setErrorMessage("Incorrect Login Details");
    }
    
    setEmail("");
    setPassword("");
  }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return(
        <div>
            <div style={formDivStyle}>
            <h1>Log In</h1>
            {
                errorMessage && <p className='error-message'> Wrong Login Details</p>
            }
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Email</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
} 

export default LoginForm