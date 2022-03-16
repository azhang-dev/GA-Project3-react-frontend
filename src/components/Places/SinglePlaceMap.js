import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow, useJsApiLoader, LoadScript } from "@react-google-maps/api";
import {GOOGLE_MAP_API_KEY} from "../../mapApiBaseUrl";
import { API_ROOT } from '../../constants';
import axios from "axios";
// import 'dotenv/config'

//import custom styles for googlemaps from "snazzy maps"
import mapStyles from "./mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: -12.046373,
    lng: -77.042755,
}

const options ={
    styles: mapStyles,
    disableDefaultUI: true, 
    zoomControl: true,
}

console.log("key:",process.env)

export default function SinglePlaceMap() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";


    return <div>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom ={10}
        center={center}
        options={options}
        onClick = {(event) => {
            setMarkers(current => [...current,{
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }])
            // console.log(event);
        }}
        >
            {markers.map(marker => <Marker key={marker.time.toISOString()} position={{lat: marker.lat, lng:marker.lng }}/>)}
        </GoogleMap>
    </div>;
}

