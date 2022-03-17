import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';
import SinglePlaceMap from './Map/SinglePlaceMap';
import './Dashboard.css'
const user = {
    name: "",
    email: "",
    password: "",
  }
function Dashboard(props){



// useEffect(() => {
//   checkLogin()
// }, [])
 let [currentUser, setCurrentUser] = useState(user)
  
  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    const res = axios.get(`${API_ROOT}/users/current`, {
      headers: {
        'Authorization' : token
      }
    })
    .then(res => {
      console.log("current user:", res)
      setCurrentUser(  
        {name: res.data.name,
        email: res.data.email,
        password: res.data.password})
    })
    .catch(err => console.log("no current user",err))
  }


 
  return(
      <div>
          <h1 className='page-title'>DASHBOARD</h1>
          <div className='map-container'>
              <SinglePlaceMap />
          </div>
      </div>
  )
}

export default Dashboard