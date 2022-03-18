import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import LocationDetailsShowWindow from './LocationDetailsShowWindow';
import "./LocationDetailsForm.css"

export default function LocationDetailsForm (props) {
    // const [editStatus, setEditStatus] = useState(true)
    const [submitted, setSubmitted] = useState (false)
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
    }, [])

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setLocation({
        ...location,
        [name]: value
        })
        console.log(location);
    }

    const uploadImage = (files) => {

    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log(location);
        try{
            const res = await axios.post(`${API_ROOT}/locations`, location);
            console.log("Submit Sucess!", res);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt;
            setLocation(res.data)
            setSubmitted(true)
        }catch(err){
            console.log("Error submitting form:", err)
        }

        //axios patch (update)
    }

    // const handleBackButton = (ev) => {
    //     console.log("back button clicked")
    //     setEditStatus(false);
    //     setLocation(selected)
    // }

    return(

        <div>
            {
                submitted !== true ? (
                    <div className='LocationDetailsFormContainer'>
                        <h3>Edit Location Details</h3>
                        <form className='inputFormContainer' onSubmit={handleSubmit}>
                            
                            <input name="name" onChange={handleInput} type="text" placeholder="Name"/>
                        
                            <input name="city" onChange={handleInput} type="text" placeholder="City"/>
                    
                            <input name="Country" onChange={handleInput} type="text" placeholder="Country"/>
                    
                            <input name="date" onChange={handleInput} type="date" placeholder="Date"/>

                            <div>
                                <input name="visited" onChange={handleInput} type="checkbox" placeholder="visted(change to icon button)"/>
                                <label> Visited </label>
                                <input name="bucketlist" onChange={handleInput} type="checkbox" placeholder="bucketlist(change to icon button)"/>
                                <label> Want to visit</label>
                            </div>
                            
                            <input name="images" onChange={handleInput} type="file" placeholder="Images Cloudinary"/>

                            <input name="note" onChange={(ev) => {uploadImage(ev.target.files)}} type="textfield" placeholder="Notes"/>

                            {/* <button onClick={handleBackButton}>Back</button> */}
                            <button>Save</button>
                    
                        </form>
                    </div>
                )
                :
                (
                    <LocationDetailsShowWindow 
                    // selected={selected} 
                    // editStatus={editStatus}
                    />
                )
            }
        </div>
        
    )


}