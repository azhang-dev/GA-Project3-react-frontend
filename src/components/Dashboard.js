import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';
import SinglePlaceMap from './Map/SinglePlaceMap';
import './Dashboard.css'
const user = {
    name: "",
    email: "",
    password: "",
  }
function Dashboard(){

  return(
      <div>
          <h1 className='page-title'>DASHBOARD</h1>
          <div className='map-container'>
              <SinglePlaceMap />
          </div>
      </div>
  )
}

export default Dashboard