import React, {useState, useEffect} from 'react';
import axios from "axios";
import { API_ROOT } from '../../../constants';
import "./LocationDetailsForm.css"
import LocationDetailsShowWindow from './LocationDetailsShowWindow';


export default function LocationDetailsForm (props) {
   
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUD_PRESET; 
    const [selected, setSelected] = useState(props);
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
    const [uploadImageMessage,setUploadImageMessage] = useState("");

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
        // console.log(location);
    }
    //Handles values for visted/bucketlist. Toggle between boolean when checked/unchecked box
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
 
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: true,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            console.log(result.info.secure_url);
            setImages(currentImages => [...currentImages, result.info.secure_url ]); // adds new images to the array in imageState, avoids closure, stale state
        }
      }
    );

    const handleSubmit = async (ev) => {
        ev.preventDefault();
      
        console.log("location info",location);
        console.log("selected info",selected.selectedMarker);
        const postData = {
            ...location,
            ...selected.selectedMarker,
            images
        }// sends both location values + lat lng from selected marker(generated from googlemap)

        try{
            const res = await axios.post(`${API_ROOT}/locations`, postData);
            console.log("Submit Sucess!", res);  
            setLocation(res.data);
            setImages(res.data);
            setSubmitted(true);
            props.getUserMarkers();
        
            
        }catch(err){
            console.log("Error submitting form:", err)
        }

        
    }

    function openWidget (e) {
        e.preventDefault();
        myWidget.open()
        console.log("clicked widget button")
    }
    
    return(
        <div>
            { 
            !submitted && !selected.id
            ?
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
                        
                        <input name="note" onChange={handleInput} type="textfield" placeholder="Notes"/>


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
                        <button>Save</button>
                
                    </form>

                </div>
                )  
                :
                (
                <LocationDetailsShowWindow location={location}/>
                )
             }
        </div> 
    )// return()
}// LocationDetailsForm