import React from 'react'
import './Login.css'
function AdminLogin() {
  return (
    <div className="body">
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <h1 className="heading">Admin Login</h1>
        </div>
        <form > 
          <input
            type="email"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Email ID"
            
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
           
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
        <div id="formFooter">
          <a class="underlineHover">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin
