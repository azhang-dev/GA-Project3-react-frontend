import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

function MyProfile(props){
 
  let [currentUser, setCurrentUser] = useState("");
  let [locations, setLocations] = useState("");

  useEffect(
    () => {
      // checkLogin(),
      getLocations()
    }, [],
  );

  // const checkLogin = () => {
  //   let token = localStorage.getItem("jwt");

  //   //TODO check that token is not null before doing a request
  //   axios.get(`${API_ROOT}/users/current`, {
  //     headers: {
  //       'Authorization' : "Bearer " +  token,
  //     }
  //   })
  //   .then(res => {
  //     console.log("profile user:", res.data)
  //     setCurrentUser(res.data);
  //   })
  //   .catch(err => console.log("no current user",err))

  // }
  const navigate = useNavigate();

  const handleEditClick = (ev) => {
    ev.preventDefault();
    navigate(`/profile/edit`);
  }
  
  const getLocations = async () => {
   try{
    const res = await axios.get(`${API_ROOT}/locations`);
    console.log("User Locations:", res.data);
    setLocations(res.data);
    console.log(`User has ${locations.length}`)
  }catch(err){
      console.log("Cannot get Locations:", err)
  }

  }

  return( 
    <div>
        <h1>My Profile</h1>
        <div className='profile-container'>
            <div className='profileDetailsContainer'>
              <h3>Account Details</h3>
              <h3>{(props.currentUser.name).toUpperCase()}</h3>
              <p>Your Account Details:</p>
              <p>Email: {props.currentUser.email}</p>
              <button onClick={handleEditClick}>Edit Profile</button>
            </div>

            <div className='profileLocationsContainer'>
            <h3>Locations</h3>
            <p>Total Locations marked: {locations.length}</p>
            <p>Gallery</p>
            {/* <p>{props.location.images.map(img => <img key={img} src = {img} className='locationImage'alt='Location'/> )}</p> */}
            
            </div>
        </div>

    </div>
  )
}

export default MyProfile