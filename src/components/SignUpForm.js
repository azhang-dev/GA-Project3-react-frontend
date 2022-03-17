import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '../constants';
import axios from 'axios';

function SignUpForm(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });
    // const [submitted, setSubmitted] = useState(false);
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleInput = (ev) => {
        const {name, value} = ev.target
        setValues({
        ...values,
        [name]: value
        })
        console.log(values);
    }

    // const handleNameChange = (ev) => {
    //     setName(ev.target.value)
    // }

    // const handleEmailChange = (ev) => {
    //     setEmail(ev.target.value)
    // }
    
    // const handlePasswordChange = (ev) => {
    //     setPassword(ev.target.value)
    // }

    const handleSubmit = async(ev) => {
        ev.preventDefault();
        // setSubmitted(true);
        // const request = {name,email,password}
        // console.log("request:", name, email,password);
       
        try{
            // props.handleSignUp(request);
            const res = await axios.post(`${API_ROOT}/user/create`, values);
            console.log('SignUp Sucess!',res);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt;
            navigate('/dashboard');
        }catch(err){
            console.log("Error Signing Up:", err)
        }
        // setName("");
        // setEmail("");
        // setPassword("");
    }

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
                    {/* {submitted && !name ? <span>Please enter a name</span> : null} */}
                </div>
                <div className='field'>
                    <label>email</label>
                    <input name='email' onChange={handleInput} type="text" placeholder="Email"/>
                    {/* {submitted && !email ? <span>Please enter an email</span> : null} */}
                </div>
                <div className='field'>
                    <label>Password</label>
                    <input name='password' onChange={handleInput} type="password" placeholder="Password"/>
                    {/* {submitted && !password ? <span>Please enter a password</span> : null} */}
                </div>

                <button className='ui button' type='submit'>Sign Up</button>

            </form>

        </div>
    )

}

export default SignUpForm