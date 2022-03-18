import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"

export default function LocationDetailsShowWindow () {
    // const [selected, setSelected] = useState(props)
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
        // let token = "Bearer " + localStorage.getItem("jwt");
        try {
            const res = await axios.get(`${API_ROOT}/locations/6`);
            console.log("location:",res.data);
            setLocation(res.data);
            console.log("location:",location);
        }catch(err){
            console.log("Can't get Locations:", err)
        }
        

    };

    return(
        <div className='LocationDetailsShowContainer'>
            <h3>{location.name} </h3>
            <p>City: {location.city} </p>
            <p>Country: {location.country} </p>
            <p>Date Visited: {location.date_visited}</p>
            <p>Notes: {location.note}</p>
            <p>Images: {location.images}</p>
        </div>
    )


}