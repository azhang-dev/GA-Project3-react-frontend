import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import LocationDetailsShowWindow from './LocationDetailsShowWindow';
import "./LocationDetailsForm.css"

export default function LocationDetailsForm (props) {
   
    const [selected, setSelected] = useState(props)
    const [location, setLocation] = useState({
    name: "",
    city: "",
    country: "",
    visited: false,
    date_visited: "",
    bucketlist: false,
    images: [],
    note: ""
  })

    useEffect(() => {
        setSelected(props);
        console.log("selected props:",props);
    }, [])

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setLocation({
        ...location,
        [name]: value
        })
        console.log(location);
    }

    const handleToggleVisited = (ev) => {
        const visitCheckbox = ev.target.checked;
      
        console.log("visitcheckbox",visitCheckbox)
        setLocation({...location,visited: visitCheckbox})
    }
    const handleToggleBucketlist = (ev) => {
      
        const bucketlistCheckbox = ev.target.checked;
        console.log("bucketlistcheckbox", bucketlistCheckbox)
        setLocation({...location, bucketlist: bucketlistCheckbox})
    }

    const uploadImage = (files) => {

    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
      
        console.log("location info",location);
        console.log("selected info",selected.selectedMarker);
        const postData = {
            ...location,
            ...selected.selectedMarker
        }

        try{
            const res = await axios.post(`${API_ROOT}/locations`, postData);
            console.log("Submit Sucess!", res);  
            setLocation(res.data)
           
        }catch(err){
            console.log("Error submitting form:", err)
        }

        //axios patch (update)
    }

    return(

        <div>
            {
                 (
                    <div className='LocationDetailsFormContainer'>
                        <h3>Edit Location Details</h3>
                        <form className='inputFormContainer' onSubmit={handleSubmit}>
                            
                            {/* <input name="name" value={props.location.name} onChange={handleInput} type="text" placeholder="Name"/> */}
                            <input name="name" onChange={handleInput} type="text" placeholder="Name"/>
                        
                            <input name="city" onChange={handleInput} type="text" placeholder="City"/>
                    
                            <input name="country" onChange={handleInput} type="text" placeholder="Country"/>
                    
                            <input name="date" onChange={handleInput} type="date" placeholder="Date"/>

                            <div>
                                <input name="visited" defaultChecked={location.visited} onChange={handleToggleVisited} type="checkbox" />
                                <label> Visited </label>
                                <input name="bucketlist" defaultChecked={location.bucketlist} onChange={handleToggleBucketlist} type="checkbox" />
                                <label> Want to visit</label>
                            </div>
                            
                            <input name="images" onChange={handleInput} type="file" placeholder="Images Cloudinary"/>

                            <input name="note" onChange={handleInput} type="textfield" placeholder="Notes"/>

                            {/* <button onClick={handleBackButton}>Back</button> */}
                            <button>Save</button>
                    
                        </form>
                    </div>
                )
                
                
            }
        </div>
        
    )


}