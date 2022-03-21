import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';
import axios from 'axios';

function SignUpForm(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
   
    const navigate = useNavigate();

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setUser({
        ...user,
        [name]: value
        })
    }//handleInput

    const handleSubmit = async(ev) => {
        ev.preventDefault();
    
        try{
            const res = await axios.post(`${API_ROOT}/user/create`, user);
            console.log('SignUp Sucess!',res);
            setUser(res.data.user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.jwt}`;
            localStorage.setItem("jwt", res.data.jwt);
            console.log("jwt",res.data.jwt)
            props.checkLogin();
            navigate('/dashboard');
        }catch(err){
            console.log("Error Signing Up:", err)
        }
       
    }// handleSubmit()

    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }

    return(
        <div style={formDivStyle}>
            <h1> Sign Up</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className='field'>
                    <label>Name</label>
                    <input name='name' onChange={handleInput} type="text" placeholder="Name"/>
                </div>
                <div className='field'>
                    <label>email</label>
                    <input name='email' onChange={handleInput} type="text" placeholder="Email"/>
                </div>
                <div className='field'>
                    <label>Password</label>
                    <input name='password' onChange={handleInput} type="password" placeholder="Password"/>
                </div>

                <button className='ui button' type='submit'>Sign Up</button>

            </form>

        </div>
    )

}

export default SignUpForm