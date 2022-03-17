import React, {useState} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"

export default function LocationDetailsForm () {

    const [values, setValues] = useState({
    name: "",
    city: "",
    country: "",
    visited: false,
    date_visited: "",
    bucketlist: false,
    images: [],
    notes: ""
  })

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setValues({
        ...values,
        [name]: value
        })
        console.log(values);
    }

    const uploadImage = (files) => {

    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        //axios patch (update)
    }

    return(

        <div className='LocationDetailsFormContainer'>
            <h3>Enter Location Details</h3>
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

                <button>Save</button>
           
            </form>
        </div>
    )


}