import React, {useState} from 'react'

function SignUpForm(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    //const API_BASE_URL =  "http://localhost:3000/"
    const handleNameChange = (ev) => {
        setName(ev.target.value)
    }

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value)
    }
    const handleUsernameChange = (ev) => {
        setUsername(ev.target.value)
    }

    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        fetch(`http://localhost:3000/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
        })
        setName("")
        setEmail("")
        setUsername("")
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
                    <input value={name} onChange={handleNameChange} type="text" placeholder="name"/>
                </div>
                <div className='field'>
                    <label>email</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                </div>
                <div className='field'>
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div className='field'>
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="text" placeholder="password"/>
                </div>

                <button className='ui button' type='submit'>Submit</button>

            </form>

        </div>
    )

}

export default SignUpForm