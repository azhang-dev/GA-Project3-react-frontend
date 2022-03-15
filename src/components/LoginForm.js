import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';

function LoginForm(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    
    const handleEmailChange = (ev) => {
        setEmail(ev.target.value)
    }

    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const request = {'email': email, 'password': password}

        axios.post(`${API_ROOT}/user_token`,{auth: request})
        .then(result =>{
            console.log('Logging Sucess!')
            localStorage.setItem("jwt", result.data.jwt)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.jwt;
            navigate(`/dashboard`);
        })
        .catch(err => {
            console.log("Cannot Log In:",err)
        })
        
        // fetch(`http://localhost:3000/user_token`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         auth: {email, password}
        //     })
        // })
        // .then(res => res.json())
        // .then(data => {
        //     if(data.error){
        //         alert(data.error)
        //     }else{
        //         localStorage.setItem("token", data.jwt)
        //         // props.handleLogin(data.user)
        //         console.log("login sucess",data);
        //         navigate(`/dashboard`);
        //     }
        // });
        setEmail("");
        setPassword("");
        
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return(
        <div>
            <div style={formDivStyle}>
            <h1>Log In</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Email</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
} 

export default LoginForm