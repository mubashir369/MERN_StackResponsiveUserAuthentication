import React, { useState } from "react";
import './Login.css'
import {useNavigate} from 'react-router-dom'
function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

  const login = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem('token',data.user)
          alert("Login Success");
          window.location.href = "/user-dashboard";
        } else {
          alert("Please check Your Email And password");
        }
      });
  }
  return (
    <div className="body">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h1 className="heading">Login</h1>
          </div>
          <form onSubmit={login}> 
            <input
              type="email"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="Email ID"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
          <div id="formFooter">
            <a class="underlineHover" onClick={()=>navigate('/signup')}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
