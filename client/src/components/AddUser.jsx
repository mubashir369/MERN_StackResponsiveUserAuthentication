import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(alert("New User Added"))
      .then(navigate("/admin-dashboard"));
  };
  return (
    <div className="body">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h1 className="heading">Add User</h1>
          </div>
          <form onSubmit={register}>
            <input
              type="text"
              className="fadeIn second"
              name="login"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="fadeIn second"
              name="login"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="fadeIn second"
              name="login"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" className="fadeIn fourth" value="Submit" />
          </form>
          <div id="formFooter">
            <a
              class="underlineHover"
              onClick={() => navigate("/admin-dashboard")}
            >
              Back To Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
