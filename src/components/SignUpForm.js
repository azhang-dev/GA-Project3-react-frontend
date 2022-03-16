import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function SignUpForm(props) {
    // const [values, setValues] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // });
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    
    const handleNameChange = (ev) => {
        setName(ev.target.value)
    }

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value)
    }
    
    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setSubmitted(true);
        const request = {name,email,password}
        console.log("request:", name, email,password);
        try{
            props.handleSignUp(request);
            // navigate('/dashboard');
        }catch(err){
            console.log("Error Signing Up:", err)
        }
        setName("")
        setEmail("")
        setPassword("")
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
                    <input value={name} onChange={handleNameChange} type="text" placeholder="Name"/>
                    {submitted && !name ? <span>Please enter a name</span> : null}
                </div>
                <div className='field'>
                    <label>email</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="Email"/>
                    {submitted && !email ? <span>Please enter an email</span> : null}
                </div>
                <div className='field'>
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="Password"/>
                    {submitted && !password ? <span>Please enter a password</span> : null}
                </div>

                <button className='ui button' type='submit'>Sign Up</button>

            </form>

        </div>
    )

}

export default SignUpForm