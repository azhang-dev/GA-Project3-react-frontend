import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

function Dashboard(){
 let [currentUser, setCurrentUser] = useState("")
  
  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    const res = axios.get(`${API_ROOT}/users/current`, {
      headers: {
        'Authorization' : token
      }
    })
    .then(res => {
      console.log("current user:", res)
      setCurrentUser(res)
    })
    .catch(err => console.log("no current user",err))
  }

  const formDivStyle = {
      margin: "auto",
      padding: "20px",
      width: "80%"
  }
  return(
      <div style={formDivStyle}>
          <h1>DASHBOARD</h1>
          <div className='map-container'>
              <p>map here</p>
          </div>
      </div>
  )
}

export default Dashboard