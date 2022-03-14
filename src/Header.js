import React from "react";
// import "./Header.css"
import {HashRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Root from "./Root";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";



const headerStyle ={
    background: "black",
    height: "15vh",
}



function Header(props){
    return(
        <div style={headerStyle}>
            <h1 style={{color:"white"}}>TRAVELOG</h1>
            <Router>
            {/* <button className="ui button" onClick={() => props.handleFormSwitch("singUp")}>Sign Up</button>
            <button className="ui button" onClick={() => props.handleFormSwitch("login")}>Log In</button> */}
            <Link to='/login'>Log In</Link>|
            <Link to='/sign-up'>Sign Up</Link>|
            <Link to='/dashboard'>TestTravelMap</Link>
                <Routes>
                    <Route exact path = '/'element={<Root/>}/>
                    <Route exact path = '/login'element={<LoginForm/>}/>
                    <Route exact path = '/sign-up'element={<SignUpForm/>}/>
                    <Route exact path = '/dashboard'element={<Dashboard/>}/>
                </Routes>
            </Router>
            {/* <button className="ui button" onClick={() => props.handleFormSwitch("login")}>TEST MAP</button> */}
        </div>
    )
}

export default Header;