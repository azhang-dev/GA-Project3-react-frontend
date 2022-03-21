import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"
import LocationDetailsShowWindow from './LocationDetailsShowWindow';


export default function LocationDetailsForm (props) {
   //setup for Cloudinary upload widget
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUD_PRESET; 


    const [selected, setSelected] = useState(props); // props passed down from LocationDetailsShowWindow
    const [images, setImages]= useState([]); // a new state called images which is an empty array, to later store the uploaded images from cloudinary
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
  
    const [submitted,setSubmitted] = useState(false); // will help change the ternary expression to switch to another component

    useEffect(() => {
        setSelected(props);  // props passed down from LocationDetailsShowWindow
        console.log("selected props:",props);
    }, [])

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setLocation({
        ...location,
        [name]: value
        })
    }; // handleInput()

    //Handles values for visted/bucketlist. Toggle between boolean when checked/unchecked box. the default values is currently set to false 
    const handleToggleVisited = (ev) => {
        const visitCheckbox = ev.target.checked;
      
        console.log("visitcheckbox",visitCheckbox)
        setLocation({...location,visited: visitCheckbox})
    }// handleToggleVisited() 

    const handleToggleBucketlist = (ev) => {
        const bucketlistCheckbox = ev.target.checked;
        console.log("bucketlistcheckbox", bucketlistCheckbox)
        setLocation({...location, bucketlist: bucketlistCheckbox})
    }
 
    // cloudinary widget setup
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: true,  //Allows multiple upload of images
  
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);// 
            console.log(result.info.secure_url);// show what we need to retrieve: the secure_url of the images 
            setImages(currentImages => [...currentImages, result.info.secure_url ]); // adds new images to the array in imageState, avoids closure, stale state
        }
      }
    );

    const handleSubmit = async (ev) => {
        ev.preventDefault();
      
        console.log("location info",location); // logs the current location state data
        console.log("selected info",selected.selectedMarker); // logs the Lat and lng coordinates that was passed down from the parent component
        const postData = {
            ...location,
            ...selected.selectedMarker,
            images
        }// groups both location values + lat lng from selected marker(generated from googlemap) into and object so it can be sent to POST 
 
        try{
            const res = await axios.post(`${API_ROOT}/locations`, postData);
            console.log("Submit Sucess!", res);  
            setLocation(res.data);
            setImages(res.data);
            setSubmitted(true);
            props.getUserMarkers(); // repeat the funtion to get the current array of markers including the newly created location.
        }catch(err){
            console.log("Error submitting form:", err)
        } 
    }


    //click function to open the cloudinary.
    function openWidget (e) {
        e.preventDefault();
        myWidget.open()
        console.log("clicked widget button")
    }
    
    return(
        <div>
            { 
            !submitted && !selected.id // if its not sumbitted and there is no ID of the selected marker( meaning its a new marker to be created), show a empty form
            ?
                (
                <div className='LocationDetailsFormContainer'>
                    <form className='inputFormContainer' onSubmit={handleSubmit}>
                        <h3>Add Location Details</h3>
                        
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
                        
                        <input name="note" onChange={handleInput} type="textfield" placeholder="Notes"/>


                        <div className='btn-container' >
                            <button 
                            onClick={openWidget} 
                            id="upload_widget" 
                            className='cloudinary-button'>
                                Upload Images
                            </button>
                        </div>
                        
                        <button>Save</button>
                
                    </form>

                </div>
                )  
                :
                (
                <LocationDetailsShowWindow location={location}/> // once submitted to show the LocationDetailsShowWindow component
                )
             }
        </div> 
    )// return()
}// LocationDetailsForm