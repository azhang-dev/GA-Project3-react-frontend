import React, {useState} from 'react';
import LocationDetailsForm from './LocationDetailsForm';
import "./LocationDetailsForm.css"

export default function LocationDetailsShowWindow (props) {
    const [editStatus, setEditStatus] = useState(false)
    const handleEditButton = (ev) => {
        console.log("edit button clicked")
        setEditStatus(true);
    }

    return(
        <div>
            {
                !editStatus ? (
                    <div className='LocationDetailsShowContainer'>
                        <h3>{props.location.name} </h3>
                        <button onClick={handleEditButton}>Edit</button>
                        <p>City: {props.location.city} </p>
                        <p>Country: {props.location.country} </p>
                        <p>Date Visited: {props.location.date_visited}</p>
                        <p>Notes: {props.location.note}</p>
                        <p>Images: {props.location.images.map(img => <img key={img} src = {img} className='locationImage'alt='Location'/> )}</p>
                    </div>
                )
                :
                (
                // <p>edit form here</p>
                <LocationDetailsForm location={props.location} editStatus={editStatus} />
                )
            }
        </div>
        
    )


}