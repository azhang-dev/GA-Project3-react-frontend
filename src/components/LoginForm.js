import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

import "../App.css"
// import { set } from 'date-fns';


function LoginForm(props){
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const handleInput = (ev) => {
    const {name, value} = ev.target
    setUser({
      ...user,
      [name]: value
    })
    // console.log(user);
  }
 
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(user);
    // const request = {user}
    setUser({
      email: "",
      password: "",
    });

    try {
      const res = await axios.post(`${API_ROOT}/user_token`, {auth: user})
      console.log('Logging Sucess!',res);
      // console.log(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.jwt}`;
      localStorage.setItem("jwt", res.data.jwt)
      props.checkLogin();
  
      navigate(`/dashboard`);
    }catch(err){
      setErrorMessage("Incorrect Login Details");
      console.log("error message: cant log in",err)
      
    };
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
                    <input name="email" onChange={handleInput} type="text" placeholder="email"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input name="password" onChange={handleInput} type="password" placeholder="password"/>
                </div>
                
                <button className="ui button">Login</button>
            </form>
        </div>
        </div>
    )
} 

export default LoginForm