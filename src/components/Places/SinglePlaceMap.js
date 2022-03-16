import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
// import {GOOGLE_MAP_API_KEY} from "../../mapApiBaseUrl";
// import { API_ROOT } from '../../constants';
import axios from "axios";
// import 'dotenv/config'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import "../../stylesheets/placeMap.css"

//import custom styles for googlemaps from "snazzy maps"
import mapStyles from "./mapStyles";
//////////IMPORTS


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


    return (    
        <div>

            <Search />

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
                            <h2>"Example: Location Marked!"</h2>
                            <p>Marked at: {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>) : null}
            
            </GoogleMap>
        </div>
    );
}

function Search() {
    const {
        ready, 
        value, 
        suggestions: { status, data }, 
        setValue, 
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => -12.046373, lng: () => -77.042755},
            radius: 200 * 1000, // * 1000 because its in meters 
        },
    });
    
    return (
        <div className="search-box">
            <Combobox onSelect={ async (address) => {
                try {
                    const results = await getGeocode({address});
                    const {lat, lng} = await getLatLng(results[0]);
                    // console.log(results[0]);
                    console.log(`lat: ${lat},lng: ${lng}`);
                } catch(err){
                    console.log("error:",err)
                }
                console.log(address)
                }}>
                <ComboboxInput 
                    value={value} 
                    onChange={(e) => {setValue(e.target.value)}}
                    disabled={!ready}
                    placeholder="Enter an address"
                />
                <ComboboxPopover>
                    <ComboboxList className="search-sugestion-text">
                        {status === "OK" && data.map(({place_id, description}) => {
                        
                            return (<ComboboxOption key={place_id} value={description} />)
                        }
                        )}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}