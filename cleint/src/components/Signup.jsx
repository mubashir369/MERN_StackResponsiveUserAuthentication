import React,{useState} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = response.json();
    if (data.status === "Ok") {
      navigate("/login");
    }
  };
  return (
    <div className="body">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h1 className="heading">SignUp Form</h1>
          </div>
          <form onSubmit={register}>
            <input
              type="text"
              className="fadeIn second"
              name="login"
              placeholder="Username"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input
              type="email"
              className="fadeIn second"
              name="login"
              placeholder="Email ID"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              type="password"
              className="fadeIn second"
              name="login"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>
          <div id="formFooter">
            <a class="underlineHover" onClick={() => navigate("/login")}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
