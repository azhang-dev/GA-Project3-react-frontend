import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow, useJsApiLoader, LoadScript } from "@react-google-maps/api";
import {GOOGLE_MAP_API_KEY} from "../../mapApiBaseUrl";
import { API_ROOT } from '../../constants';
import axios from "axios";
import {formatRelative} from "date-fns"
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
    const [markers, setMarkers] = React.useState([]); // creates markers on the map
    const [selected, setSelected] = React.useState(null); // clicking on marker -shows details of the current selected marker in a new state 
    ////^States


    const onMapClick = React.useCallback((event) => {
            setMarkers(current => [...current,{
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }])
            // console.log(event);
    },[])// avoids recreating the onclick markers on every single render

    const mapRef = React.useRef(); // retain state without a rerender
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);


    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";


    return <div>
        <GoogleMap 
            mapContainerStyle={mapContainerStyle}
            zoom ={10}
            center={center}
            options={options}
            onClick = {onMapClick}
            onLoad={onMapLoad}
        >
            {markers.map(marker => <Marker 
                key={marker.time.toISOString()} 
                position={{lat: marker.lat, lng:marker.lng }}
                onClick={() => {
                    setSelected(marker); // on click saves the selected marker to the selectedState
                }}
            />)}

            {selected ? (
                <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => {
                    setSelected(null);// reset setSelected so inforWindow can be shown when selecting a new marker- toggling it on an off
                }}>
                    <div>
                        <h2>"Example: bearspotted!"</h2>
                        <p>Spotted: {formatRelative(selected.time, new Date())}</p>
                    </div>
                </InfoWindow>) : null}
        
        </GoogleMap>
    </div>;
}
