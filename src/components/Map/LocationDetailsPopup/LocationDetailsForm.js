import React from "react";
import axios from "axios";
import { API_ROOT } from '../../../constants';

export default function LocationDetailsForm () {

    const handleSubmit = (ev) => {
        ev.preventDefault();
        
    }

    return(
        <form onSubmit={handleSubmit}>

        </form>
    )


}