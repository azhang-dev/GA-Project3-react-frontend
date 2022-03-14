import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState({})
  // const [form, setForm] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        //console.log(data)
      })
    }
  },[])

  // const handleLogin = (user) => {
  //   setUser(user)
  // }

  // const handleFormSwitch = (input) => {
  //   setForm(input)
  // }

  // const renderForm = () => {
  //   switch(form){
  //     case "login":
  //       return <LoginForm handleLogin={handleLogin}/>
  //       break;
  //     default:
  //       return <SignUpForm handleLogin={handleLogin}/>
  //   }
  // }
  return (
    <div className="App">
      <Header className="App-header" 
      // handleFormSwitch={handleFormSwitch}
      />
      {/* {
        renderForm()
      } */}
    </div>
  );
}

export default App;
