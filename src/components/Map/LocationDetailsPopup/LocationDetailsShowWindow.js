import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"

export default function LocationDetailsShowWindow (props) {
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
        getLocation();
    }, [])

    const getLocation = async () => {
        try {
            const res = await axios.get(`${API_ROOT}/locations`);
            setLocation(res.data);
            console.log("location request (hardcoded id):",location);
        }catch(err){
            console.log("Can't get Locations:", err)
        }
    };

    return(
        <div className='LocationDetailsShowContainer'>
            <h3>{location.name} </h3>
            <button>Edit</button>
            <p>City: {location.city} </p>
            <p>Country: {location.country} </p>
            <p>Date Visited: {location.date_visited}</p>
            <p>Notes: {location.note}</p>
            <p>Images: {location.images.map(img => <img key={img} src = {img} className='locationImage'/> )}</p>
        </div>
    )


}