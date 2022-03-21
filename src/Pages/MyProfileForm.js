import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../constants';
import '../App.css';


function MyProfileForm(props){

    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUD_PRESET; 

    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
    });

    useEffect(() => {
        console.log("selected props:",props);
        
    }, [])

    const handleInput = (ev) => {
    const {name, value} = ev.target
    setCurrentUser({
      ...currentUser,
      [name]: value
    })
    // console.log(currentUser);
  }

    const handleUpdateSubmit = async (ev) => {
        ev.preventDefault();
        
        console.log("currentUser info",currentUser);
        const postData = {
            ...currentUser,
           
        }

        try{
            // const res = await axios.patch(`${API_ROOT}/currentUser/${props.currentUser.id}`, postData);
            // console.log("Submit Sucess!", res);  
            
        }catch(err){
            console.log("Error submitting form:", err)
        } 
    }

   
  
  
  return(
    <div className='inputFormContainerProfile'>
       <form  onSubmit={handleUpdateSubmit}>
                        
            <input name="name" defaultValue={props.currentUser.name} onChange={handleInput} type="text" placeholder="Name"/>

            <input name="email" defaultValue={props.currentUser.email} onChange={handleInput} type="text" placeholder="Email"/>

            <input name="password" defaultValue={props.currentUser.password} onChange={handleInput} type="text" placeholder="Password"/>

            <input name="image" onChange={handleInput} type="file" placeholder="Country"/>


            

        </form>
    </div>
  )
}

export default MyProfileForm