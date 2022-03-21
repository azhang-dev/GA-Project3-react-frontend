import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

function MyProfile(){
 
  let [currentUser, setCurrentUser] = useState("");
  // let [locations, setLocations] = useState("");

  return(
    <div>
        <h1>My Locations</h1>
        <div className='profile-container'>
            <h3>{currentUser.name}</h3>
            <p>Your Account Details:</p>
            <p>Email: {currentUser.email}</p>
            <p>Total Locations marked: {currentUser.locations}</p>
        </div>
    </div>
  )
}

export default MyProfile