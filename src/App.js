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
import SinglePlaceMap from './components/Map/SinglePlaceMap';
const user = {
    name: "",
    email: "",  
  }

function App() {

  let [currentUser, setCurrentUser] = useState(user);
  let [userIsLoaded, setUserIsLoaded] = useState(false);
  
  useEffect(() => {
    checkLogin()
  }, [])
  
  const checkLogin = () => {
    let token = localStorage.getItem("jwt");
    if(token){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      console.log("token", token, axios.defaults.headers.common );
      //TODO check that token is not null before doing a request
      axios.get(`${API_ROOT}/users/current`)
      .then(res => {
        console.log("current user:", res.data)
        setCurrentUser({
          name: res.data.name,
          email: res.data.email
        });
        setUserIsLoaded(true);
      })
      .catch(err => console.log("no  current user",err))
      
    }else{
      setUserIsLoaded(true);
    }// if(token)
  }
  
  const handleLogout = () => {
    setCurrentUser(user);
    console.log('Logged Out-user:',currentUser);
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = ""
  }

  if (userIsLoaded === false){
    return <p>Loading...</p>
  }

  return (
   <div className='App-header'>
            <Router>
              <header className='header-container'>
                <Link to='/' className='website-logo'>TRAVELOG</Link>
                <nav>
                  {
                    currentUser && currentUser.name

                    ?

                    (
                      <ul>
                        <li className='welcomeText'>Welcome! {currentUser.name.toUpperCase()}</li>
                        <li><Link to='/dashboard' className="nav-links-header">Dashboard</Link></li>
                        <li><Link to='/profile' className="nav-links-header">Profile</Link></li>
                        <li><Link onClick = {handleLogout} to='/' className="nav-links-header">Log Out</Link></li>
                      </ul>
                    )
                    :
                    (
                      <ul> 
                        <li><Link to='/login' className="nav-links-header">Log In</Link></li>
                        <li><Link to='/sign-up' className="nav-links-header">Sign Up</Link></li>
                      </ul>
                    )
                  }
                </nav>

              </header>
              
              <div>
                <Routes>
                    <Route exact path = '/'element={<Root/>}/>
                    <Route exact path = '/login'element={<LoginForm checkLogin={checkLogin}/>} />
                    <Route exact path = '/sign-up'element={<SignUpForm checkLogin={checkLogin}/>}/>
                    <Route exact path = '/profile'element={<MyProfile/>}/>
                    <Route exact path = '/dashboard'element={<Dashboard />}/>
                    <Route exact path = '/single-place-map'element={<SinglePlaceMap/>}/>
                </Routes>
              </div>
            </Router>
         
        </div>
  );
}

export default App;
