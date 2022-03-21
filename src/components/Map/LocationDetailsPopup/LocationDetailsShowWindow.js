import React, {useState} from 'react';
import LocationDetailsEditForm from './LocationDetailsEditForm';
import { API_ROOT } from '../../../constants';
import axios from 'axios';
import "./LocationDetailsForm.css"

export default function LocationDetailsShowWindow (props) {
    const [editStatus, setEditStatus] = useState(false)
    const [deleted, setDeleted]= useState(false)

    const handleEditButton = (ev) => {
        console.log("edit button clicked")
        setEditStatus(true);
    }
    
    const handleDeleteButton = async (ev) => {
        ev.preventDefault();
        console.log("Delete button clicked-location:",props.location.id);
        try{
            const res = await axios.delete(`${API_ROOT}/locations/${props.location.id}`);
            console.log("location deleted:",res);
            props.getUserMarkers();
            setDeleted(true);
        }catch(err){
            console.log("Error deleting locations", err)
        }
    }

    return(
        <div>

            {
                !editStatus 
                ? 
                (
                    <div className='LocationDetailsShowContainer'>
                        <h3>{props.location.name} </h3>
                        <button onClick={handleEditButton}>Edit</button>
                        <button onClick={handleDeleteButton}>Delete</button>
                        <p>City: {props.location.city} </p>
                        <p>Country: {props.location.country} </p>
                        <p>Date Visited: {props.location.date_visited}</p>
                        {/* <p>Visited: {props.location.visited}</p>
                        <p>Bucketlist: {(props.location.bucketlist)}</p> */}
                        <p>Notes: {props.location.note}</p>
                        
                        <p>Images: </p>
                        <p>{JSON.stringify(props.location.images.map(img => <img key={img} src = {img} className='locationImage'alt='Location'/> ))}</p>
                       
                    </div>
                )
                :
                (
                <LocationDetailsEditForm 
                location={props.location} 
                // editStatus={editStatus} 
                />
                )
            }
        </div>
        
    )


}