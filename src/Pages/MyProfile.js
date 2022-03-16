import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

function MyProfile(){
 
    let [currentUser, setCurrentUser] = useState("");

    useEffect(() => {checkLogin()}, [])
  
  const checkLogin = () => {
    let token = localStorage.getItem("jwt");

    //TODO check that token is not null before doing a request
    axios.get(`${API_ROOT}/users/current`, {
      headers: {
        'Authorization' : "Bearer " +  token,
      }
    })
    .then(res => {
      console.log("profile user:", res.data)
      setCurrentUser(res.data);
    })
    .catch(err => console.log("no current user",err))
  }

  return(
      <div>
          <h1>My Profile</h1>
          <div className='profile-container'>
              <h3>{currentUser.name}</h3>
              <p>Your Account Details:</p>
              <p>Email: {currentUser.email}</p>
          </div>
      </div>
  )
}

export default MyProfile