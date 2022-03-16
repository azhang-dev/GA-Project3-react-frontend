import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { API_ROOT } from './constants';

import {HashRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Root from "./Root";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import MyProfile from './Pages/MyProfile';
import SinglePlaceMap from './components/Places/SinglePlaceMap';


function App() {
  let [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    checkLogin()
  }, [])
  
  const checkLogin = () => {
    let token = localStorage.getItem("jwt");

    //TODO check that token is not null before doing a request
    axios.get(`${API_ROOT}/users/current`, {
      headers: {
        'Authorization' : "Bearer " +  token,
      }
    })
    .then(res => {
      console.log("current user:", res.data)
      setCurrentUser(res.data);
    })
    .catch(err => console.log("no current user",err))
  }
 

  const handleLogin = (request) => {
    return axios.post(`${API_ROOT}/user_token`,{auth: request})
    .then(result =>{
        console.log('Logging Sucess!',result)
        localStorage.setItem("jwt", result.data.jwt)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.jwt;
        checkLogin();
        //TODO customize knock response to include current user oject - same data from line 24
    })
    .catch(err => {
        console.log("Cannot Log In:",err);
    })
  }
  
  const handleLogout = () => {
    setCurrentUser(undefined);
    console.log('Logged Out-user:',currentUser);
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = undefined
  }


  return (
   <div className='App-header'>
            <Router>
              <header className='header-container'>
                <h1 style={{color:"white"}}>TRAVELOG</h1>
                <nav>
                  {
                    currentUser !== undefined
                    ?
                    (
                      <ul>
                        <li>Welcome! {currentUser.name}</li>
                        <li><Link to='/dashboard' className="nav-links-header">Dashboard</Link></li>
                        <li><Link to='/profile' className="nav-links-header">Profile</Link></li>
                        <li><Link onClick = {handleLogout} to='/' className="nav-links-header">Log Out</Link></li>
                        <li><Link to='/single-place-map' className="nav-links-header">testMap</Link></li>
                      </ul>

                    )
                    :
                    (
                      <ul> 
                        <li><Link to='/login' className="nav-links-header">Log In</Link></li>
                        <li><Link to='/sign-up' className="nav-links-header">Sign Up</Link></li>
                        <li><Link to='/single-place-map' className="nav-links-header">testMap</Link></li>
                      </ul>
                    )
                  }
                </nav>

              </header>
              
              <div>
                <Routes>
                    <Route exact path = '/'element={<Root/>}/>
                    <Route exact path = '/login'element={<LoginForm handleLogin={handleLogin}/>}/>
                    <Route exact path = '/sign-up'element={<SignUpForm/>}/>
                    <Route exact path = '/profile'element={<MyProfile/>}/>
                    <Route exact path = '/dashboard'element={<Dashboard/>}/>
                    <Route exact path = '/single-place-map'element={<SinglePlaceMap/>}/>
                </Routes>
              </div>
            </Router>
         
        </div>
  );
}

export default App;
