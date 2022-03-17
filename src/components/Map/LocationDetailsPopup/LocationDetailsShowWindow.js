import React, {useState} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"

export default function LocationDetailsShowWindow (props) {
    const [selected, setSelected] = useState(props)

    const fetchLocation = async () => {
        let token = "Bearer " + localStorage.getItem("jwt");
        try {
            const res = await axios.get(`${API_ROOT}/location/${selected.id}`)
        }catch(err){
            console.log("Can't get Locations:", err)
        }
        

    };

    return(
        <div className='LocationDetailsShowContainer'>
            <h3>Location Name</h3>
            <p>City: </p>
            <p>Country: </p>
            <p>Date Visited: </p>
            <p>Images: </p>
            <p>Notes: </p>
        </div>
    )


}