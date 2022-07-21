import React, { useEffect, useState } from "react";
import './Login.css'
import {useNavigate} from 'react-router-dom'
function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

  const login = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/login", {
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
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      navigate('/user-dashboard')
    }
  },[])
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
             required
              placeholder="Email ID"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
            
              placeholder="password"
              value={password}
              required
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
          <div id="formFooter">
            <a className="underlineHover" onClick={()=>navigate('/signup')}>
              Sign Up
            </a>
            <a className="underlineHover" onClick={()=>navigate('/admin-login')}>Admin Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
