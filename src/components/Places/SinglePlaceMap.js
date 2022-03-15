import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import {GOOGLE_MAP_API_KEY} from "../../mapApiBaseUrl";
import { API_ROOT } from '../../constants';
import axios from "axios";

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
}


export default function SinglePlaceMap() {
    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";

    const renderMap = () => {

    }

    return <div>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom ={8}
        center={center}
        options={options}
        ></GoogleMap>
    </div>;
}

