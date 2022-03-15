import React from "react";
// import "./Header.css"
import {HashRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Root from "./Root";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";



const headerStyle ={
    background: "black",
    height: "8vh",
}



function Header(props){
    return(
        <div style={headerStyle}>
           
            {/* <button className="ui button" onClick={() => props.handleFormSwitch("login")}>TEST MAP</button> */}
        </div>
    )
}

export default Header;