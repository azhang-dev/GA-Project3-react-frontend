import React, {useState} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import axios from "axios";

import LocationDetailsForm from "./LocationDetailsPopup/LocationDetailsForm";
import LocationDetailsShowWindow from './LocationDetailsPopup/LocationDetailsShowWindow';

import usePlacesAutocomplete, { getGeocode, getLatLng , getDetails} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
//import custom styles for googlemaps from "snazzy maps"
import mapStyles from "./mapStyles";

import "./placeMap.css"

//////////IMPORTS


const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: -33.868820,
    lng: 151.209290,
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
    const [markers, setMarkers] = useState([]); // creates markers on the map
    const [selected, setSelected] = useState(null); // clicking on marker -shows details of the current selected marker in a new state 
    ////^States


    const onMapClick = React.useCallback((event) => {
        setMarkers(current => [...current,{
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        }])

        // axios post to create a new location- to be able to pass marked location id to show pop up window with details.

        // console.log(event);
    },[])// avoids recreating the onclick markers on every single render

    // const handleVisitedClick = (ev) => {
    //     console.log("visited button clicked")
    // }
    // const handleWantToVisitClick = (ev) => {
    //     console.log("want to visit button clicked")
    // }
    const handleSaveMarkerClick = (ev) => {
        
        console.log("Save marker clicked")
    }
    const handleDeleteMarkerClick = (ev) => {
        const keptMarkers = markers.filter(m => m !== selected);
        setMarkers(keptMarkers);
        setSelected(null);
        console.log("delete marker clicked")
    }

    const mapRef = React.useRef(); // retain state without a rerender
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(16);
    }, []);


    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";


    return (    
        <div>

            <Search panTo={panTo}/>
            <Locate panTo={panTo}/>
            <LocationDetailsPopup/>
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
                            <h2>"Location Marked!"</h2>
                            <p>Marked at: {formatRelative(selected.time, new Date())}</p>
                            {/* <button onClick={handleVisitedClick}>Visited</button>
                            <button onClick={handleWantToVisitClick}>Want To Visit</button> */}
                            <button onClick={handleSaveMarkerClick}>Save Marker-add details</button>
                            <button onClick={handleDeleteMarkerClick}>Remove Marker</button>
                        </div>
                    </InfoWindow>) : null}
            
            </GoogleMap>
            

        </div>
    );
}

function Locate({panTo}) {
    return (
        <button className="locate" onClick={() => { 
            console.log("current location button clicked");                                         
            navigator.geolocation.getCurrentPosition(
                (position) => { 
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    console.log ("geolocation position:",position)
                }, 
                () => null // no error handling needed -null
            ); //getCurrentPosition(sucess,error,options)
        }}>
            <img src="./images/location.png" alt="current location icon" />
        </button>
    );
}

function LocationDetailsPopup(){

    return(
        <div>
            <LocationDetailsForm/>
            <LocationDetailsShowWindow/>
        </div>
    );
}

function Search({panTo}) {
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
        <div className="search">
            <Combobox onSelect={ async (address) => {
                setValue(address, false); // sets the selected address to state and in the searchbox
                clearSuggestions()
                try {
                    const results = await getGeocode({address});
                    console.log(results[0]); // logging info from searched address
                    console.log("info", results[0].address_components[3]);
                    const {lat, lng} = await getLatLng(results[0]);// converting the getGeocode(address) to lat and lng coordinates
                    console.log(`lat: ${lat},lng: ${lng}`);
                    // const {address_components} = await getDetails(results[0]);// get details from searched suggestion
                    // console.log(`address_components: ${address_components}`); // logging info from searched address
                    panTo({lat, lng});// reposition the map given from panTo(), lat, lng given from getLatLng
                    
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
                <ComboboxPopover className="search-sugestion-text">
                    <ComboboxList>
                        {status === "OK" && data.map(({place_id, description}) => {
                            return (<ComboboxOption key={place_id} value={description} />)
                        })}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}