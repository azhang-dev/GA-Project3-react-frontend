import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"
import LocationDetailsShowWindow from './LocationDetailsShowWindow';


export default function LocationDetailsEditForm (props) {
   
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUD_PRESET; 
    const [selected, setSelected] = useState(props);
    const [editStatus, setEditStatus] = useState(true);
    const [images, setImages]= useState([]);
    const [location, setLocation] = useState({
        name: "",
        city: "",
        country: "",
        visited: false,
        date_visited: "",
        bucketlist: false,
        note: "",
        images:[]
    });
  
    const [submitted,setSubmitted] = useState(false);
    // const [editStatus,setEditStatus] = useState(true);
   

    useEffect(() => {
        setSelected(props); // props passed down from LocationDetailsWindow and sets it to the state so we can prefill the forms.
        console.log("selected props:",props);
    }, [])

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setLocation({
        ...location, // makes a copy and changes the value according to the name of the keys and sets it to the Location State
        [name]: value
        })
        console.log(location);
    }

    //Handles values for visted/bucketlist. Toggle between true/false when changing the checkbox
    const handleToggleVisited = (ev) => {
        const visitCheckbox = ev.target.checked;
        console.log("visitcheckbox",visitCheckbox)
        setLocation({...location,visited: visitCheckbox}) // switches between the input and the default value
    }
    const handleToggleBucketlist = (ev) => {
        const bucketlistCheckbox = ev.target.checked;
        console.log("bucketlistcheckbox", bucketlistCheckbox)
        setLocation({...location, bucketlist: bucketlistCheckbox})
    }
 
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: true,  //Allow multiple images uploads
       
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            console.log(result.info.secure_url);
            setImages(currentImages => [...currentImages, result.info.secure_url ]); // adds new images to the array in imageState, avoids closure, stale state
        }
      }
    );

    const handleCancelButton = (ev) => {
        ev.preventDefault();
        setEditStatus(false);
    }// changes the edit state to false so we return to the LocationDetailsShowWindow

    const handleUpdateSubmit = async (ev) => {
        ev.preventDefault();
      
        console.log("location info",location);
        const postData = {
            ...location,
            images 
        }// create a new variable where all information needed for post is gathered up.

        try{
            const res = await axios.patch(`${API_ROOT}/locations/${props.location.id}`, postData);
            console.log("Submit Sucess!", res);  
            setLocation(res.data); // updates location state with current data
            setImages(res.data); // updates images array with current data
            setSubmitted(true);// changes submitted state so the ternary 
            // props.getUserMarkers(); // To reload the current User Markers
        }catch(err){
            console.log("Error submitting form:", err)
        } 
    }

    //Open Cloudinary Widget Uploader
    function openWidget (e) {
        e.preventDefault();
        myWidget.open()
        console.log("clicked widget button")
    }

    
    return(
        <div>
         
            { 
            !submitted && editStatus // If its not submitted yet and still in the state of true editStatus, to show the form instead of the LocationDetailShowWindow 
            ?
                (
                <div className='LocationDetailsFormContainer'>
                    <h3>Edit Location Details</h3>
                    <form className='inputFormContainer' onSubmit={handleUpdateSubmit}>
                        
                        <input name="name" defaultValue={props.location.name} onChange={handleInput} type="text" placeholder="Name"/>

                        <input name="city" defaultValue={props.location.city} onChange={handleInput} type="text" placeholder="City"/>
                
                        <input name="country" defaultValue={props.location.country} onChange={handleInput} type="text" placeholder="Country"/>
                
                        <input name="date" defaultValue={props.location.date} onChange={handleInput} type="date" placeholder="Date"/>

                        <div>
                            {/* default checked property returns the default value of the checked atrribute */}
                            <input name="visited" defaultChecked={location.visited} onChange={handleToggleVisited} type="checkbox" />
                            <label> Visited </label>
                            <input name="bucketlist" defaultChecked={location.bucketlist} onChange={handleToggleBucketlist} type="checkbox" />
                            <label> Want to visit</label>
                        </div>
                        
                        <input name="note" defaultValue={props.location.note} onChange={handleInput} type="textfield" placeholder="Notes"/>


                        <div className='img-container' >
                            
                        </div>

                        <div className='btn-container' >
                            <button 
                            onClick={openWidget} 
                            id="upload_widget" 
                            className='cloudinary-button'>
                                Upload Images
                            </button>
                        </div>
                        <br/>
                        <button onClick={handleCancelButton}>Cancel</button>
                        <button>Save</button>
                
                    </form>

                </div>
                )  
                :
                (
                <div>
                    <LocationDetailsShowWindow location={location}/>
                    {/* needs to be revised, as its currently showing an empty LocationDetailsShowWindow. */}
                </div>
                )
             }
        </div> 
    )// return()
}// LocationDetailsForm