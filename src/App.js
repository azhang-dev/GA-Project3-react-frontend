import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { API_ROOT } from './constants';
import {HashRouter as Router, Route, Routes, Link} from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import Root from "./Root";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import MyProfile from './Pages/MyProfile';
import SinglePlaceMap from './components/Map/SinglePlaceMap';
const user = {
    name: "",
    email: "",
    password: "",
  }

function App() {
  let [currentUser, setCurrentUser] = useState(user);
  // const navigate = useNavigate();
  useEffect(() => {
    checkLogin()
  }, [])
  
  const checkLogin = () => {
    let token = localStorage.getItem("jwt");
    // if(token){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      //TODO check that token is not null before doing a request
      axios.get(`${API_ROOT}/users/current`)
      .then(res => {
        console.log("current user:", res.data)
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password
        });
      })
      .catch(err => console.log("no  current user",err))
    // }// if(token)
  }
  
  

  // const handleSignUp = (request) => {
  
  //   return axios.post(`${API_ROOT}/user/create`,request)
  //   .then(result =>{
  //     console.log('SignUp Sucess!',result);
  //     localStorage.setItem("user", result.data);
  //     setCurrentUser({
  //       name: result.data.name,
  //       email: result.data.email,
  //       password: result.data.password
  //     })
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.jwt;
  //   })
  //   .catch(err => {
  //       console.log("Cannot SignUp:",err);
  //   })
  // }

  // const handleLogin = () => {
  //   return axios.post(`${API_ROOT}/user_token`,{auth: request})
  //   .then(result =>{
  //     console.log('Logging Sucess!',result)
  //     localStorage.setItem("jwt", result.data.jwt)
  //   checkLogin();
  //     // navigate(`/dashboard`);
  //     //TODO customize knock response to include current user oject - same data from line 24
  //   })
  //   .catch(err => {
  //     console.log("Cannot Log In:",err);
  //   })
    
  // }
  
  const handleLogout = () => {
    setCurrentUser(user);
    console.log('Logged Out-user:',currentUser);
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = ""
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
                        <li>Welcome! {currentUser.name.toUpperCase()}</li>
                        <li><Link to='/dashboard' className="nav-links-header">Dashboard</Link></li>
                        <li><Link to='/profile' className="nav-links-header">Profile</Link></li>
                        <li><Link onClick = {handleLogout} to='/' className="nav-links-header">Log Out</Link></li>
                        {/* <li><Link to='/single-place-map' className="nav-links-header">testMap</Link></li> */}
                      </ul>

                    )
                    :
                    (
                      <ul> 
                        <li><Link onClick = {checkLogin}  to='/login' className="nav-links-header">Log In</Link></li>
                        <li><Link to='/sign-up' className="nav-links-header">Sign Up</Link></li>
                        {/* <li><Link to='/single-place-map' className="nav-links-header">testMap</Link></li> */}
                      </ul>
                    )
                  }
                </nav>

              </header>
              
              <div>
                <Routes>
                    <Route exact path = '/'element={<Root/>}/>
                    <Route exact path = '/login'element={<LoginForm />}/>
                    <Route exact path = '/sign-up'element={<SignUpForm />}/>
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
