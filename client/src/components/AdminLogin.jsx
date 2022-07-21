import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const adminLogin = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/admin-login", {
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
        if(data.admin){
          localStorage.setItem('AdminToken',data.admin)
          alert("Login Success");
          window.location.href = "/admin-dashboard";
        }else{
          alert("Please check Your Email And password");
        }
      });
  };
  return (
    <div className="body">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h1 className="heading">Admin Login</h1>
          </div>
          <form onSubmit={adminLogin}>
            <input
              type="email"
              id="login"
              className="fadeIn second"
              placeholder="Email ID"
              required
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
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
          <div id="formFooter">
            <a class="underlineHover" onClick={() => navigate("/login")}>
              User Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
